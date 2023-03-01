import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";

import { Icon } from "../../components/Icon/Icon";
import formStyles from "../../components/CustomForm/CustomForm.module.scss";
import {
  CustomFormProps,
  Field,
} from "../../components/CustomForm/CustomForm.model";
import { TERMS_AND_CONDITIONS_ENDPOINT } from "../../constants";
import { EMAIL_CONFIG, PASSWORD_CONFIG, RETYPEPASSWORD_CONFIG } from "./config";
import styles from "./styles.module.scss";

const PersonalDataForm = (props: CustomFormProps) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");
  const termsAccepted = watch("acceptTerms");

  const handleBlur = () => {
    if (props.submitOnBlur && props.isDataEditable) {
      let values = getValues();
      props.onSubmit && props.onSubmit(values);
    }
  };

  const renderInput = ({
                         rules,
                         name,
                         label,
                         inputType,
                       }: Field): JSX.Element => {
    if (name === "reTypePassword") {
      rules.validate = (value: string) =>
        value === password.current || "The passwords do not match";
    }
    let error = false;
    let errorMessage: string | undefined = undefined;
    if (errors[name]) {
      error = errors[name] !== undefined;
      errorMessage = errors[name].message;
    }
    return (
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field: { onChange, value, ref } }) => {
          return (
            <TextField
              onBlur={handleBlur}
              label={label}
              variant="filled"
              color="secondary"
              className={[formStyles.fullWidth, formStyles.input].join(" ")}
              ref={ref}
              value={value}
              onChange={onChange}
              type={inputType}
              error={error}
              helperText={errorMessage}
            />
          );
        }}
      />
    );
  };

  const renderField = (field: any): JSX.Element => {
    let classes: string[] = [];
    if (field.flex) {
      classes.push(formStyles["flex" + field.flex]);
    }
    classes.push(styles.field);
    return (
      <div className={classes.join(" ")} key={`${field.name}`}>
        {renderInput(field)}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(
        props.onSubmit && props.isDataEditable ? props.onSubmit : () => {}
      )}
      className={formStyles.form}
    >
      {renderField(EMAIL_CONFIG)}
      {renderField(PASSWORD_CONFIG)}
      {renderField(RETYPEPASSWORD_CONFIG)}
      <div className={styles.hintContainer}>
        <Box display="flex" alignItems="center">
          <Icon icon="lock" className={styles.hintContainerTitleIcon} />
          <h3>Your password must contain:</h3>
        </Box>
        <List className={styles.hintList} dense>
          {[
            "At least 8 characters",
            "A mix of uppercase and lowercase letters",
            "A mix of letters and numbers",
            "Inclusion of at least one special character from below list @#$%^&+=*!?/",
          ].map((text) => (
            <ListItem key={text} className={styles.hintItem}>
              <ListItemText
                primary={text}
                primaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <Controller
        name="acceptTerms"
        control={control}
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <FormControlLabel
            className={styles.checkboxContainer}
            control={
              <Checkbox
                checked={value}
                onChange={(event) => {
                  onChange(event.target.checked);
                  handleBlur();
                }}
              />
            }
            label={
              <Typography>
                I have read and agreed to the{" "}
                <a className={styles.terms} target="_blank" href={TERMS_AND_CONDITIONS_ENDPOINT}>
                  terms and conditions
                </a>
              </Typography>
            }
          />
        )}
      />
      <Button
        disabled={!termsAccepted}
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
      >
        Continue
      </Button>
    </form>
  );
};

export default PersonalDataForm;
