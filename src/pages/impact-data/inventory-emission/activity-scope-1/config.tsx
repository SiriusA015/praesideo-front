import { CustomFormConfig } from "../../../../components/CustomForm/CustomForm.model";
import ImpactmService from "../../../../services/ImpactmService";
import { FormConfig } from "../../models";

export const boundary: FormConfig = {
  formConfig: {
    fields: [
      {
        name: "operationalBoundary",
        type: "multi-scope1-select",
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

export const stationaryFuelTypeFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "fuelTypeId",
      type: "select",
      defaultValue: "",
      placeholder: "Type of Fuel",
      label: "Type of Fuel",
      flex: 3,
    },
    {
      name: "fuelAmountRaw",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "Total Fuel Burnt",
      label: "Total Fuel Burnt",
      flex: 3,
    },
    {
      name: "fuelUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      filterOptionsBy: "fuelTypeId",
      flex: 3,
    },
  ],
};

export const stationaryFuelTypeConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope1FuelCombustion",
      type: "sections",
      remove: true,
      onRemove: ImpactmService.deleteStationaryFuel,
      defaultValue: "",
      placeholder: "Fuel Type",
      label: "Fuel Type",
      addButtonLabel: "New",
      formConfig: stationaryFuelTypeFormConfig,
      flex: 1,
    },
  ],
};


export const mobileFuelTypeFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "fuelTypeId",
      type: "select",
      defaultValue: "",
      placeholder: "Type of Fuel",
      label: "Type of Fuel",
      flex: 3,
    },
    {
      name: "fuelAmountRaw",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "Total Fuel Burnt",
      label: "Total Fuel Burnt",
      flex: 3,
    },
    {
      name: "fuelUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      filterOptionsBy: "fuelTypeId",
      flex: 3,
    },
  ],
};

export const mobileFuelTypeConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope1MobileFuelCombustion",
      type: "sections",
      remove: true,
      onRemove: ImpactmService.deleteMobileFuel,
      defaultValue: "",
      placeholder: "Fuel Type",
      label: "Fuel Type",
      addButtonLabel: "New",
      formConfig: mobileFuelTypeFormConfig,
      flex: 1,
    },
  ],
};

export const mobileDistanceFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "vehicleCategoryId",
      type: "select",
      defaultValue: "",
      placeholder: "Vehicle Category",
      label: "Vehicle Category",
      flex: 4,
    },
    {
      name: "vehicleTypeId",
      type: "select",
      defaultValue: "",
      placeholder: "Vehicle Type",
      label: "Vehicle Type",
      filterOptionsBy: "vehicleCategoryId",
      flex: 4,
    },
    {
      name: "distanceAmountRaw",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "Distance",
      label: "Distance",
      flex: 4,
    },
    {
      name: "distanceUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      filterOptionsBy: "vehicleTypeId",
      flex: 4,
    },
  ],
};

export const mobileDistanceConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope1Distance",
      type: "sections",
      remove: true,
      onRemove: ImpactmService.deleteDistance,
      defaultValue: "",
      placeholder: "Distance Travelled",
      label: "Distance Travelled",
      addButtonLabel: "New",
      formConfig: mobileDistanceFormConfig,
      flex: 1,
    },
  ],
};


export const RefrigeratorsFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "applianceTypeId",
      type: "select",
      defaultValue: "",
      placeholder: "APPLIANCE",
      label: "APPLIANCE",
      flex: 1,
    },
    {
      name: "referigerantTypeId",
      type: "select",
      defaultValue: "",
      placeholder: "Type of refrigerant",
      label: "Type of refrigerant",
      flex: 3,
    },
    {
      name: "annualTopupQuantity",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "Annual quantity of top up",
      label: "Annual quantity of top up",
      flex: 3,
    },
    {
      name: "topupUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      filterOptionsBy: "referigerantTypeId",
      flex: 3,
    },
    {
      name: "identificationNumber",
      type: "text",
      defaultValue: "",
      placeholder: "Identification N",
      label: "Identification N",
      flex: 2,
    },
    {
      name: "capacity",
      type: "text",
      defaultValue: "",
      placeholder: "Capacity (tons)",
      label: "Capacity (tons)",
      flex: 2,
    },
  ],
};


export const refrigeratorsConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope1Refrigerators",
      type: "sections",
      remove: true,
      onRemove: ImpactmService.deleteRefrigerator,
      defaultValue: "",
      placeholder: "Refrigerators/Chillers",
      label: "Refrigerators/Chillers",
      addButtonLabel: "New",
      formConfig: RefrigeratorsFormConfig,
      flex: 1,
    },
  ],
};

export const ExtinguishersFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "applianceTypeId",
      type: "select",
      defaultValue: "",
      placeholder: "APPLIANCE",
      label: "APPLIANCE",
      flex: 3,
    },
    {
      name: "annualTopupQuantity",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "Annual quantity of top up",
      label: "Annual quantity of top up",
      flex: 3,
    },
    {
      name: "topupUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      flex: 3,
    },
    {
      name: "identificationNumber",
      type: "text",
      defaultValue: "",
      placeholder: "Identification N",
      label: "Identification N",
      flex: 1,
    },
  ],
};

export const extinguishersConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope1Extinguishers",
      type: "sections",
      remove: true,
      onRemove: ImpactmService.deleteExtinguisher,
      defaultValue: "",
      placeholder: "Extinguisher",
      label: "Extinguisher",
      addButtonLabel: "New",
      formConfig: ExtinguishersFormConfig,
      flex: 1,
    },
  ],
};