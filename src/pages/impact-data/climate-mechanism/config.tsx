import { CustomFormConfig } from "../../../components/CustomForm/CustomForm.model";

export const sectionInfluencesFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "businessAssociation",
      type: "text",
      defaultValue: "",
      placeholder: "Business Association",
      label: "Business Association",
      flex: 1,
    },
  ],
};

export const climateMetricsConfig: CustomFormConfig = {
  fields: [
    {
      name: "internalCarbonPriceUsed",
      type: "select",
      defaultValue: "",
      placeholder: "Internal Carbon Price Used",
      label: "Internal Carbon Price Used",
      flex: 1,
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
    {
      name: "carbonPrice",
      type: "text",
      defaultValue: "",
      placeholder: "Carbon Price",
      label: "Carbon Price",
      flex: 2,
      conditionedBy: {
        field: "internalCarbonPriceUsed",
        value: "yes",
        disable: false,
      },
      inputType: "numeric",
    },
    {
      name: "baseCurrency",
      type: "select",
      defaultValue: "",
      placeholder: "Carbon Price Currency",
      label: "Carbon Price Currency",
      flex: 2,
      conditionedBy: {
        field: "internalCarbonPriceUsed",
        value: "yes",
        disable: false,
      },
      groupOptions: true,
    },
    {
      name: "carbonPriceCoverage",
      type: "select",
      defaultValue: "",
      placeholder: "Operational Coverage",
      label: "Operational Coverage",
      flex: 2,
      conditionedBy: {
        field: "internalCarbonPriceUsed",
        value: "yes",
        disable: false,
      },
    },
    {
      name: "carbonPriceCoverageType",
      type: "select",
      defaultValue: "",
      placeholder: "Operational Coverage Type",
      label: "Operational Coverage Type",
      flex: 2,
      conditionedBy: {
        field: "internalCarbonPriceUsed",
        value: "yes",
        disable: false,
      },
      filterOptionsBy: "carbonPriceCoverage",
    },
    {
      name: "climateInfluence",
      type: "section-title",
      defaultValue: "",
      placeholder: "Climate Influence",
      label: "Climate Influence",
      flex: 1,
    },
    {
      name: "influences",
      type: "sections",
      remove: true,
      defaultValue: "",
      placeholder: "Climate Influence",
      label: "Climate Influence",
      addButtonLabel: "New Business Association",
      formConfig: sectionInfluencesFormConfig,
      flex: 1,
    },
  ],
};
