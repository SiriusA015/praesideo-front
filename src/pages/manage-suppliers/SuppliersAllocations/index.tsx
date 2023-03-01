import { useContext } from "react";
import { Link, Tab, Tabs } from "@material-ui/core";

import { SetTabContext } from "..";
import { SUPPLIERS_SECTIONS } from "../constants";
import { TabComponentProps } from "../models";
import { AllocationsTable } from "./components";
import { useSuppliersYears } from "./hooks/useSuppliersYears";
import styles from "./styles.module.scss";

const SuppliersAllocations = ({ config, isDemoable }: TabComponentProps) => {
  const tabContext = useContext(SetTabContext);
  const { setYears, years } = useSuppliersYears(config?.year);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setYears((state) => ({
      ...state,
      selected: newTab,
    }));
  };

  const goToSupplyChain = () => {
    tabContext?.setTabContext({
      tab: SUPPLIERS_SECTIONS.SUPPLY_CHAIN,
      config: {},
    });
  };

  return (
    <div>
      {years?.list && !years?.list?.length && (
        <h3>
          Please add first suppliers in your supply chain
          <Link
            className={styles.link}
            underline="always"
            color="secondary"
            onClick={goToSupplyChain}
          >
            here
          </Link>
        </h3>
      )}
      {years && Boolean(years?.selected) && (
        <div>
          <Tabs
            aria-label="suppliers-years-tab"
            variant="scrollable"
            value={years?.selected}
            onChange={handleChange}
          >
            {years?.list?.map(({ financialYear, yearRepresentationId }) => (
              <Tab
                key={yearRepresentationId}
                label={financialYear}
                value={yearRepresentationId}
                className={styles.tab}
              />
            ))}
          </Tabs>
          <AllocationsTable defaultTableState={config?.table} years={years} isDemoable={isDemoable}/>
        </div>
      )}
    </div>
  );
};

export default SuppliersAllocations;
