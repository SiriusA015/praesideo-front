import { FormConfig } from "../../models";

export const boundary: FormConfig = {
  formConfig: {
    fields: [
      {
        name: "operationalBoundary",
        type: "multi-scope2-select",
        defaultValue: "",
        placeholder: "Boundaries",
        label: "Boundaries",
        flex: 1,
        grouping: true,
        multiple: true,
      },
    ],
  },
};