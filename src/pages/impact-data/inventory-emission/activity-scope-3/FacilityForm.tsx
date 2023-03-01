import { useEffect, useState, useRef  } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { Grid, Paper, TextField } from "@material-ui/core";
import Select from "../../../../components/Select";
import { ImpactmRefDataModel } from "../../../../models/impactm-ref-data.model";
import { EmployeeCommuteModel } from "../../../../models/impactm-emission.model";
import { CompanyFacilityModel } from "../../../../models/general-background.model";
import styles from "./styles.module.scss";
import CustomForm from "../../../../components/CustomForm/CustomForm";
import { CustomFormConfig, Option } from "../../../../components/CustomForm/CustomForm.model";
import { ImpactmEmissionModel } from "../../../../models/impactm-emission.model";

type FacilityFormProps = {
  facility: CompanyFacilityModel;
  dataEmissionId: number;
  data?: EmployeeCommuteModel[];
  unitOptions?: ImpactmRefDataModel[];
  onUpdate: (data: EmployeeCommuteModel) => void;
  onSubmit: (data: ImpactmEmissionModel) => void;
  isEmployeeCommuteCompleteData?: boolean;
  isEmployeeCommutePartialData?: boolean;
  isEmployeeCommuteApproximateData?: boolean;
  activeEmployeePrimaryConfig?: CustomFormConfig;
  activeEmployeePartialConfig?: CustomFormConfig;
  activeEmployeeApproximativeConfig?: CustomFormConfig;
  isDataDemoable?: boolean;
  isDataEditable: boolean;
};

type FacilityForm = {
  totalElectricityAmountRaw: number;
  totalElectricityUnitId: number;
  totalRenewableAmountRaw: number;
  totalRenewableUnitId: number;
};

const FacilityForm = ({ data, dataEmissionId, unitOptions, isDataDemoable, 
                        activeEmployeePrimaryConfig, activeEmployeePartialConfig, activeEmployeeApproximativeConfig,
                        isEmployeeCommuteCompleteData, isEmployeeCommutePartialData, isEmployeeCommuteApproximateData,
                        facility: { facilityName, facilityId }, isDataEditable,
                        onSubmit, onUpdate }: FacilityFormProps) => {

  return (
    <Paper variant="outlined" className={styles.section}>
      <Grid container className={styles.facilityName}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Facility name"
            variant="filled"
            color="secondary"
            value={facilityName}
            disabled
          />
        </Grid>
      </Grid>
      { isEmployeeCommuteCompleteData ?
        <CustomForm
          config={activeEmployeePrimaryConfig}
          facilityId={facilityId}
          dataEmissionId={dataEmissionId}
          isDataDemoable={isDataDemoable}
          isDataEditable={isDataEditable}
          onSubmit={onSubmit}
          data={data}
          submitOnBlur
        /> : 
      isEmployeeCommutePartialData ?
        <CustomForm
          config={activeEmployeePartialConfig}
          facilityId={facilityId}
          dataEmissionId={dataEmissionId}
          isDataDemoable={isDataDemoable}
          isDataEditable={isDataEditable}
          onSubmit={onSubmit}
          data={data}
          submitOnBlur
        /> : 
      isEmployeeCommuteApproximateData ?
        <CustomForm
          config={activeEmployeeApproximativeConfig}
          facilityId={facilityId}
          dataEmissionId={dataEmissionId}
          isDataDemoable={isDataDemoable}
          isDataEditable={isDataEditable}
          onSubmit={onSubmit}
          data={data}
          submitOnBlur
      />:<></> }
    </Paper>
  );
};

export default FacilityForm;
