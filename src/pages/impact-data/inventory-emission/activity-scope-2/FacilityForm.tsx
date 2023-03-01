import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomForm from "../../../../components/CustomForm/CustomForm";
import NumberFormat from "react-number-format";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
} from "@material-ui/core";
import Select from "../../../../components/Select";
import { ImpactmRefDataModel } from "../../../../models/impactm-ref-data.model";
import { ElectricityModel } from "../../../../models/impactm-emission.model";
import { CompanyFacilityModel } from "../../../../models/general-background.model";
import styles from "./styles.module.scss";
import { useAuth } from "../../../../helpers/useAuth";
import { useHistory } from "react-router-dom";
import { FormConfig } from "../../models";

type FacilityFormProps = {
  facility: CompanyFacilityModel;
  dataEmissionId: number;
  data?: ElectricityModel;
  unitOptions?: ImpactmRefDataModel[];
  onUpdate: (data: ElectricityModel) => void;
  isDataDemoable?: boolean;
  isDataEditable: boolean;
  // activeConfig: FormConfig;
  // formDefaultValues: any;
  // isImpactDataEditable: boolean;
};

type FacilityForm = {
  totalElectricityAmountRaw: number;
  totalElectricityUnitId: number;
  totalRenewableAmountRaw: number;
  totalRenewableUnitId: number;
};

const FacilityForm = ({
                        data,
                        dataEmissionId,
                        unitOptions,
                        isDataDemoable,
                        // activeConfig,
                        // formDefaultValues,
                        // isImpactDataEditable,
                        facility: { facilityName, facilityId },
                        onUpdate,
                        isDataEditable,
                      }: FacilityFormProps) => {
  const { control, reset, getValues } = useForm<FacilityForm>();
  const history = useHistory();
  const { isImpactPerformanceAvailable } = useAuth();

  useEffect(() => {
    if (data) {
      reset({
        totalElectricityAmountRaw: data.totalElectricityAmountRaw,
        totalElectricityUnitId: data.totalElectricityUnitId,
        totalRenewableAmountRaw: data.totalRenewableAmountRaw,
        totalRenewableUnitId: data.totalRenewableUnitId,
      });
    }
  }, [data]);

  const handleSubmit = () => {
    if (facilityId) {
      onUpdate({
        ...data,
        facilityId,
        dataEmissionId,
        ...getValues(),
      });
    }
  };

  return (
    <Paper variant="outlined" className={styles.section}>
      {/* <CustomForm
        config={activeConfig?.formConfig}
        onSubmit={handleSubmit}
        isDataDemoable={isDataDemoable}
        isDataEditable={
          isImpactPerformanceAvailable ? isImpactDataEditable : false
        }
        data={formDefaultValues}
        submitOnBlur
      /> */}
      <Grid container>
        <Grid container>
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
        <h3 className={styles.subtitle}>
          Total units of electricity purchased from the grid
        </h3>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              name="totalElectricityAmountRaw"
              control={control}
              render={({ field: { onChange, value } }) => (
                <NumberFormat
                  fullWidth
                  value={value || ""}
                  variant="filled"
                  color="secondary"
                  label="Total units"
                  disabled={!isDataEditable || isDataDemoable}
                  customInput={TextField}
                  onValueChange={(values) => {
                    onChange({
                      target: {
                        name: "totalElectricityAmountRaw",
                        value: values.value,
                      },
                    });
                  }}
                  onBlur={handleSubmit}
                  isNumericString
                  allowEmptyFormatting
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            {unitOptions && (
              <FormControl fullWidth variant="filled" disabled={!isDataEditable}>
                <InputLabel>Unit</InputLabel>
                <Select
                  isDataDemoable={isDataDemoable}
                  control={control}
                  name="totalElectricityUnitId"
                  rules={{ required: "This is required" }}
                  selectProps={{
                    label: "Unit",
                    onChange: handleSubmit,
                  }}
                >
                  {unitOptions.map(({ listId, listValue }) => (
                    <MenuItem key={listId} value={listId}>
                      {listValue}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
        <h3 className={styles.subtitle}>
          Total units of electricity purchased from renewable energy
        </h3>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              name="totalRenewableAmountRaw"
              control={control}
              render={({ field: { onChange, value } }) => (
                <NumberFormat
                  fullWidth
                  value={value || ""}
                  variant="filled"
                  color="secondary"
                  label="Total units"
                  customInput={TextField}
                  disabled={!isDataEditable || isDataDemoable}
                  onValueChange={(values) => {
                    onChange({
                      target: {
                        name: "totalRenewableAmountRaw",
                        value: values.value,
                      },
                    });
                  }}
                  onBlur={handleSubmit}
                  isNumericString
                  allowEmptyFormatting
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            {unitOptions && (
              <FormControl fullWidth variant="filled" disabled={!isDataEditable || isDataDemoable}>
                <InputLabel>Unit</InputLabel>
                <Select
                  control={control}
                  name="totalRenewableUnitId"
                  rules={{ required: "This is required" }}
                  isDataDemoable={isDataDemoable}
                  selectProps={{
                    label: "Unit",
                    onChange: handleSubmit,
                  }}
                >
                  {unitOptions.map(({ listId, listValue }) => (
                    <MenuItem key={listId} value={listId}>
                      {listValue}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FacilityForm;
