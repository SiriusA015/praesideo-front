import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import {
  Autocomplete,
  createFilterOptions,
  FilterOptionsState,
} from "@material-ui/lab";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAlert } from "../../../../helpers/hooks/useAlert";
import { useRepresentationYears } from "../../../../helpers/hooks/useRepresentationYears";
import SupplyChainService from "../../../../services/SupplyChainService";
import { YearType } from "../../../../models/DateTypes";
import { SupplierType } from "../../models";
import { AddSupplierFormType } from "../models";
import { MONTHS } from "../../../../constants";
import { FINANCIAL_YEAR_OPTIONS } from "../constants";
import styles from "../styles.module.scss";

type AddSupplierFormProps = {
  isDemoable?:boolean;
  fetchSuppliersYears: () => void;
};

export const AddSupplierForm = ({
                                  isDemoable,
                                  fetchSuppliersYears,
                                }: AddSupplierFormProps) => {
  const actualYear = new Date().getFullYear().toString();
  const [, setAlert] = useAlert();
  const [suppliersList, setSuppliersList] = useState<SupplierType[]>([]);
  const [yearsList, setYearsList] = useState<YearType[] | null>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isMonthOpen, setMonthOpen] = useState(false);
  const { fetchYears, financialYears, calendarYears } = useRepresentationYears();
  const {
    register,
    handleSubmit: handleFormSubmit,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<AddSupplierFormType>({
    defaultValues: {
      yearType: FINANCIAL_YEAR_OPTIONS[0].value,
    },
  });
  const [autoCompleteValue, setAutoCompleteValue] = useState<string>();

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (calendarYears) {
      setYearsList(calendarYears);
      const defaultYear = calendarYears.find(
        ({ label }) => label === actualYear,
      );
      setValue(
        "year",
        defaultYear ? defaultYear.value : calendarYears[0].value,
      );
    }
  }, [calendarYears]);

  useEffect(() => {
    register("autocomplete", { required: true });
    register("yearType", { required: true });
    register("year", { required: true });
    register("month");
  }, [register]);

  useEffect(() => {
    if (autoCompleteValue && autoCompleteValue.length >= 3) {
      SupplyChainService.getSuppliersList().then((list) => {
        setSuppliersList(list);
      });
    } else {
      setSuppliersList([]);
    }
  }, [autoCompleteValue]);

  const handleFilterOptions = (
    options: SupplierType[],
    params: FilterOptionsState<SupplierType>,
  ) => {
    const filtered = createFilterOptions<SupplierType>()(options, params);

    // Suggest the creation of a new value
    if (params.inputValue !== "") {
      filtered.push({
        companyName: {
          label: `Add "${params.inputValue}"`,
          value: params.inputValue,
        },
        companyId: null,
      });
    }

    return filtered;
  };

  const handleSubmit: SubmitHandler<AddSupplierFormType> = async ({
                                                                    autocomplete: {
                                                                      companyName: { value: companyName },
                                                                      companyId,
                                                                    },
                                                                    yearType,
                                                                    month: startMonth,
                                                                    year: yearRepresentationId,
                                                                  }) => {
    let supplierId = companyId;
    const existingSupplier = suppliersList?.find(
      (supplier) =>
        supplier.companyId && companyName === supplier.companyName.value,
    );
    if (existingSupplier) {
      supplierId = existingSupplier.companyId;
    }
    const { error } = await SupplyChainService.addSupplier({
      companyName,
      supplierId,
      startMonth,
      yearRepresentationId,
      isFinancialYear: Boolean(yearType),
    });
    if (!error) {
      const list = await SupplyChainService.getSuppliersList();
      setSuppliersList(list);
      handleDialogClose();
      fetchSuppliersYears();
    } else {
      setAlert({ text: error, severity: "error" });
    }
  };

  const handleDialogClose = () => {
    setValue("yearType", FINANCIAL_YEAR_OPTIONS[0].value);

    if (calendarYears) {
      setYearsList(calendarYears);
      const defaultYear = calendarYears.find(
        ({ label }) => label === actualYear,
      );
      setValue(
        "year",
        defaultYear ? defaultYear.value : calendarYears[0].value,
      );
    }
    setValue("month", undefined);
    setMonthOpen(false);
    setDialogOpen(false);
  };

  const handleAddSupplierButton = () => {
    if (getValues("autocomplete")) {
      setDialogOpen(true);
    } else {
      setError("autocomplete", { message: "Supplier is required" });
    }
  };

  const handleYearTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const isFinancial = Boolean(e.target.value);
    if (isFinancial) {
      setYearsList(financialYears);
      setMonthOpen(true);
      setValue("month", MONTHS[0].value);
    } else {
      setYearsList(calendarYears);
      setMonthOpen(false);
      setValue("month", undefined);
    }
    setValue("yearType", e.target.value as number);
  };

  return (
    <>
      {suppliersList && (
        <form onSubmit={handleFormSubmit(handleSubmit)} className="form">
          <div className={styles.selectWrapper}>
            <Autocomplete
              options={suppliersList}
              filterOptions={handleFilterOptions}
              getOptionLabel={(option) => option.companyName.value}
              renderOption={(option) => <h3>{option.companyName.label}</h3>}
              onChange={(e, option) => {
                setValue("autocomplete", option as SupplierType);
                clearErrors("autocomplete");
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(errors?.autocomplete)}
                  helperText={errors?.autocomplete?.message}
                  label="Select supplier"
                  placeholder="Enter the first three initial characters of supplier name"
                  onChange={(e) => setAutoCompleteValue(e.target.value)}
                  variant="filled"
                  disabled={isDemoable}
                />
              )}
            />
            <Button
              color="primary"
              onClick={handleAddSupplierButton}
              variant="outlined"
              disabled={isDemoable}
            >
              Add supplier
            </Button>
          </div>
          <Dialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="reporting-year-dialog"
            disablePortal
            className={styles.dialog}
          >
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <h3>Reporting year</h3>
                  <FormControl fullWidth variant="outlined">
                    <Select
                      defaultValue={FINANCIAL_YEAR_OPTIONS[0].value}
                      onChange={handleYearTypeChange}
                      disabled={isDemoable}
                    >
                      {FINANCIAL_YEAR_OPTIONS.map(({ label, value }) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  {yearsList && (
                    <>
                      <h3>Year</h3>
                      <FormControl fullWidth variant="outlined">
                        <Select
                          disabled={isDemoable}
                          defaultValue={() => {
                            return yearsList.find(
                              ({ label }) => label === actualYear,
                            )?.value;
                          }}
                          onChange={(e) => {
                            setValue("year", e.target.value as number);
                          }}
                        >
                          {yearsList.map(({ label, value }) => (
                            <MenuItem key={value} value={value}>
                              {label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  )}
                </Grid>
              </Grid>
              {isMonthOpen && (
                <>
                  <h3>Financial year start month</h3>
                  <FormControl fullWidth variant="outlined">
                    <Select
                     disabled={isDemoable}
                      defaultValue={MONTHS[0].value}
                      onChange={(e) => {
                        setValue("month", e.target.value as number);
                      }}
                    >
                      {MONTHS.map(({ text, value }) => (
                        <MenuItem key={value} value={value}>
                          {text}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                size="medium"
                variant="outlined"
                disabled={isDemoable}
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <Button
                size="medium"
                variant="contained"
                type="submit"
                disabled={isDemoable}
                color="primary"
              >
                Load
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      )}
    </>
  );
};
