import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@material-ui/core";
import { Control, Controller, Path } from "react-hook-form";

type SelectProps<T> = {
  control: Control<T>;
  name: Path<T>;
  rules: Record<string, any>;
  isDataDemoable?: boolean;
  children: JSX.Element[];
  selectProps: MuiSelectProps;
};

/**
 * Material UI Select component wrapped in RHF Controller
 */
const Select = <T,>({
  control,
  name,
  rules,
  children,
  isDataDemoable,
  selectProps: { onChange: onChangeSelect, ...selectProps },
}: SelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, ...field } }) => (
        <MuiSelect
          value={value === null || value === undefined ? "" : value}
          disabled={isDataDemoable}
          onChange={(e, child) => {
            onChange(e, child);
            if (onChangeSelect) {
              onChangeSelect(e, child);
            }
          }}
          {...selectProps}
          {...field}
        >
          {children}
        </MuiSelect>
      )}
    />
  );
};

export default Select;
