import { CustomFormConfig } from "../../../components/CustomForm/CustomForm.model";
import { MONTHS } from "../../../constants";

export const financialInformationConfig: CustomFormConfig = {
  fields: [
    {
      name: "reportingYear",
      type: "select",
      defaultValue: "",
      placeholder: "Reporting Year",
      label: "Reporting Year",
      flex: 1,
      options: [
        {
          label: "Financial Year",
          value: "financial",
        },
        {
          label: "Reporting Year",
          value: "reporting",
        },
      ],
    },
    {
      name: "financialYearStartMonth",
      type: "select",
      defaultValue: "",
      placeholder: "Financial Year Start Month",
      label: "Financial Year Start Month",
      flex: 1,
      conditionedBy: {
        field: "reportingYear",
        value: "financial",
        disable: false,
      },
      options: MONTHS.map((m) => ({
        label: m.text,
        value: m.value,
      })),
    },
    {
      name: "financialYear",
      type: "select",
      defaultValue: "",
      placeholder: "Year",
      label: "Year",
      flex: 1,
      conditionedBy: {
        field: "reportingYear",
        value: "financial",
        disable: false,
      },
    },
    {
      name: "year",
      type: "select",
      defaultValue: "",
      placeholder: "Year",
      label: "Year",
      flex: 1,
      conditionedBy: {
        field: "reportingYear",
        value: "reporting",
        disable: false,
      },
    },
    {
      name: "baseCurrency",
      type: "select",
      defaultValue: "",
      placeholder: "Base Currency",
      label: "Base Currency",
      flex: 1,
      groupOptions: true,
    },
    {
      name: "turnover",
      type: "text",
      defaultValue: "",
      placeholder: "Turnover / Revenue",
      label: "Turnover / Revenue",
      flex: 2,
      inputType: "numeric",
    },
    {
      name: "netProfit",
      type: "text",
      defaultValue: "",
      placeholder: "Net Profit",
      label: "Net Profit",
      flex: 2,
      inputType: "numeric",
    },
  ],
};
