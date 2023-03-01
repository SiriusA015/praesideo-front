import { Tab, Tabs } from "@material-ui/core";

import { TabComponentProps } from "../models";
import { AddSupplierForm, SuppliersTable } from "./components";
import styles from "./styles.module.scss";
import { useSuppliersYears } from "./hooks/useSuppliersYears";

const SupplyChain = ({ config, isDemoable }: TabComponentProps) => {
  const { setYears, years, fetchYears } = useSuppliersYears(config?.year);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setYears((state) => ({
      ...state,
      selected: newTab,
    }));
  };

  return (
    <div>
      <AddSupplierForm fetchSuppliersYears={fetchYears} isDemoable={isDemoable} />
      {years && Boolean(years?.selected) && (
        <div className={styles.list}>
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
                disabled={isDemoable}
              />
            ))}
          </Tabs>
          <SuppliersTable years={years} isDemoable={isDemoable}/>
        </div>
      )}
    </div>
  );
};

export default SupplyChain;
