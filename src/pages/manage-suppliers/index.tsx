import { createContext, Dispatch, SetStateAction, useState, useEffect } from "react";
import { Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { SUPPLIERS_SECTIONS, TABS, TAB_PANELS } from "./constants";
import { TabContextType } from "./models";
import styles from "./styles.module.scss";
import ImpactDataService from "../../services/ImpactDataService";
import { useAuth } from "../../helpers/useAuth";

export const SetTabContext =
  createContext<{
    setTabContext: Dispatch<SetStateAction<TabContextType>>;
  } | null>(null);


const ManageSuppliers = () => {
  const [tabContext, setTabContext] = useState<TabContextType>({
    tab: SUPPLIERS_SECTIONS.SUPPLY_CHAIN,
    config: {},
  });
  const { user } = useAuth();
  const [ isDemoable, setDemo] = useState<boolean>(false);

  useEffect(() => {
    let fetchData = async () => {
      await getIsDataDemoable();
    }
    fetchData();
  }, []);


  const handleChange = (
    event: React.ChangeEvent<{}>,
    newTab: SUPPLIERS_SECTIONS,
  ) => {
    setTabContext({
      tab: newTab,
      config: {
        year: 0,
      },
    });
  };

  const getIsDataDemoable = async () => {
    const demoCompany = await ImpactDataService.getDemoCompany();
    demoCompany.map((item: any)=>{
      if (item.listValue == user.companyId) {
        setDemo(true);
      }
    })
  };

  const Panel = TAB_PANELS[tabContext.tab];

  return (
    <div className={styles.container}>
      <SetTabContext.Provider value={{ setTabContext }}>
        <TabContext value={tabContext.tab}>
          <div className={styles.headContainer}>
            <h5>TRACE</h5>
            <div className={styles.headWrapper}>
              <h1>Manage Suppliers</h1>
              <TabList
                className={styles.tabHeader}
                onChange={handleChange}
              >
                {TABS.map((tab, index) => (
                  <Tab
                    key={`tab-${index}`}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </TabList>
            </div>
          </div>
          <div className={styles.mainSection}>
            <TabPanel
              key={tabContext.tab}
              className={styles.tabPanel}
              value={tabContext.tab}
            >
              <div className={styles.widget}>
                <Panel 
                  // isDemoable={isDemoable}
                  config={tabContext.config} 
                />
              </div>
            </TabPanel>
          </div>
        </TabContext>
      </SetTabContext.Provider>
    </div>
  );
};

export default ManageSuppliers;
