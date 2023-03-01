import { ReviewScope2Props } from "./models";
import styles from "../review-scope-1/styles.module.scss";
import CustomTable from "../../../../components/CustomTable/CustomTable";
import { useReviewScope2 } from "./useReviewScope2";
import { Typography } from "@material-ui/core";

const ReviewScope2 = (props: ReviewScope2Props) => {
  const { onFormSubmit, defaultData, activeConfig } = useReviewScope2(props);

  if (activeConfig && defaultData) {
    return (
      <div className={styles.container}>
        <Typography>Please review all emission source activities and emissions factors. Note: if your desired emissions factor is not listed then you can enter a custom emissions factor.</Typography>
        <h3>Electricity purchased</h3>
        <CustomTable
          columns={activeConfig.tableConfig}
          formConfig={activeConfig.formConfig}
          data={defaultData.dataImpactmScope2Electricity || []}
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

export default ReviewScope2;
