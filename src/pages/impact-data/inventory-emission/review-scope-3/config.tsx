import { TableConfig } from "../review-scope-1/models";

export const employeeCommuteTableConfig: TableConfig = {
  tableConfig: [
    {
      field: "facilityId",
      headerName: "Facility",
    },
    {
      field: "transportationModeId",
      headerName: "Transportation mode",
    },
    {
      field: "calcTotalDistanceConverted",
      headerName: "Distance",
    },
    {
      field: "distanceUnitId",
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

export const businessTravelTableConfig: TableConfig = {
  tableConfig: [
    {
      field: "facilityId",
      headerName: "Facility",
    },
    {
      field: "transportationModeId",
      headerName: "Transportation mode",
    },
    {
      field: "calcTotalDistanceConverted",
      headerName: "Distance",
    },
    {
      field: "distanceUnitId",
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