import { FormConfig } from "../../models";
import { CustomFormConfig } from "../../../../components/CustomForm/CustomForm.model";
import ImpactmService from "../../../../services/ImpactmService";

export const boundary: FormConfig = {
  formConfig: {
    fields: [
      {
        name: "operationalBoundary",
        type: "multi-scope3-select",
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

export const employeeCommutePrimaryFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "employeeId",
      type: "text",
      inputType: "text",
      defaultValue: "",
      placeholder: "EMPLOYEE ID",
      label: "EMPLOYEE ID",
      flex: 4,
    },
    {
      name: "transportationModeId",
      type: "select",
      defaultValue: "",
      placeholder: "TRANSPORTATION MODE",
      label: "TRANSPORTATION MODE",
      flex: 4,
    },
    {
      name: "distanceTravelledYearly",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "DISTANCE COMMUTED YEARLY",
      label: "DISTANCE COMMUTED YEARLY",
      flex: 4,
    },
    {
      name: "distanceUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      filterOptionsBy: "transportationModeId",
      flex: 4,
    },
  ],
};

export const employeeCommutePrimaryConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope3EmployeeCommute",
      type: "sections-facility",
      remove: true,
      onRemove: ImpactmService.deleteStationaryEmployeeCommute,
      defaultValue: "",
      placeholder: "Employee Commuting",
      label: "Employee Commuting",
      addButtonLabel: "New Entry",
      formConfig: employeeCommutePrimaryFormConfig,
      flex: 1,
    },
  ],
};

export const employeeCommutePartialFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "employeeId",
      type: "text",
      inputType: "text",
      defaultValue: "",
      placeholder: "EMPLOYEE ID",
      label: "EMPLOYEE ID",
      flex: 4,
    },
    {
      name: "transportationModeId",
      type: "select",
      defaultValue: "",
      placeholder: "TRANSPORTATION MODE",
      label: "TRANSPORTATION MODE",
      flex: 4,
    },
    {
      name: "distanceTravelledDaily",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "DISTANCE COMMUTED DAILY",
      label: "DISTANCE COMMUTED DAILY",
      flex: 4,
    },
    {
      name: "distanceUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      filterOptionsBy: "transportationModeId",
      flex: 4,
    },
  ],
};

export const employeeCommutePartialConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope3EmployeeCommute",
      type: "sections-facility",
      remove: true,
      onRemove: ImpactmService.deleteStationaryEmployeeCommute,
      defaultValue: "",
      placeholder: "Employee Commuting",
      label: "Employee Commuting",
      addButtonLabel: "New Entry",
      formConfig: employeeCommutePartialFormConfig,
      flex: 1,
    },
  ],
};


export const employeeCommuteApproximativeFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "employeePercentage",
      type: "text",
      inputType: "text",
      defaultValue: "",
      placeholder: "% OF EMPLOYEES",
      label: "% OF EMPLOYEES",
      flex: 4,
    },
    {
      name: "transportationModeId",
      type: "select",
      defaultValue: "",
      placeholder: "TRAVELLING BY",
      label: "TRAVELLING BY",
      flex: 4,
    },
    {
      name: "calcTotalDistanceConverted",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "AVERAGE DISTANCE",
      label: "AVERAGE DISTANCE",
      flex: 4,
    },
    {
      name: "distanceUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      filterOptionsBy: "transportationModeId",
      flex: 4,
    },
  ],
};

export const employeeCommuteApproximativeConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope3EmployeeCommute",
      type: "sections-facility",
      remove: true,
      onRemove: ImpactmService.deleteStationaryEmployeeCommute,
      defaultValue: "",
      placeholder: "Employee Commuting",
      label: "Employee Commuting",
      addButtonLabel: "New Entry",
      formConfig: employeeCommuteApproximativeFormConfig,
      flex: 1,
    },
  ],
};

export const businessTravelPrimaryFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "employeeId",
      type: "text",
      inputType: "text",
      defaultValue: "",
      placeholder: "EMPLOYEE ID",
      label: "EMPLOYEE ID",
      flex: 4,
    },
    {
      name: "transportationModeId",
      type: "select",
      defaultValue: "",
      placeholder: "TRANSPORTATION MODE",
      label: "TRANSPORTATION MODE",
      flex: 4,
    },
    {
      name: "distanceTravelledYearly",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "DISTANCE COMMUTED YEARLY",
      label: "DISTANCE COMMUTED YEARLY",
      flex: 4,
    },
    {
      name: "distanceUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      filterOptionsBy: "transportationModeId",
      flex: 4,
    },
  ],
};

export const businessTravelPrimaryConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope3BusinessTravel",
      type: "sections-facility",
      remove: true,
      onRemove: ImpactmService.deleteStationaryBusinessTravel,
      defaultValue: "",
      placeholder: "Business Travel",
      label: "Business Travel",
      addButtonLabel: "New Entry",
      formConfig: businessTravelPrimaryFormConfig,
      flex: 1,
    },
  ],
};

export const businessTravelPartialFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "employeeId",
      type: "text",
      inputType: "text",
      defaultValue: "",
      placeholder: "EMPLOYEE ID",
      label: "EMPLOYEE ID",
      flex: 4,
    },
    {
      name: "transportationModeId",
      type: "select",
      defaultValue: "",
      placeholder: "TRANSPORTATION MODE",
      label: "TRANSPORTATION MODE",
      flex: 4,
    },
    {
      name: "distanceTravelledDaily",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "DISTANCE COMMUTED DAILY",
      label: "DISTANCE COMMUTED DAILY",
      flex: 4,
    },
    {
      name: "distanceUnitId",
      type: "select",
      defaultValue: "",
      placeholder: "Unit",
      label: "Unit",
      filterOptionsBy: "transportationModeId",
      flex: 4,
    },
  ],
};

export const businessTravelPartialConfig: CustomFormConfig = {
  fields: [
    {
      name: "dataImpactmScope3BusinessTravel",
      type: "sections-facility",
      remove: true,
      onRemove: ImpactmService.deleteStationaryBusinessTravel,
      defaultValue: "",
      placeholder: "Business Travel",
      label: "Business Travel",
      addButtonLabel: "New Entry",
      formConfig: businessTravelPartialFormConfig,
      flex: 1,
    },
  ],
};