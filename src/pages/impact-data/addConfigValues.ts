import { FormConfig } from "./models";
import { getOptionsForSelectField } from "./getOptionsForSelectField";
import { Field } from "../../components/CustomForm/CustomForm.model";

export const addConfigValues = async (config: FormConfig) => {
  if (config.formConfig) {
    for (const field of config.formConfig.fields || []) {
      await populateField(field);
    }
  } else if (config.tabsConfig) {
    for (const field of config.tabsConfig.formConfig?.fields || []) {
      await populateField(field);
    }

    for (const formConfig of config.tabsConfig.formConfigs || []) {
      for (const field of formConfig?.fields || []) {
        await populateField(field);

        if (field.type === "sections") {
          if (typeof field.label === "object") {
            for (const label of field.label || []) {
              if (typeof label === "object" && !label.options) {
                label.options = await getOptionsForSelectField(label.name);
              }
            }
          }

          for (const sectionField of field.formConfig?.fields || []) {
            await populateField(sectionField);

            if (sectionField.type === "sections") {
              for (const subSectionField of sectionField.formConfig?.fields || []) {
                await populateField(subSectionField);
              }
            }
          }
        }
      }
    }
  }
};


const populateField = async (field: Field) => {
  if ((field.type === "select" || field.type === "multi-select" || field.type === "multi-scope1-select" || field.type === "multi-scope3-select") && !field.options) {
    field.options = await getOptionsForSelectField(field.name);
  }
};
