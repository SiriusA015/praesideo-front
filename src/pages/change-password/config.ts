import { CustomFormConfig } from "../../components/CustomForm/CustomForm.model";
import { PASSWORD_REGEX, ValidationMessages } from "../../constants";

const config: CustomFormConfig = {
  fields: [
    {
      name: "password",
      type: "text",
      defaultValue: "",
      placeholder: "",
      inputType: "password",
      label: "New password",
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
    },
    {
      name: "reTypePassword",
      type: "text",
      defaultValue: "",
      placeholder: "Password",
      label: "Re-type new password",
      inputType: "password",
      rules: {
        required: {
          value: true,
          message: "Password is required",
        },
      },
      flex: 1,
    },
    {
      name: "submit",
      type: "button",
      defaultValue: "",
      placeholder: "",
      label: "Submit",
      flex: 1,
    },
  ],
};

export default config;
