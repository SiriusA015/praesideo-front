import { useEffect, useState } from "react";
import { Tab, Tabs, Typography } from "@material-ui/core";

import TracePerformanceService from "../../services/TracePerformanceService";
import { YearType } from "../../models/DateTypes";
import { useText } from "../../helpers/hooks/useText";
import PerformanceToolbar from "./components/PerformanceToolbar";
import { PERFORMANCE_SECTIONS, TABS, WAITING_MESSAGE } from "./constants";
import { AvailableNumberType } from "./models";
import styles from "./styles.module.scss";
import { TemperatureAlignment } from "./TemperatureAlignment";
import { TabContext, TabPanel } from "@material-ui/lab";
import MainService from "../../services/MainService";
import { ModelItemType } from "../../models/ModelItemType";
import { TRACE_PERFORMANCE_TAB } from "../../constants/authApiModelItemList"


const TracePerformance = () => {
  const { getText } = useText();
  const [tab, setTab] = useState(PERFORMANCE_SECTIONS.TEMPERATURE_ALIGNMENT);
  const yearState = useState<YearType>();
  const [suppliers, setSuppliers] = useState<AvailableNumberType>();
  const [lastComputed, setLastComputed] = useState<string>();
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [authApiModelItem, setModelItem] = useState<any>();
  const [authApiModelItemState, setModelItemState] = useState<boolean>(true);

  const fetchAvailableNumber = async (year: number) => {
    const { data } = await TracePerformanceService.getAvailableSuppliers(year);
    const authApiModelItem = await MainService.getAuthApiModelItemList();
    authApiModelItem.authApiModelItemList.map((item: ModelItemType)=>{
      if ( item.blockContext == TRACE_PERFORMANCE_TAB ){
        setModelItem(item);
        setModelItemState(item.isBlock);
      }
    });
    if (data) {
      setSuppliers(data);
      setEmpty(false);
    }
  };

  useEffect(() => {
    if (yearState[0]) {
      fetchAvailableNumber(yearState[0].value);
    }
  }, [yearState[0]]);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newTab: PERFORMANCE_SECTIONS,
  ) => {
    setTab(newTab);
  };

  return (
    <div className={styles.container}>
      <TabContext value={tab}>
        <div className={styles.headContainer}>
          <h5>TRACE</h5>
          <div className={styles.headWrapper}>
            <h1>Performance</h1>
            <Tabs
              className={styles.tabs}
              value={tab}
              onChange={handleChange}
              aria-label="manage-suppliers-tab"
            >
              {TABS.map(({ value, label }) => (
                <Tab
                  key={value}
                  label={label}
                  value={value}
                  className={styles.tab}
                />
              ))}
            </Tabs>
            <PerformanceToolbar
              yearState={yearState}
              suppliers={suppliers}
              lastComputed={lastComputed}
            />
          </div>
        </div>
          <div className={styles.mainSection}>
            {!isEmpty && !authApiModelItem?.isBlock? (
              <TabPanel
                value={PERFORMANCE_SECTIONS.TEMPERATURE_ALIGNMENT}
                classes={{ root: styles.panelRoot }}
              >
                <TemperatureAlignment
                  setEmpty={setEmpty}
                  setLastComputed={setLastComputed}
                  suppliers={suppliers}
                  filters={
                    yearState[0]
                      ? {
                        year: yearState[0],
                      }
                      : undefined
                  }
                />
              </TabPanel>
            ) : (
              <div className={styles.waitingMessage}>
                <Typography>
                  {authApiModelItemState? authApiModelItem?.blockMessage : getText(WAITING_MESSAGE)}
                </Typography>
              </div>
            )}
          </div>
      </TabContext>
    </div>
  );
};

export default TracePerformance;
