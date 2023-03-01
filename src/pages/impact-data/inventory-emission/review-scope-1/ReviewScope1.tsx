import CustomTable from "../../../../components/CustomTable/CustomTable";
import { ReviewScope1Props } from "./models";
import styles from "./styles.module.scss";
import { useReviewScope1 } from "./useReviewScope1";
import { Typography } from "@material-ui/core";

const ReviewScope1 = (props: ReviewScope1Props) => {
  const {
    activeStationaryConfig,
    activeMobileConfig,
    activeDistanceConfig,
    activeExtinguisherConfig,
    activeRefrigerantConfig,
    defaultData,
    onStationaryFuelFormSubmit,
    onMobileFuelFormSubmit,
    onDistanceFormSubmit,
    onRefrigerantFormSubmit,
    onExtinguisherFormSubmit,
  } = useReviewScope1(props);

  if (defaultData && activeStationaryConfig && activeMobileConfig &&
    activeDistanceConfig && activeExtinguisherConfig && activeRefrigerantConfig) {
    return (
      <div className={styles.container}>
        <Typography>Please review all emission source activities and emissions factors. Note: if your desired emissions factor is not listed then you can enter a custom emissions factor.</Typography>
        <h3>Fuel Combustion - Stationary</h3>
        <CustomTable
          columns={activeStationaryConfig.tableConfig}
          formConfig={activeStationaryConfig.formConfig}
          data={defaultData.dataImpactmScope1FuelCombustion || []}
          onFormSubmit={onStationaryFuelFormSubmit}
          isDataOpenable={true}
          isDataDemoable={props.isDataDemoable}
          isDataEditable={props.isImpactDataEditable}
        />
        <h3>Fuel Combustion - Mobile</h3>
        <CustomTable
          columns={activeMobileConfig.tableConfig}
          formConfig={activeMobileConfig.formConfig}
          data={defaultData.dataImpactmScope1MobileFuelCombustion || []}
          onFormSubmit={onMobileFuelFormSubmit}
          isDataOpenable={true}
          isDataDemoable={props.isDataDemoable}
          isDataEditable={props.isImpactDataEditable}
        />
        <h3>Distance Travelled</h3>
        <CustomTable
          columns={activeDistanceConfig.tableConfig}
          formConfig={activeDistanceConfig.formConfig}
          data={defaultData.dataImpactmScope1Distance || []}
          onFormSubmit={onDistanceFormSubmit}
          isDataOpenable={true}
          isDataDemoable={props.isDataDemoable}
          isDataEditable={props.isImpactDataEditable}
        />
        <h3>Refrigerators or Chillers</h3>
        <CustomTable
          columns={activeRefrigerantConfig.tableConfig}
          formConfig={activeRefrigerantConfig.formConfig}
          data={defaultData.dataImpactmScope1Refrigerators || []}
          onFormSubmit={onRefrigerantFormSubmit}
          isDataOpenable={true}
          isDataDemoable={props.isDataDemoable}
          isDataEditable={props.isImpactDataEditable}
        />
        <h3>CO2 Extinguishers</h3>
        <CustomTable
          columns={activeExtinguisherConfig.tableConfig}
          formConfig={activeExtinguisherConfig.formConfig}
          data={defaultData.dataImpactmScope1Extinguishers || []}
          onFormSubmit={onExtinguisherFormSubmit}
          isDataOpenable={true}
          isDataDemoable={props.isDataDemoable}
          isDataEditable={props.isImpactDataEditable}
        />
      </div>);
  } else {
    return <></>;
  }
};


export default ReviewScope1;
