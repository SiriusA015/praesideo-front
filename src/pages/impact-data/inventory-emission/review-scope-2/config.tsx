import { TableConfig } from "../review-scope-1/models";

export const electricityTableConfig: TableConfig = {
  tableConfig: [
    {
      field: "facilityId",
      headerName: "Facility",
    },
    {
      field: "totalElectricityAmountRaw",
      headerName: "Total Electricity",
    },
    {
      field: "totalElectricityUnitId",
      headerName: "Unit",
    },
    {
      field: "totalRenewableAmountRaw",
      headerName: "Total Renewable",
    },
    {
      field: "totalRenewableUnitId",
      headerName: "Unit",
    },
    {
      field: "emissionFactorId",
      headerName: "Emissions Factors",
    },
    {
      field: "emissionFactorByUser",
      headerName: "Change",
    },
  ],
  formConfig: {
    fields: [
      {
        name: "subTitle",
        type: "section-title",
        defaultValue: "",
        placeholder: "Emissions Factors",
        label: "Emissions Factors",
        flex: 1
      },
      {
        name: "emissionFactorId",
        type: "select",
        optionsField: "emissionFactorsList",
        defaultValue: "",
        placeholder: "Emissions Factors",
        label: "Emissions Factors",
        flex: 2,
      },
      {
        name: "emissionFactorByUser",
        type: "text",
        inputType: "numeric",
        defaultValue: "",
        placeholder: "Overwrite emission factor proposed",
        label: "Overwrite emission factor proposed",
        flex: 2,
      },
    ],
  },
}
