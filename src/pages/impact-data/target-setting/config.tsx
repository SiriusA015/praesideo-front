import { TabsConfig } from "../models";
import { cloneDeep } from "lodash";
import { CustomFormConfig } from "../../../components/CustomForm/CustomForm.model";
import { MONTHS } from "../../../constants";

export const baselineGhgTargetSettingConfig: CustomFormConfig = {
  fields: [
    {
      name: "baselineYear",
      type: "select",
      defaultValue: "",
      placeholder: "Baseline Year",
      label: "Baseline Year",
      flex: 1,
      options: [
        {
          label: "Financial Year",
          value: "financial",
        },
        {
          label: "Calendar Year",
          value: "calendar",
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
        field: "baselineYear",
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
        field: "baselineYear",
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
        field: "baselineYear",
        value: "calendar",
        disable: false,
      },
    },
    {
      name: "scope",
      type: "section-title",
      defaultValue: "",
      placeholder: "Scope",
      label: "Scope",
      flex: 1,
      description: "tCO2e units",
    },
    {
      name: "scopeNo1",
      type: "text",
      defaultValue: "",
      placeholder: "Scope 1",
      label: "Scope 1",
      flex: 1,
      inputType: "numeric",
    },
    {
      name: "scopeNo2",
      type: "text",
      defaultValue: "",
      placeholder: "Scope 2",
      label: "Scope 2",
      flex: 1,
      inputType: "numeric",
    },
    {
      name: "scopeNo3",
      type: "text",
      defaultValue: "",
      placeholder: "Scope 3",
      label: "Scope 3",
      flex: 1,
      inputType: "numeric",
    },
  ],
};

export const sectionShortTargetFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "isAssumedSubstitution",
      type: "radio",
      defaultValue: "false",
      placeholder: "",
      label: "",
      flex: 1,
      options: [
        {
          label: "Enter Short Term Target Reduction",
          value: "false",
        },
        {
          label: "Assume Linear Reduction Substitution",
          value: "true",
        },
      ],
    },
    {
      name: "targetYear",
      type: "section-title",
      defaultValue: "",
      placeholder: "Target Year 2022",
      label: "Target Year 2022",
      flex: 2,
    },
    {
      name: "targetReduction1",
      type: "text",
      defaultValue: "",
      placeholder: "Target Reduction",
      label: "Target Reduction",
      percentage: true,
      flex: 2,
      inputType: "numeric",
      conditionedBy: {
        field: "isAssumedSubstitution",
        value: "false",
        disable: true,
      },
    },
    {
      name: "targetYear",
      type: "section-title",
      defaultValue: "",
      placeholder: "Target Year 2023",
      label: "Target Year 2023",
      flex: 2,
    },
    {
      name: "targetReduction2",
      type: "text",
      defaultValue: "",
      placeholder: "Target Reduction",
      label: "Target Reduction",
      percentage: true,
      flex: 2,
      inputType: "numeric",
      conditionedBy: {
        field: "isAssumedSubstitution",
        value: "false",
        disable: true,
      },
    },
    {
      name: "targetYear",
      type: "section-title",
      defaultValue: "",
      placeholder: "Target Year 2024",
      label: "Target Year 2024",
      flex: 2,
    },
    {
      name: "targetReduction3",
      type: "text",
      defaultValue: "",
      placeholder: "Target Reduction",
      label: "Target Reduction",
      percentage: true,
      flex: 2,
      inputType: "numeric",
      conditionedBy: {
        field: "isAssumedSubstitution",
        value: "false",
        disable: true,
      },
    },
    {
      name: "targetYear",
      type: "section-title",
      defaultValue: "",
      placeholder: "Target Year 2025",
      label: "Target Year 2025",
      flex: 2,
    },
    {
      name: "targetReduction4",
      type: "text",
      defaultValue: "",
      placeholder: "Target Reduction",
      label: "Target Reduction",
      percentage: true,
      flex: 2,
      inputType: "numeric",
      conditionedBy: {
        field: "isAssumedSubstitution",
        value: "false",
        disable: true,
      },
    },
  ],
};

export const sectionTargetFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "",
      placeholder: "Type",
      label: "Type",
      flex: 2,
      options: [
        {
          label: "Absolute",
          value: 1,
        },
        {
          label: "Relative",
          value: 2,
        },
      ],
    },
    {
      name: "scope",
      type: "select",
      defaultValue: "",
      placeholder: "Scope",
      label: "Scope",
      flex: 2,
    },
    {
      name: "year",
      type: "text",
      defaultValue: "",
      placeholder: "Year",
      label: "Year",
      flex: 2,
      inputType: "numeric",
    },
    {
      name: "reduction",
      type: "text",
      defaultValue: "",
      placeholder: "Reduction",
      label: "Reduction",
      percentage: true,
      flex: 2,
      inputType: "numeric",
    },
  ],
};

export const ghcReductionTargetConfig: CustomFormConfig = {
  fields: [
    {
      name: "target",
      type: "sections",
      remove: true,
      defaultValue: "",
      placeholder: "GHG Reduction Targets",
      label: "Targets",
      addButtonLabel: "New Target",
      formConfig: sectionTargetFormConfig,
      flex: 1,
    },
  ],
};

export const shortTermReductionPlanConfig: CustomFormConfig = {
  fields: [
    {
      name: "shortTerm",
      type: "sections",
      defaultValue: "",
      placeholder: "Short Term Target Reduction",
      label: [
        {
          name: "type",
          type: "select",
          defaultValue: "",
          placeholder: "Target Type",
          label: "Target Type",
          flex: 2,
          options: [
            {
              label: "Absolute",
              value: 1,
            },
            {
              label: "Relative",
              value: 2,
            },
          ],
        },
        {
          name: "scope",
          type: "select",
          defaultValue: "",
          placeholder: "Target Scope",
          label: "Target Scope",
          flex: 2,
        },
      ],
      remove: false,
      emptyMessage: "Please enter first GHG Reduction Targets",
      formConfigConditionedBy: {
        message:
          "Please fill in all the information in Baseline and GHG Reduction Targets tabs",
        conditionBy: [
          { field: "isAssumedSubstitution", value: "true", disable: false },
          { field: "targetReduction1", value: null, disable: false },
          { field: "targetReduction2", value: null, disable: false },
          { field: "targetReduction3", value: null, disable: false },
          { field: "targetReduction4", value: null, disable: false },
        ],
      },
      formConfig: sectionShortTargetFormConfig,
      flex: 1,
    },
  ],
};

export const ghcTargetSettingTabConfig: TabsConfig = {
  formConfig: {
    fields: [
      {
        name: "dataIsNotPresent",
        type: "checkbox",
        defaultValue: "false",
        placeholder: "Company does not have any GHG Target Setting",
        label: [
          {
            name: "companyName",
            label: "Company companyName does not have any GHG Target Setting",
          },
        ],
        flex: 1,
      },
    ],
  },
  formConfigs: [
    cloneDeep(baselineGhgTargetSettingConfig),
    cloneDeep(ghcReductionTargetConfig),
    cloneDeep(shortTermReductionPlanConfig),
  ],
  tabs: [
    {
      label: "1. Baseline",
      value: "baseline",
    },
    {
      label: "2. Ghg Reduction Targets",
      value: "ghgReductionTargets",
    },
    {
      label: "3. Short Term Reduction",
      value: "shortTermReductionPlan",
    },
  ],
};
