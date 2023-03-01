import { TextField, MenuItem, Grid, IconButton, Box } from "@material-ui/core";
import { groupBy } from "lodash";
import CurrencyFlag from "react-currency-flags";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";

import { Icon } from "../../../../components/Icon/Icon";
import SupplyChainService from "../../../../services/SupplyChainService";
import {
  CurrenciesType,
  SupplierAllocation,
  SupplierAllocations,
  SupplierTypeCategories,
} from "../../models";
import styles from "../styles.module.scss";

type AllocationFormProps = {
  deleteAvailable?: boolean;
  supplyChainId: number;
  supplierAllocationId: number | string;
  defaultValues?: Omit<SupplierAllocation, "supplierAllocationId">;
  categories: SupplierTypeCategories[];
  types: SupplierTypeCategories[];
  currencies: CurrenciesType[];
  isDemoable?:boolean;
  onUpdate: (supplierAllocations: SupplierAllocations) => void;
  onDelete: (id: string) => void;
};

export const AllocationForm = ({
  supplierAllocationId,
  supplyChainId,
  defaultValues,
  categories,
  types,
  currencies,
  isDemoable,
  onUpdate,
  onDelete,
  deleteAvailable = true,
}: AllocationFormProps) => {
  const { getValues, control } = useForm<
    Omit<SupplierAllocation, "supplierAllocationId">
  >({
    defaultValues: {
      supplierAmount: "",
      supplierCategoryId: "",
      supplierCurrencyId: "",
      supplierTypeId: "",
      ...defaultValues,
    },
  });

  const handleSubmit = async () => {
    if (typeof supplierAllocationId === "string") {
      await SupplyChainService.addAllocation(supplyChainId, getValues());
    } else {
      await SupplyChainService.updateAllocation({
        supplierAllocationId,
        ...getValues(),
      });
    }

    const { data } = await SupplyChainService.getAllocation(supplyChainId);
    if (data) {
      onUpdate(data);
    }
  };

  const handleDelete = async () => {
    if (typeof supplierAllocationId === "string") {
      onDelete(supplierAllocationId);
    } else {
      await SupplyChainService.deleteAllocation(supplierAllocationId);
      const { data } = await SupplyChainService.getAllocation(supplyChainId);
      if (data) {
        onUpdate(data);
      }
    }
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Controller
          name="supplierCategoryId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              fullWidth
              variant="filled"
              label="Category"
              disabled={isDemoable}
              value={value || ""}
              onChange={(e) => {
                onChange(e);
                handleSubmit();
              }}
            >
              {categories.map(({ id, value }) => (
                <MenuItem key={id} value={id}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          name="supplierTypeId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              fullWidth
              variant="filled"
              label="Type"
              disabled={isDemoable}
              value={value || ""}
              onChange={(e) => {
                onChange(e);
                handleSubmit();
              }}
            >
              {types.map(({ id, value }) => (
                <MenuItem key={id} value={id}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <Controller
          name="supplierAmount"
          control={control}
          render={({ field: { onChange, value } }) => (
            <NumberFormat
              value={value || ""}
              variant="filled"
              label="Spend"
              customInput={TextField}
              disabled={isDemoable}
              onValueChange={(values) => {
                onChange({
                  target: {
                    name: "supplierAmount",
                    value: values.value,
                  },
                });
                handleSubmit();
              }}
              isNumericString
              allowEmptyFormatting
            />
          )}
        />
      </Grid>
      <Grid item xs={3}>
        <Controller
          name="supplierCurrencyId"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              fullWidth
              variant="filled"
              label="Сurrency"
              disabled={isDemoable}
              value={value || ""}
              onChange={(e) => {
                onChange(e);
                handleSubmit();
              }}
            >
              {Object.entries(groupBy(currencies, "group")).map((group) => [
                <MenuItem disabled>{group[0]}</MenuItem>,
                group[1].map(
                  ({ code, id, value }: Omit<CurrenciesType, "group">) => (
                    <MenuItem key={id} value={id}>
                      {code && (
                        <CurrencyFlag
                          currency={code}
                          size="sm"
                          className={styles.flag}
                        />
                      )}
                      {value}
                    </MenuItem>
                  )
                ),
              ])}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={1}>
        {deleteAvailable && (
          <Box display="flex" alignItems="center" height="100%">
            <IconButton
              className={styles.icon}
              onClick={handleDelete}
              disabled={isDemoable}
              size="small"
            >
              <Icon icon="times" color="red" />
            </IconButton>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
