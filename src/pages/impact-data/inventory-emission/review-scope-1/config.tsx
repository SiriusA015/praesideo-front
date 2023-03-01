import { TableConfig } from "./models";


export const fuelCombustionTableConfig: TableConfig = {
  tableConfig: [
    {
      field: "fuelTypeId",
      headerName: "Fuel Type",
    },
    {
      field: "fuelAmountRaw",
      headerName: "Quantity",
    },
    {
      field: "fuelUnitId",
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

export const distanceTableConfig: TableConfig = {
  tableConfig: [
    {
      field: "vehicleTypeId",
      headerName: "Vehicle Type",
    },
    {
      field: "distanceAmountRaw",
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


export const refrigerantTableConfig: TableConfig = {
  tableConfig: [
    {
      field: "referigerantTypeId",
      headerName: "Refrigerant Type",
    },
    {
      field: "annualTopupQuantity",
      headerName: "Quantity",
    },
    {
      field: "topupUnitId",
      headerName: "Unit",
    },
    {
      field: "identificationNumber",
      headerName: "Identification N",
    },
    {
      field: "capacity",
      headerName: "Capacity",
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

export const extinguishersTableConfig: TableConfig = {
  tableConfig: [
    {
      field: "annualTopupQuantity",
      headerName: "Quantity",
    },
    {
      field: "topupUnitId",
      headerName: "Unit",
    },
    {
      field: "identificationNumber",
      headerName: "Identification N",
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
