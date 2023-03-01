import { Controller } from "react-hook-form";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { Option, SelectStateComponentProps } from "./CustomForm.model";
import { useEffect, useState } from "react";
import DropdownService from "../../services/DropdownService";


const SelectStateComponent = (props: SelectStateComponentProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (props.countryId) {
      DropdownService.getAllStatesByCountryId(props.countryId).then(options => setOptions(options));
    }
  }, [props.countryId]);

  const getValueForAutocomplete = (value: string | number) => {
    return options?.find((element) => element.value === value) || null
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.defaultValue}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <Autocomplete
            blurOnSelect
            onBlur={props.handleBlur}
            onChange={(event, value) => onChange(value ? value.value : 0)}
            value={getValueForAutocomplete(value)}
            options={options}
            renderOption={(option) => (
              <div>{option.label}</div>
            )}
            getOptionLabel={(option) => option.label || ""}
            getOptionSelected={(option, value) => {
              return value.value === option.value;
            }}
            disabled={!props.isDataEditable || props.isDataDemoable}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="filled"
                  disabled={!props.isDataEditable || props.isDataDemoable}
                  color="secondary"
                  label={props.label}
                />
              );
            }}
          />
        );
      }}
    />
  );
};

export default SelectStateComponent;
