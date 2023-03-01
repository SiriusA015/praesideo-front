import { CustomFormConfig } from "../../../components/CustomForm/CustomForm.model";

export const supportingDocumentsConfig: CustomFormConfig = {
  fields: [
    {
      name: "sustainabilityReport",
      type: "file",
      defaultValue: "",
      placeholder: "Sustainability Report",
      label: "Sustainability Report",
      flex: 1,
    },
    {
      name: "ghcInventoryReports",
      type: "file",
      defaultValue: "",
      placeholder: "GHG Inventory Disclosure Reports and Audit Reports",
      label: "GHG Inventory Disclosure Reports and Audit Reports",
      flex: 1,
    },
    {
      name: "financialReports",
      type: "file",
      defaultValue: "",
      placeholder: "Financial Reports",
      label: "Financial Reports",
      flex: 1,
    },
    {
      name: "tcfdReport",
      type: "file",
      defaultValue: "",
      placeholder: "TCFD Report",
      label: "TCFD Report",
      flex: 1,
    },
    {
      name: "climateStrategy",
      type: "file",
      defaultValue: "",
      placeholder: "Climate Strategy",
      label: "Climate Strategy",
      flex: 1,
    },
    {
      name: "offsetStrategy",
      type: "file",
      defaultValue: "",
      placeholder: "Offset Strategy",
      label: "Offset Strategy",
      flex: 1,
    },
    {
      name: "other",
      type: "file",
      defaultValue: "",
      placeholder: "Other documents",
      label: "Other documents",
      flex: 1,
    },
  ],
};
