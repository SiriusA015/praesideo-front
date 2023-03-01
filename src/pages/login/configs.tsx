import { CustomFormConfig } from "../../components/CustomForm/CustomForm.model";
import { EMAIL_REGEX, FORGET_PASSWORD_ROUTE } from "../../constants";
import { ValidationMessages } from "../../constants";
import styles from "./login.module.scss";
import { SectionConfig } from "./Models";

export const loginFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "email",
      type: "text",
      defaultValue: "",
      placeholder: "Email Address",
      label: "Email Address",
      autocomplete: "username",
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
      name: "password",
      type: "text",
      defaultValue: "",
      placeholder: "Password",
      label: "Password",
      flex: 1,
      inputType: "password",
      autocomplete: "current-password",
      rules: {
        required: {
          value: true,
          message: "Password is required",
        },
      },
    },
    {
      name: "rememberMe",
      type: "checkbox",
      defaultValue: "",
      placeholder: "",
      label: "Remember me",
      flex: 2,
      className: styles.mv28,
    },
    {
      name: "forgotPassword",
      type: "text-button",
      defaultValue: "",
      placeholder: "",
      label: "Forgot password?",
      flex: 2,
      className: `${styles.mv28} ${styles.rightAlign}`,
      link: `#${FORGET_PASSWORD_ROUTE}`,
    },
    {
      name: "submit",
      type: "button",
      defaultValue: "",
      placeholder: "",
      label: "Login",
      flex: 1,
    },
  ],
};

export const companyInfoFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "company",
      type: "text",
      defaultValue: "",
      placeholder: "Company Address",
      label: "Company Address",
      flex: 1,
    },
    {
      name: "aboutYourCompany",
      type: "text",
      defaultValue: "",
      placeholder: "About your company",
      label: "About your company",
      flex: 1,
    },
    {
      name: "city",
      type: "text",
      defaultValue: "",
      placeholder: "City",
      label: "City",
      flex: 2,
    },
    {
      name: "country",
      type: "text",
      defaultValue: "",
      placeholder: "Country",
      label: "Country",
      flex: 2,
    },
    {
      name: "industry",
      type: "text",
      defaultValue: "",
      placeholder: "Industry",
      label: "Industry",
      flex: 1,
    },
    {
      name: "subSector",
      type: "text",
      defaultValue: "",
      placeholder: "Sub-Sector",
      label: "Sub-Sector",
      flex: 1,
    },
    {
      name: "submit",
      type: "button",
      defaultValue: "",
      placeholder: "",
      label: "Sign up",
      flex: 1,
      className: styles.floatBottom,
    },
  ],
};

export const chooseCompanyFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "submit",
      type: "button",
      defaultValue: "",
      placeholder: "",
      label: "Join existing account",
      flex: 1,
    },
  ],
};

export const loginSectionConfig: SectionConfig = {
  title: "Sign In",
  description: "Use your credentials provided during the registration process to sign in.",
  alternativeOptionQuestion: "Don’t have an account?",
  alternativeOptionButtonLabel: "Sign up",
  formConfig: loginFormConfig,
};

export const companyInfoSectionConfig: SectionConfig = {
  title: "Sign Up",
  subTitle: "Company Info",
  formConfig: companyInfoFormConfig,
};
