import { ReviewScope3Props } from "./models";
import styles from "../review-scope-1/styles.module.scss";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { useReviewScope3 } from "./useReviewScope3";
import { Typography } from "@material-ui/core";

const ReviewScope3 = (props: ReviewScope3Props) => {
  const { onFormSubmit, defaultData, activeEmployeeCommuteConfig, activeBusinessTravelConfig } = useReviewScope3(props);

  if (activeEmployeeCommuteConfig && activeBusinessTravelConfig && defaultData) {
    return (
      <div className={styles.container}>
        <Typography>Please review all emission source activities and emissions factors. Note : if your desired emissions factor isnot listed then you can enter a custom emissions factor.</Typography>
        <h3>Employee commuting</h3>
        <CustomTable
          columns={activeEmployeeCommuteConfig.tableConfig}
          formConfig={activeEmployeeCommuteConfig.formConfig}
          data={defaultData.dataImpactmScope3EmployeeCommute || []}
          onFormSubmit={onFormSubmit}
          isDataOpenable={true}
          isDataDemoable={props.isDataDemoable}
          isDataEditable={props.isImpactDataEditable}
        />
        <h3>Business Travel</h3>
        <CustomTable
          columns={activeBusinessTravelConfig.tableConfig}
          formConfig={activeBusinessTravelConfig.formConfig}
          data={defaultData.dataImpactmScope3BusinessTravel || []}
          onFormSubmit={onFormSubmit}
          isDataOpenable={true}
          isDataDemoable={props.isDataDemoable}
          isDataEditable={props.isImpactDataEditable}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default ReviewScope3;
