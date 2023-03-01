import {
  Button,
  ButtonProps,
  Checkbox,
  FormControlLabel, FormLabel,
  Link,
  Radio,
  RadioGroup,
  TextField,
  withStyles,
  IconButton,
} from "@material-ui/core";
import { Alert, Autocomplete, createFilterOptions } from "@material-ui/lab";
import { useEffect, useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Icon } from "../Icon/Icon";
import GoogleMaps from "../LocationSearchInput/LocationSearchInput";
import Sections from "../Sections/Sections";
import EmployeeSections from "../Sections/EmployeeSections";
import { CustomFormProps, Field } from "./CustomForm.model";
import styles from "./CustomForm.module.scss";
import CurrencyFlag from "react-currency-flags";
import NumberFormat from "react-number-format";
import SelectStateComponent from "./SelectStateComponent";
import ReactTooltip from "react-tooltip";

const UploadButton = withStyles({
  root: {
    padding: "12px 11px 7px 11px",
    lineHeight: "11px",
    color: "#579663",
    marginLeft: "8px",
  },
})((props: ButtonProps) => <Button variant="outlined" {...props} />);

const CustomForm = (props: CustomFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    setValue,
  } = useForm();
  const filter = createFilterOptions<any>();

  const password = useRef({});
  password.current = watch("password", "");

  const [data, setData] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {    
    props.config?.fields.forEach(field => {
      if (field.newField && props.data) {
        setValue(field.name, props.data[field.name]);
      }
    });

    setData(props.data);
  }, [props.data]);

  const handleBlur = () => {
    if (props.submitOnBlur && props.isDataEditable) {
      const values = getValues();
      props.config?.fields.forEach(field => {
        if (field.newField && typeof values[field.name] === "string") {
          values[field.newField] = values[field.name];
          values[field.name] = undefined;
        }
      });

      props.onSubmit && props.onSubmit(values);
    }
  };

  const renderInput = (field: Field): JSX.Element => {
    let rules = { ...field.rules };
    if (field.name === "reTypePassword") {
      rules.validate = (value: string) =>
        value === password.current || "The passwords do not match";
    }
    let error = false;
    let errorMessage: string | undefined = undefined;
    if (errors[field.name]) {
      error = errors[field.name] !== undefined;
      errorMessage = errors[field.name].message;
    }
    const CustomNumberInput = (props: any) => (
      <NumberFormatCustom
        percentage={field.percentage}
        name={field.name}
        {...props}
      />
    );
    if (
      !field.conditionedBy ||
      (field.conditionedBy &&
        watch(field.conditionedBy.field) === field.conditionedBy.value)
    ) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={props.data ? props.data[field.name] || "" : ""}
          rules={rules}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <div style={{position:"relative"}}>
                <TextField
                 
                  onBlur={handleBlur}
                  label={field.label}
                  variant="filled"
                  color="secondary"
                  className={[styles.fullWidth, styles.input].join(" ")}
                  ref={ref}
                  value={props.data?.dataIsNotPresent ? "" : value}
                  onChange={onChange}
                  type={field.inputType}
                  error={error}
                  helperText={errorMessage}
                  autoComplete={field.autocomplete}
                  disabled={!props.isDataEditable || props.data?.dataIsNotPresent || props.isDataDemoable}
                  InputProps={
                    field.inputType === "numeric"
                      ? {
                        inputComponent: CustomNumberInput,
                      }
                      : undefined
                  }
                />
                <div data-tip data-for={field.name == "companyName"?"registerTip":""} className = {styles.tooltipField}></div>
                <ReactTooltip id="registerTip" place="top" effect="solid">
                  Provide the legal operating name of your organisation.
                </ReactTooltip>
              </div>
            );
          }}
        />
      );
    } else if (field.conditionedBy && field.conditionedBy.disable) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={props.data ? props.data[field.name] || "" : ""}
          rules={rules}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <TextField
                label={field.label}
                variant="filled"
                color="secondary"
                className={styles.fullWidth}
                value={props.data ? props.data[field.name] || "" : ""}
                type={field.inputType}
                error={error}
                helperText={errorMessage}
                disabled={true}
                InputProps={
                  field.inputType === "numeric"
                    ? {
                      inputComponent: CustomNumberInput,
                    }
                    : undefined
                }
              />
            );
          }}
        />
      );
    } else {
      return <></>;
    }
  };

  const renderSelectState = (field: Field): JSX.Element => {
    if (
      field.filterOptionsBy &&
      (!field.conditionedBy ||
        (field.conditionedBy &&
          watch(field.conditionedBy.field) === field.conditionedBy.value))
    ) {
      return <SelectStateComponent
        name={field.name}
        control={control}
        countryId={watch(field.filterOptionsBy)}
        defaultValue={props.data ? props.data[field.name] : null}
        handleBlur={handleBlur}
        isDataDemoable={props.isDataDemoable}
        isDataEditable={props.isDataEditable}
        label={field.label} />;
    } else {
      return <></>;
    }
  };

  const renderSelect = (field: Field): JSX.Element => {
    let options = field.options;
    if (!field.options?.length && field.optionsField && props.data) {
      options = props.data[field.optionsField]?.map((data: { listValue: string, listId: number, listKey: string }) => ({
        label: `${data.listValue} ${data.listKey ? `(${data.listKey})` : ""}`,
        value: data.listId,
      }));
    }

    const getValueForAutocomplete = (value: string | number) => {
      if (options) {
        let option = options.find((element) => element.value === value);
        if (option) {
          return option;
        } else return null;
      } else return null;
    };
    if (
      !field.conditionedBy ||
      (field.conditionedBy &&
        watch(field.conditionedBy.field) === field.conditionedBy.value)
    ) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={
            field.multiple
              ? []
              : props.data
                ? props.data[field.name]
                : field.multiple
                  ? []
                  : null
          }
          render={({ field: { onChange, value, ref } }) => {
            return (
              <Autocomplete
                blurOnSelect
                onBlur={handleBlur}
                onChange={(event, value) => onChange(value ? value.value : 0)}
                value={
                  props.data?.dataIsNotPresent
                    ? getValueForAutocomplete("")
                    : getValueForAutocomplete(value)
                }
                groupBy={
                  field.groupOptions
                    ? (option) => (option.group ? option.group.toString() : "")
                    : undefined
                }
                options={
                  options
                    ? options.filter((element) => {
                      if (field.filterOptionsBy) {
                        let filterByValue = watch(field.filterOptionsBy);
                        if (filterByValue)
                          return element.group === filterByValue;
                        else return false;
                      } else return true;
                    })
                    : []
                }
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
                  if (params.inputValue !== "" && field.newField) {
                    filtered.push({
                      value: params.inputValue,
                      label: `Add "${params.inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                renderOption={(option) => (
                  <div>
                    {option.code && (
                      <CurrencyFlag
                        currency={option.code}
                        size="sm"
                        className={styles.flag}
                      />
                    )}
                    {option.label}
                  </div>
                )}
                getOptionLabel={(option) => option.label || ""}
                getOptionSelected={(option, value) => {
                  return value.value === option.value;
                }}
                disabled={!props.isDataEditable || props.data?.dataIsNotPresent || props.isDataDemoable}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="filled"
                      disabled={
                        !props.isDataEditable || props.data?.dataIsNotPresent || props.isDataDemoable
                      }
                      color="secondary"
                      label={field.label}
                    />
                  );
                }}
              />
            );
          }}
        />
      );
    } else if (field.conditionedBy && field.conditionedBy.disable) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={
            field.multiple
              ? []
              : props.data
                ? props.data[field.name]
                : field.multiple
                  ? []
                  : null
          }
          render={({ field: { value } }) => {
            return (
              <Autocomplete
                value={getValueForAutocomplete(value)}
                options={options || []}
                getOptionLabel={(option) => option.label || ""}
                getOptionSelected={(option, value) => value.value === option.value}
                disabled={true}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="filled"
                      disabled={true}
                      color="secondary"
                      label={field.label}
                    />
                  );
                }}
              />
            );
          }}
        />
      );
    } else {
      return <></>;
    }
  };

  const renderMultiSelect = (field: Field) => {
    if (
      !field.conditionedBy ||
      (field.conditionedBy &&
        watch(field.conditionedBy.field) === field.conditionedBy.value)
    ) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={props.data ? props.data[field.name] : []}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <div className={styles.multiSelectWrapper}>
                <p className={styles.fieldLabel}>{field.label}</p>
                {field.options?.map((option) => (
                  <div
                    className={styles.multiSelectGroup}
                    key={option.category}
                  >
                    <p>{option.category}</p>
                    {option.groupedOptions?.map((groupedOption) => {
                      return (
                        <FormControlLabel
                          className={styles.fullWidth}
                          key={groupedOption.value}
                          control={
                            <Checkbox
                              onChange={(event) => {
                                if (event.target.checked) {
                                  let newValue: number[] = [];
                                  if (value && value.length)
                                    newValue = [...value];
                                  newValue.push(parseInt(event.target.name));
                                  onChange(newValue);
                                } else {
                                  let newValue: number[] = [];
                                  if (value && value.length)
                                    newValue = [...value];
                                  newValue.splice(
                                    value.findIndex(
                                      (element: number) =>
                                        element === parseInt(event.target.name),
                                    ),
                                    1,
                                  );
                                  onChange(newValue);
                                }
                                handleBlur();
                              }}
                              name={groupedOption.value?.toString()}
                              disabled={
                                !props.isDataEditable ||
                                props.data?.dataIsNotPresent ||
                                props.isDataDemoable
                              }
                              defaultChecked={
                                props.data &&
                                props.data[field.name] &&
                                !props.data?.dataIsNotPresent
                                  ? props.data[field.name].includes(
                                    groupedOption.value,
                                  )
                                  : false
                              }
                              checked={
                                value && !props.data?.dataIsNotPresent
                                  ? value.includes(groupedOption.value)
                                  : false
                              }
                            />
                          }
                          label={groupedOption.label}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            );
          }}
        />
      );
    } else {
      return <></>;
    }
  };

  const renderMultiScope1Select = (field: Field) => {
    if (
      !field.conditionedBy ||
      (field.conditionedBy &&
        watch(field.conditionedBy.field) === field.conditionedBy.value)
    ) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={props.data ? props.data[field.name] : []}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <div className={styles.multiSelectWrapper}>  
                <p className={styles.fieldLabel}>   
                  <div onClick={() => setOpen(!open)} style={{cursor:"pointer", width:"fit-content"}}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      style={{marginRight: 10}}
                    >
                      {open ? (
                          <Icon icon="chevron-up" className={styles.icon} color="grey" />
                        ) : (
                          <Icon icon="chevron-down" className={styles.icon} color="grey" />
                        )}
                    </IconButton>
                    {field.label}
                  </div>
                </p>
                {open && field.options?.map((option) => (
                  <div
                    className={styles.multiSelectGroup}
                    key={option.category}
                  >
                   
                  {(option.groupedOptionId == 1)?(
                    <>
                      <p>{option.category}</p>
                      {option.groupedOptions?.map((groupedOption) => {
                        return (
                          <FormControlLabel
                            className={styles.fullWidth}
                            key={groupedOption.value}
                            control={
                              <Checkbox
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    let newValue: number[] = [];
                                    if (value && value.length)
                                      newValue = [...value];
                                    newValue.push(parseInt(event.target.name));
                                    onChange(newValue);
                                  } else {
                                    let newValue: number[] = [];
                                    if (value && value.length)
                                      newValue = [...value];
                                    newValue.splice(
                                      value.findIndex(
                                        (element: number) =>
                                          element === parseInt(event.target.name),
                                      ),
                                      1,
                                    );
                                    onChange(newValue);
                                  }
                                  handleBlur();
                                }}
                                name={groupedOption.value?.toString()}
                                disabled={
                                  !props.isDataEditable ||
                                  props.data?.dataIsNotPresent ||
                                  props.isDataDemoable ||
                                  (groupedOption.value != 1 && groupedOption.value != 2 && groupedOption.value != 4)
                                }
                                defaultChecked={
                                  props.data &&
                                  props.data[field.name] &&
                                  !props.data?.dataIsNotPresent
                                    ? props.data[field.name].includes(
                                      groupedOption.value,
                                    )
                                    : false
                                }
                                checked={
                                  value && !props.data?.dataIsNotPresent
                                    ? value.includes(groupedOption.value)
                                    : false
                                }
                              />
                            }
                            label={groupedOption.label}
                          />
                        );
                      })}
                    </>
                  ):(<></>)}
                  </div>
                ))}
              </div>
            );
          }}
        />
      );
    } else {
      return <></>;
    }
  };

  const renderMultiScope2Select = (field: Field) => {
    if (
      !field.conditionedBy ||
      (field.conditionedBy &&
        watch(field.conditionedBy.field) === field.conditionedBy.value)
    ) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={props.data ? props.data[field.name] : []}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <div className={styles.multiSelectWrapper}>  
                <p className={styles.fieldLabel}>   
                  <div onClick={() => setOpen(!open)} style={{cursor:"pointer", width:"fit-content"}}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      style={{marginRight: 10}}
                    >
                      {open ? (
                          <Icon icon="chevron-up" className={styles.icon} color="grey" />
                        ) : (
                          <Icon icon="chevron-down" className={styles.icon} color="grey" />
                        )}
                    </IconButton>
                    {field.label}
                  </div>
                </p>
                {open && field.options?.map((option) => (
                  <div
                    className={styles.multiSelectGroup}
                    key={option.category}
                  >
                   
                  {(option.groupedOptionId == 1)?(
                    <>
                      <p>{option.category}</p>
                      {option.groupedOptions?.map((groupedOption) => {
                        return (
                          <FormControlLabel
                            className={styles.fullWidth}
                            key={groupedOption.value}
                            control={
                              <Checkbox
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    let newValue: number[] = [];
                                    if (value && value.length)
                                      newValue = [...value];
                                    newValue.push(parseInt(event.target.name));
                                    onChange(newValue);
                                  } else {
                                    let newValue: number[] = [];
                                    if (value && value.length)
                                      newValue = [...value];
                                    newValue.splice(
                                      value.findIndex(
                                        (element: number) =>
                                          element === parseInt(event.target.name),
                                      ),
                                      1,
                                    );
                                    onChange(newValue);
                                  }
                                  handleBlur();
                                }}
                                name={groupedOption.value?.toString()}
                                disabled={
                                  !props.isDataEditable ||
                                  props.data?.dataIsNotPresent ||
                                  props.isDataDemoable ||
                                  (groupedOption.value != 1 && groupedOption.value != 2 && groupedOption.value != 4)
                                }
                                defaultChecked={
                                  props.data &&
                                  props.data[field.name] &&
                                  !props.data?.dataIsNotPresent
                                    ? props.data[field.name].includes(
                                      groupedOption.value,
                                    )
                                    : false
                                }
                                checked={
                                  value && !props.data?.dataIsNotPresent
                                    ? value.includes(groupedOption.value)
                                    : false
                                }
                              />
                            }
                            label={groupedOption.label}
                          />
                        );
                      })}
                    </>
                  ):(<></>)}
                  </div>
                ))}
              </div>
            );
          }}
        />
      );
    } else {
      return <></>;
    }
  };

  const renderMultiScope3Select = (field: Field) => {
    if (
      !field.conditionedBy ||
      (field.conditionedBy &&
        watch(field.conditionedBy.field) === field.conditionedBy.value)
    ) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={props.data ? props.data[field.name] : []}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <div className={styles.multiSelectWrapper}>  
                <p className={styles.fieldLabel}>   
                  <div onClick={() => setOpen(!open)} style={{cursor:"pointer", width:"fit-content"}}>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      style={{marginRight: 10}}
                    >
                      {open ? (
                          <Icon icon="chevron-up" className={styles.icon} color="grey" />
                        ) : (
                          <Icon icon="chevron-down" className={styles.icon} color="grey" />
                        )}
                    </IconButton>
                    {field.label}
                  </div>
                </p>
                {open && field.options?.map((option) => (
                  <div
                    className={styles.multiSelectGroup}
                    key={option.category}
                  >
                   
                  {(option.groupedOptionId != 1 && option.groupedOptionId != 2)?(
                    <>
                      <p>{option.category}</p>
                      {option.groupedOptions?.map((groupedOption) => {
                        return (
                          <FormControlLabel
                            className={styles.fullWidth}
                            key={groupedOption.value}
                            control={
                              <Checkbox
                                onChange={(event) => {
                                  if (event.target.checked) {
                                    let newValue: number[] = [];
                                    if (value && value.length)
                                      newValue = [...value];
                                    newValue.push(parseInt(event.target.name));
                                    onChange(newValue);
                                  } else {
                                    let newValue: number[] = [];
                                    if (value && value.length)
                                      newValue = [...value];
                                    newValue.splice(
                                      value.findIndex(
                                        (element: number) =>
                                          element === parseInt(event.target.name),
                                      ),
                                      1,
                                    );
                                    onChange(newValue);
                                  }
                                  handleBlur();
                                }}
                                name={groupedOption.value?.toString()}
                                disabled={
                                  !props.isDataEditable ||
                                  props.data?.dataIsNotPresent ||
                                  props.isDataDemoable ||
                                  (groupedOption.value!=16 && groupedOption.value!=15)
                                }
                                defaultChecked={
                                  props.data &&
                                  props.data[field.name] &&
                                  !props.data?.dataIsNotPresent
                                    ? props.data[field.name].includes(
                                      groupedOption.value,
                                    )
                                    : false
                                }
                                checked={
                                  value && !props.data?.dataIsNotPresent
                                    ? value.includes(groupedOption.value)
                                    : false
                                }
                              />
                            }
                            label={groupedOption.label}
                          />
                        );
                      })}
                    </>
                  ):(<></>)}
                  </div>
                ))}
              </div>
            );
          }}
        />
      );
    } else {
      return <></>;
    }
  };

  const renderCheckbox = (field: Field): JSX.Element => {
    let label = getLabel(field);

    return (
      <Controller
        name={field.name}
        control={control}
        defaultValue={props.data && props.data[field.name]}
        render={({ field: { onChange, value, ref } }) => (
          <FormControlLabel
            className={styles.fullWidth}
            control={
              <Checkbox
                onChange={(event) => {
                  onChange(event.target.checked);
                  handleBlur();
                }}
                disabled={!props.isDataEditable || props.isDataDemoable || props.isDataDemoable}
                checked={value}
              />
            }
            label={label}
          />
        )}
      />
    );
  };

  const renderRadio = (field: Field): JSX.Element => {
    return (
      <Controller
        name={field.name}
        control={control}
        defaultValue={props.data && props.data[field.name]}
        render={({ field: { onChange, value, ref } }) => (
          <>
            <FormLabel>{field?.label || ""}</FormLabel>
            <RadioGroup
              row
              defaultValue={value}
              name={field.name}
              onChange={(event) => {
                onChange(event.target.value);
                handleBlur();
              }}
            >
              {field!.options!.map((option, index) => {
                return (
                  <FormControlLabel
                    key={`${field.name}${option.value}`}
                    value={option.value}
                    control={
                      <Radio size="small" disabled={!props.isDataEditable || props.isDataDemoable || props.isDataDemoable} />
                    }
                    label={option.label}
                  />
                );
              })}
            </RadioGroup>
          </>
        )}
      />
    );
  };

  const renderTextButton = ({ label, link = "#" }: Field): JSX.Element => {
    return (
      <Link color="textPrimary" className={styles.fullWidth} href={link}>
        {label}
      </Link>
    );
  };

  const renderSectionTitle = (field: Field): JSX.Element => {
    let label = getLabel(field);

    if (
      !field.conditionedBy ||
      (field.conditionedBy &&
        watch(field.conditionedBy.field) === field.conditionedBy.value)
    ) {
      return (
        <div className={styles.sectionTitle}>
          <h3>{label}</h3>
          {field.description ? <p>({field.description})</p> : <></>}
        </div>
      );
    } else {
      return <></>;
    }
  };

  const getLabel = (field: Field): string => {
    let label = "";

    if (field.label.constructor === Array && field.label.length > 0 && props.data) {
      label = field.label[0].label.replaceAll(
        field.label[0].name,
        props.data[field.label[0].name] || "",
      );
    } else if (typeof field.label === "string") {
      label = field.label;
    }

    return label;
  };


  const renderParagraph = (field: Field): JSX.Element => {
    if (
      !field.conditionedBy ||
      (field.conditionedBy &&
        watch(field.conditionedBy.field) === field.conditionedBy.value)
    ) {
      return (
        <div className={styles.sectionTitle}>
          <p>{field.label}</p>
          {field.description ? <p>({field.description})</p> : <></>}
        </div>
      );
    } else {
      return <></>;
    }
  };

  const renderSection = (field: Field): JSX.Element => {
    let displaySection = true;
    if (
      field.conditionedBy &&
      (watch(field.conditionedBy.field) === field.conditionedBy.value ||
        (props.data && props.data[field.conditionedBy.field]?.toString() === field.conditionedBy.value?.toString()))
    ) {
      displaySection = !field.conditionedBy.disable;
    }
    if (displaySection) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={props.data ? props.data[field.name] : []}
          render={({ field: { onChange, value, ref } }) => (
            <Sections
              formConfig={field.formConfig}
              formConfigConditionBy={field.formConfigConditionedBy}
              isDataEditable={
                props.isDataEditable && !props.data?.dataIsNotPresent
              }
              isDataDemoable={props.isDataDemoable}
              onSubmit={(newValue: any) => {
                onChange(newValue);
                handleBlur();
              }}
              type={field.type}
              onChange={onChange}
              data={props.data ? props.data[field.name] : []}
              label={field.label}
              remove={field.remove}
              emptyMessage={field.emptyMessage}
              onRemove={field.onRemove}
              addButtonLabel={field.addButtonLabel}
            />
          )}
        />
      );
    } else {
      return <>{field.emptyMessage ?
        <Alert severity="info">
          {field.emptyMessage}
        </Alert> : ""}</>;
    }
  };

  const renderEmployeeCommuteSection = (field: Field): JSX.Element => {
    let displaySection = true;
    if (
      field.conditionedBy &&
      (watch(field.conditionedBy.field) === field.conditionedBy.value ||
        (props.data && props.data[field.conditionedBy.field]?.toString() === field.conditionedBy.value?.toString()))
    ) {
      displaySection = !field.conditionedBy.disable;
    }
    if (displaySection) {
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={props.data ? props.data[field.name] : []}
          render={({ field: { onChange, value, ref } }) => (
            <EmployeeSections
              formConfig={field.formConfig}
              formConfigConditionBy={field.formConfigConditionedBy}
              isDataEditable={
                props.isDataEditable && !props.data?.dataIsNotPresent
              }
              facilityId={props.facilityId}
              dataEmissionId={props.dataEmissionId}
              isDataDemoable={props.isDataDemoable}
              onSubmit={(newValue: any) => {
                onChange(newValue);
                handleBlur();
              }}
              type={field.type}
              onChange={onChange}
              data={props.data}
              label={field.label}
              remove={field.remove}
              emptyMessage={field.emptyMessage}
              onRemove={field.onRemove}
              addButtonLabel={field.addButtonLabel}
            />
          )}
        />
      );
    } else {
      return <>{field.emptyMessage ?
        <Alert severity="info">
          {field.emptyMessage}
        </Alert> : ""}</>;
    }
  };

  const renderButton = (field: Field): JSX.Element => {
    return (
      <Button
        variant="contained"
        color={"primary"}
        className={styles.fullWidth}
        type={field.name === "submit" ? "submit" : undefined}
      >
        {field.label}
      </Button>
    );
  };

  const renderLocationInput = (field: Field): JSX.Element => {
    return (
      <Controller
        name={field.name}
        control={control}
        defaultValue={props.data ? props.data[field.name] : ""}
        render={({ field: { onChange, value, ref } }) => (
          <GoogleMaps
            onChange={onChange}
            value={value}
            disable={!props.isDataEditable || props.isDataDemoable || props.isDataDemoable}
            onBlur={handleBlur}
            label={field.label}
          ></GoogleMaps>
        )}
      />
    );
  };

  const renderFileInput = (field: Field): JSX.Element => {
    let inputRef: any;
    return (
      <>
        {(!data || !data[field.name]) && (
          <div className={styles.flex}>
            <Controller
              name={field.name}
              control={control}
              defaultValue={field.defaultValue}
              render={() => (
                <TextField
                  id="filled-basic"
                  label={field.label}
                  variant="filled"
                  color="secondary"
                  disabled={
                    (data && data[field.name] !== undefined) ||
                    !props.isDataEditable || props.isDataDemoable
                  }
                  className={styles.fullWidth}
                  contentEditable={false}
                  autoComplete={field.autocomplete}
                />
              )}
            />
            <UploadButton
              variant="outlined"
              onClick={() => {
                inputRef.click();
              }}
              disabled={
                (data && data[field.name] !== undefined) ||
                !props.isDataEditable
              }
            >
              Upload
            </UploadButton>
          </div>
        )}
        <input
          type="file"
          className={styles.fileInput}
          ref={(ref) => (inputRef = ref)}
          name={field.name}
          disabled={!props.isDataEditable || props.isDataDemoable || props.isDataDemoable}
          onChange={props.onFileInputChange}
          accept={"image/*,.doc,.docx,.pdf,.xlsx"}
        />
        {data && data[field.name] !== undefined && (
          <div className={styles.fileValue}>
            <div className={styles.label}>{field.label}</div>
            <div className={styles.file}>
              <p>{data && data[field.name].filename}</p>
              <Icon
                icon={"times"}
                color={"red"}
                size={"sm"}
                disabled={!props.isDataEditable || props.isDataDemoable || props.isDataDemoable}
                className={styles.removeFile}
                onClick={() => {
                  props.onRemoveFile &&
                  props.onRemoveFile(
                    field.name,
                    data ? data[field.name].filename : "",
                  );
                }}
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const renderField = (field: Field, index: number): JSX.Element => {
    let classes: string[] = [styles.field];
    if (field.flex) {
      classes.push(styles["flex" + field.flex]);
    }
    if (field.className) {
      classes.push(field.className);
    }
    switch (field.type) {
      case "text":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderInput(field)}
          </div>
        );
      case "select":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderSelect(field)}
          </div>
        );
      case "select-state":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderSelectState(field)}
          </div>
        );
      case "file":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderFileInput(field)}
          </div>
        );
      case "checkbox":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderCheckbox(field)}
          </div>
        );
      case "radio":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderRadio(field)}
          </div>
        );
      case "text-button":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderTextButton(field)}
          </div>
        );
      case "button":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderButton(field)}
          </div>
        );
      case "section-title":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderSectionTitle(field)}
          </div>
        );
      case "paragraph":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderParagraph(field)}
          </div>
        );
      case "sections":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderSection(field)}
          </div>
        );
      case "sections-facility":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderEmployeeCommuteSection(field)}
          </div>
        );
      case "multi-select":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderMultiSelect(field)}
          </div>
        );
      case "multi-scope1-select":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderMultiScope1Select(field)}
          </div>
        ); 
      case "multi-scope2-select":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderMultiScope2Select(field)}
          </div>
        ); 
      case "multi-scope3-select":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderMultiScope3Select(field)}
          </div>
        );
      
      case "location-input":
        return (
          <div className={classes.join(" ")} key={`${field.name}${index}`}>
            {renderLocationInput(field)}
          </div>
        );
      default:
        return <div key={`${field.name}${index}`}></div>;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        props.onSubmit && props.isDataEditable ? props.onSubmit : () => {
        },
      )}
      className={styles.form}
    >
      {props.config ? (
        props.config.fields.map((element, index) => renderField(element, index))
      ) : (
        <></>
      )}
    </form>
  );
};

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  percentage?: boolean;
  currencySymbol?: string;
}

const withValueLimit = ({ floatValue, value }: any) =>
  floatValue <= 100 || value === "";

const NumberFormatCustom = (props: NumberFormatCustomProps) => {
  const { inputRef, onChange, percentage, currencySymbol, name, ...other } =
    props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      suffix={percentage ? " %" : undefined}
      prefix={currencySymbol}
      isNumericString
      name={name}
      isAllowed={percentage ? withValueLimit : undefined}
      allowEmptyFormatting
    />
  );
};

export default CustomForm;
