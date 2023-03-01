import { useEffect, useState } from "react";

import { CustomFormConfig } from "../../../../components/CustomForm/CustomForm.model";
import ImpactDataService from "../../../../services/ImpactDataService";
import { getOptionsForSelectField } from "../../getOptionsForSelectField";
import { getFlexForOptions } from "../../getFlexForOptions";
import { addConfigValues } from "../../addConfigValues";
import { updateConfig } from "../updateConfig";
import { config } from "./config";
import { BusinessTravelModel, EmployeeCommuteModel, ImpactmEmissionModel } from "../../../../models/impactm-emission.model";
import ImpactmService from "../../../../services/ImpactmService";

export const useEmissionsData = (year: number, isMeasurement: boolean, data: ImpactmEmissionModel | undefined) => {
  const [formDefaultValues, setFormDefaultValues] = useState<any>();
  const [activeConfig, setActiveConfig] = useState<CustomFormConfig>(config);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const recentYear = await ImpactDataService.getRecentYear(year);
    const scope3Calc = await ImpactmService.getImpactmCalc(year); 

    if (isMeasurement) {
      recentYear.sourceNo16 = scope3Calc.scope3BusinessTravel;
      recentYear.sourceNo15 = scope3Calc.scope3EmployeeCommute;
      recentYear.scopeNo3 = scope3Calc.scope3Total;
    } 
 
    const ghgValues = await ImpactDataService.getGHGInventoryMethod();  
    const values = { ...recentYear, ...ghgValues };
  
    await addOperationalBoundary(config, ghgValues);
    await addConfigValues({ formConfig: config });
  
    const updatedConfig = await updateConfig(values, config);

    setFormDefaultValues(values);
    if (updatedConfig) {
      setActiveConfig(updatedConfig);
    }
  };

  const addOperationalBoundary = async (
    config?: CustomFormConfig,
    values?: any
  ) => {
    if (!config) {
      return;
    }

    let insertIndex =
      config.fields.findIndex((element) => element.name === "emissionSource") ||
      0;
    let lastIndex =
      config.fields.findIndex((element) => element.name === "carbonCredits") ||
      0;
    const deleteItems = lastIndex - insertIndex - 1;
    insertIndex++;

    if (deleteItems > -1) {
      config.fields.splice(insertIndex, deleteItems);
    }

    let operationalBoundaryOption = await getOptionsForSelectField(
      "operationalBoundary"
    );

    operationalBoundaryOption.forEach((scope) => {
      let isScopeAdded = false;
      let fieldsForThisScope: number[] = [];
      scope.groupedOptions?.forEach((option) => {
        if (values.operationalBoundary.includes(option.value)) {
          if (!isScopeAdded) {
            config.fields.splice(insertIndex, 0, {
              name: `scope${scope.category}`,
              type: "paragraph",
              defaultValue: "",
              placeholder: `${scope.category}`,
              label: `${scope.category}`,
              flex: 1,
            });
            insertIndex++;
            isScopeAdded = true;
          }
          fieldsForThisScope.push(insertIndex);

          config.fields.splice(insertIndex, 0, {
            name: `sourceNo${option.value}`,
            type: "text",
            defaultValue: "",
            placeholder: `${option.label}`,
            label: `${option.label}`,
            flex: 1,
          });
          insertIndex++;
        }
      });

      fieldsForThisScope.forEach((field, index) => {
        config.fields[field].flex = getFlexForOptions(
          fieldsForThisScope.length,
          index
        );
      });
    });
  };

  const onFormSubmit = async (values: any) => {
    const savedValue = {
      ...formDefaultValues,
      ...values,
    };

    let categoryOptions = config.fields.find(
      (element) => element.name === "carbonCreditsCategoryType"
    )?.options;

    await addOperationalBoundary(config, savedValue);
    const updatedConfig = await updateConfig(values, config);
    await ImpactDataService.saveRecentYear(values, year, categoryOptions);
    if (updatedConfig) {
      setActiveConfig(updatedConfig);
    }
  };

  return {
    activeConfig,
    formDefaultValues,
    onFormSubmit,
  };
};
