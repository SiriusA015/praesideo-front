import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants";
import { ValidationMessages } from "../../constants";
import { SectionConfig } from "../login/Models";

export const EMAIL_CONFIG = {
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
};

export const PASSWORD_CONFIG = {
  name: "password",
  type: "text",
  defaultValue: "",
  placeholder: "Password",
  inputType: "password",
  label: "Password",
  flex: 1,
  rules: {
    required: {
      value: true,
      message: "Password is required",
    },
    pattern: {
      value: PASSWORD_REGEX,
      message: ValidationMessages.INVALID_PASSWORD,
    },
  },
};

export const RETYPEPASSWORD_CONFIG = {
  name: "reTypePassword",
  type: "text",
  defaultValue: "",
  placeholder: "Password",
  label: "Re-type your password",
  inputType: "password",
  rules: {
    required: {
      value: true,
      message: "Password is required",
    },
  },
  flex: 1,
};

export const personalDataSectionConfig: SectionConfig = {
  title: "Sign Up",
  subTitle: "Personal Data",
  alternativeOptionQuestion: "Already registered?",
  alternativeOptionButtonLabel: "Log in",
};
