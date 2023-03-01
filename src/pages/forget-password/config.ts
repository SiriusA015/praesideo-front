import { CustomFormConfig } from "../../components/CustomForm/CustomForm.model";
import { SectionConfig } from "../login/Models";
import { EMAIL_REGEX, ValidationMessages } from "../../constants";
import styles from "../login/login.module.scss";

export const forgetPasswordFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "email",
      type: "text",
      defaultValue: "",
      placeholder: "Email Address",
      label: "Email Address",
      flex: 1,
      rules: {
        required: {
          value: true,
          message: "Email address is required",
        },
        pattern: {
          value: EMAIL_REGEX,
          message: ValidationMessages.INVALID_EMAIL,
        },
      },
    },
    {
      name: "submit",
      type: "button",
      defaultValue: "",
      placeholder: "",
      label: "Continue",
      flex: 1,
      className: styles.floatBottom,
    },
  ],
};

export const forgetPasswordSectionConfig: SectionConfig = {
  title: "Forget Password",
  description: "Use the email entered during the registration process.",
  alternativeOptionQuestion: "Remeber the password?",
  alternativeOptionButtonLabel: "Log in",
  formConfig: forgetPasswordFormConfig,
};
