import { CustomChartProps } from "./CustomChart.model";
import styles from "./CustomChart.module.scss";
import CustomChartData from "./CustomChartData";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useState } from "react";
import { Tab } from "@material-ui/core";

const CustomChart = (props: CustomChartProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    props.configs ? props.configs[0].name : "",
  );

  const handleChangeOnTabs = (event: React.ChangeEvent<{}>, value: string) => setActiveTab(value);

  return (
    <div className={`${styles.container} ${styles.widget}`}>
      <TabContext value={activeTab}>
        <div className={styles.information}>
          <h2>{props.title} </h2>
          <TabList
            aria-label="chart tabs"
            onChange={handleChangeOnTabs}
            classes={{ root: styles.tabHeader }}
          >
            {props.configs?.map((element, index) => (
              <Tab
                label={element.title}
                value={element.name}
                key={"tabHeader" + index}
              />
            ))}
          </TabList>
        </div>
        {props.configs?.map((element, index) => (
          <TabPanel
            key={"tabContent" + index}
            value={element.name}
            className={styles.tabContent}
          >
            <div className={styles.chartContainer}>
              <CustomChartData data={props.data} config={element} />
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
};

export default CustomChart;
