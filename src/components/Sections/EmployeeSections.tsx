import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import CustomForm from "../CustomForm/CustomForm";
import { Icon } from "../Icon/Icon";
import { SectionsProps } from "./Sections.model";
import styles from "./Sections.module.scss";
import { ConditionFormConfig, Field } from "../CustomForm/CustomForm.model";
import { Alert } from "@material-ui/lab";
import {
  Grid,
  TextField,
} from "@material-ui/core";

const EmployeeSections = (props: SectionsProps) => {
  const [sections, setSections] = useState<number[]>([0]);
  const [values, setValues] = useState<any>([]);
  const [keys, setKeys] = useState<number[]>([]);
  const [currentKey, setCurrentKey] = useState<number>(0);

  const handleClickOnAddNewSection = () => {
  
    setSections([...sections, currentKey]);
    setKeys([...keys, currentKey]);
    setCurrentKey(currentKey + 1);
    let newValues = props.formConfig?.fields.reduce((obj, { name }) => ({ ...obj, [name]: null, facilityId: props.facilityId, dataEmissionId: props.dataEmissionId }), {});
    props.onSubmit && props.isDataEditable && props.onSubmit([...values, newValues]);
  };

  const handleSubmit = (index: number, formValues: any) => {
    let newValues = [...values];
    if (values.length === 0) {
      newValues = [formValues];
    } else {
      newValues[index] = { ...newValues[index], ...formValues };
    }
    setValues(newValues);
    props.onSubmit && props.isDataEditable && props.onSubmit(newValues);
    props.onBlur && props.isDataEditable && props.onBlur(newValues);
  };

  useEffect(() => {
    let newSections: number[] = [];
    let newKeys: number[] = [];
    if (props.data && props.data.length >= 1) {
      props.data.forEach((element) => {
        newSections.push(0);
        newKeys.push(element.id);
      });
    }
    const newValues = props.data ? props.data : [];
    setValues(newValues);
    setSections(newSections);
    setKeys(newKeys);
    // props.onChange(newValues);
  }, [props.data]);

  const handleClickOnRemoveSection = async (index: number) => {
    if (props.onRemove && values[index] && values[index].id) {
      await props.onRemove(values[index].id);
    }
    let newValues = [...values];
    newValues.splice(index, 1);
    let newSections = [...sections];
    newSections.splice(index, 1);
    let newKeys = [...keys];
    newKeys.splice(index, 1);
    setValues(newValues);
    setKeys(newKeys);
    setSections(newSections);
    props.onSubmit && props.isDataEditable && props.onSubmit(newValues);
  };

  const renderLabel = (field: Field, index: number): JSX.Element => {
    let classes: string[] = [];
    if (field.flex) {
      classes.push(styles["flex" + field.flex]);
    }
    if (field.className) {
      classes.push(field.className);
    }

    let label = "";

    if (props.data && props.data[index]) {
      const value = props.data[index]![field.name] || "";
      label = field.options?.find((opt) => opt.value === value)?.label || "";
    }

    return (
      <h3 className={classes.join(" ")} key={`${field.name}${index}`}>
        {field.label}: {label}
      </h3>
    );
  };

  const isConditionTrue = (
    formConfigConditionBy: ConditionFormConfig | undefined,
    value: any,
  ): boolean => {
    if (
      !formConfigConditionBy ||
      !formConfigConditionBy.conditionBy ||
      !value
    ) {
      return false;
    }

    for (const conditionBy of formConfigConditionBy.conditionBy) {
      if (value[conditionBy.field] !== conditionBy.value) {
        return false;
      }
    }

    return true;
  };

  return (
    <div>
      {sections.map((element, index) => (
        <div className={styles.section} key={`section${keys[index]}`}>
          <div className={`${styles.header}`}>
            {props.label && typeof props.label == "string" ? ( 
              <h3 className={styles.name}>
                {props.label} {index + 1}
              </h3>
            ) : (
              <></>
            )}
            {props.remove ? (
              <Icon
                icon={"times"}
                color="red"
                customSize={"md"}
                disabled={!props.isDataEditable}
                className={styles.removeIcon}
                onClick={handleClickOnRemoveSection.bind(null, index)}
              />
            ) : (
              <></>
            )}
          </div>
          <div className={styles.form}>
            {isConditionTrue(props.formConfigConditionBy, values[index]) ? (
              <Alert severity="info">
                {props.formConfigConditionBy?.message}
              </Alert>
            ) : (
              <></>
            )}  
            <CustomForm
              config={props.formConfig}
              submitOnBlur
              onSubmit={(formValues: any) => handleSubmit(index, formValues)}
              isDataDemoable={props.isDataDemoable}
              isDataEditable={props.isDataEditable}
              data={values ? values[index] : undefined}
            />
          </div>
        </div>
      ))}
      {(!sections || sections.length === 0) && !props.remove && props.emptyMessage ? (
        <Alert severity="info">{props.emptyMessage}</Alert>
      ) : (
        <></>
      )}
      {props.remove ? (
        <Button
          variant="text"
          onClick={handleClickOnAddNewSection}
          disabled={!props.isDataEditable || props.isDataDemoable}
        >
          <Icon icon={"plus"} size={"sm"} className={styles.plusIcon} solid />
          {props.addButtonLabel}
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default EmployeeSections;
