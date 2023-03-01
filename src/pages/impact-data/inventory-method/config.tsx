import { CustomFormConfig } from "../../../components/CustomForm/CustomForm.model";

export const inventoryMethodConfig: CustomFormConfig = {
  fields: [
    {
      name: "emissionsAccountingMethod",
      type: "select",
      defaultValue: "",
      placeholder: "Emissions Accounting Method",
      label: "Emissions Accounting Method",
      flex: 1,
    },
    {
      name: "customEmissionsAccountingMethod",
      type: "text",
      defaultValue: "",
      placeholder: "Custom Emissions Accounting Method",
      label: "Custom Emissions Accounting Method",
      flex: 1,
      conditionedBy: {
        field: "emissionsAccountingMethod",
        value: 0,
        disable: false,
      },
    },
    {
      name: "organisationalBoundary",
      type: "select",
      defaultValue: "",
      placeholder: "Organisational Boundary",
      label: "Organisational Boundary",
      flex: 1,
    },
    {
      name: "approachCriteria",
      type: "select",
      defaultValue: "",
      placeholder: "Approach Criteria",
      label: "Approach Criteria",
      flex: 1,
      conditionedBy: {
        field: "organisationalBoundary",
        value: 2,
        disable: false,
      },
    },
  ],
};

export const inventoryMethodAuditingConfig: CustomFormConfig = {
  fields: [
    {
      name: "emissionsAccountingMethod",
      type: "select",
      defaultValue: "",
      placeholder: "Emissions Accounting Method",
      label: "Emissions Accounting Method",
      flex: 1,
    },
    {
      name: "customEmissionsAccountingMethod",
      type: "text",
      defaultValue: "",
      placeholder: "Custom Emissions Accounting Method",
      label: "Custom Emissions Accounting Method",
      flex: 1,
      conditionedBy: {
        field: "emissionsAccountingMethod",
        value: 0,
        disable: false,
      },
    },
    {
      name: "organisationalBoundary",
      type: "select",
      defaultValue: "",
      placeholder: "Organisational Boundary",
      label: "Organisational Boundary",
      flex: 1,
    },
    {
      name: "approachCriteria",
      type: "select",
      defaultValue: "",
      placeholder: "Approach Criteria",
      label: "Approach Criteria",
      flex: 1,
      conditionedBy: {
        field: "organisationalBoundary",
        value: 2,
        disable: false,
      },
    },
    {
      name: "auditingAndValidation",
      type: "select",
      defaultValue: "",
      placeholder: "Auditing and Validation",
      label: "Auditing and Validation",
      flex: 1,
    },
    {
      name: "auditingValidationOther",
      type: "text",
      defaultValue: "",
      placeholder: "Auditing and Validation",
      label: "Auditing and Validation",
      flex: 1,
      conditionedBy: {
        value: 1,
        field: "auditingAndValidation",
        disable: false,
      },
    },
  ],
};
