import { AppBar, Tab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Alert, TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useEffect } from "react";
import { useState } from "react";
import CustomForm from "../CustomForm/CustomForm";
import { CustomTabsProps } from "./CustomTabs.model";
import styles from "./CustomTabs.module.scss";

const CustomTabs = (props: CustomTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(
    props.tabs ? props.tabs[0].value : ""
  );
  const [formData, setFormData] = useState();

  const handleChangeOnTabs = (event: React.ChangeEvent<{}>, value: string) => {
    props.onTabChange && props.onTabChange(value);
    setFormData(undefined);
    setActiveTab(value);
  };

  const onSubmit = (values: any) => {
    if (props.isDataEditable) {
      props.onSubmit && props.onSubmit(values);
    }
  };

  useEffect(() => {
    setFormData(props.formData);
  }, [props.formData]);

  if (props.tabs && formData !== undefined)
    return (
      <TabContext value={activeTab}>
        {props.formData?.dataIsNotPresent &&
        (activeTab === "recentYear" || activeTab === "ghgInventoryMethod") ? (
          <Alert className={styles.alertContainer} severity="info">
            To reactivate this service, go back to
            <Link className={styles.alert} to="/ghc-inventory-method">
              GHG Inventory Method
            </Link>
          </Alert>
        ) : (
          <></>
        )}
        {props.formConfig ? (
          <CustomForm
            config={props.formConfig}
            submitOnBlur
            onSubmit={onSubmit}
            isDataDemoable={props.isDataDemoable}
            isDataEditable={props.isDataEditable}
            data={formData}
          />
        ) : (
          <></>
        )}
        <AppBar position="static">
          <TabList
            aria-label="simple tabs example"
            onChange={handleChangeOnTabs}
          >
            {props.tabs?.map((element, index) => (
              <Tab
                label={element.label}
                value={element.value}
                key={"tabHeader" + index}
                className={styles.tab}
              />
            ))}
          </TabList>
        </AppBar>
        {props.tabs?.map((element, index) => (
          <TabPanel
            key={"tabContent" + index}
            value={props.tabs ? props.tabs[index].value : ""}
            className={styles.tabContent}
          >
            {props.formConfigs &&
            props.formConfigs[index] &&
            props.formConfigs[index].fields.length ? (
              <CustomForm
                config={
                  props.formConfigs ? props.formConfigs[index] : undefined
                }
                submitOnBlur
                onSubmit={onSubmit}
                isDataDemoable={props.isDataDemoable}
                isDataEditable={props.isDataEditable}
                data={formData}
              />
            ) : (
              <div></div>
            )}
          </TabPanel>
        ))}
      </TabContext>
    );
  else return <></>;
};

export default CustomTabs;
