import { FormConfig } from "../../models";


export const operationalBoundary: FormConfig = {
  formConfig: {
    fields: [
      {
        name: "operationalBoundary",
        type: "multi-select",
        defaultValue: "",
        placeholder: "Operational Boundary",
        label: "Operational Boundary",
        flex: 1,
        grouping: true,
        multiple: true,
      },
    ],
  },
};
