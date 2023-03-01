import { cloneDeep } from "lodash";

import { CustomFormConfig } from "../../../components/CustomForm/CustomForm.model";

export const updateConfig = async (
  values: any,
  baseConfig?: CustomFormConfig
) => {
  let config = cloneDeep(baseConfig);
  let insertIndex =
    config?.fields.findIndex(
      (element) => element.name === "carbonCreditsCategoryType"
    ) || 10;
  if (values.carbonCreditsCategoryType && config) {
    for (let i = 0; i < values.carbonCreditsCategoryType.length; i++) {
      let label: string | undefined = "";
      config?.fields
        .find((element) => element.name === "carbonCreditsCategoryType")
        ?.options?.forEach((option) => {
          let optionLabel = option.groupedOptions?.find(
            (element) => element.value === values.carbonCreditsCategoryType[i]
          );
          if (optionLabel) {
            label = optionLabel.label;
          }
        });
      config?.fields.splice(insertIndex + 1, 0, {
        name: `typeSection${values.carbonCreditsCategoryType[i]}`,
        type: "section-title",
        defaultValue: "",
        placeholder: label,
        label: label,
        flex: 1,
        conditionedBy: {
          field: "participationOfCarbonCredits",
          value: "yes",
          disable: false,
        },
      });
      insertIndex++;
      config?.fields.splice(insertIndex + 1, 0, {
        name: `quantity${values.carbonCreditsCategoryType[i]}`,
        type: "text",
        defaultValue: "",
        placeholder: "Quantity",
        label: "Quantity",
        flex: 3,
        conditionedBy: {
          field: "participationOfCarbonCredits",
          value: "yes",
          disable: false,
        },
        inputType: "numeric",
      });
      insertIndex++;
      config?.fields.splice(insertIndex + 1, 0, {
        name: `cost${values.carbonCreditsCategoryType[i]}`,
        type: "text",
        defaultValue: "",
        placeholder: "Cost",
        label: "Cost",
        flex: 3,
        conditionedBy: {
          field: "participationOfCarbonCredits",
          value: "yes",
          disable: false,
        },
        inputType: "numeric",
      });
      insertIndex++;
      config?.fields.splice(insertIndex + 1, 0, {
        name: `certificationBody${values.carbonCreditsCategoryType[i]}`,
        type: "text",
        defaultValue: "",
        placeholder: "Certification Body",
        label: "Certification Body",
        flex: 3,
        conditionedBy: {
          field: "participationOfCarbonCredits",
          value: "yes",
          disable: false,
        },
      });
      insertIndex++;
    }
  }
  return config;
};
