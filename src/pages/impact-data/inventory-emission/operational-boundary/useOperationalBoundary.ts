import { useEffect, useState } from "react";
import { operationalBoundary } from "./config";
import { getDataForStep } from "../../getDataForStep";
import { GHG_INVENTORY_METHOD_STEP } from "../../constants";
import { cloneDeep } from "lodash";
import { addConfigValues } from "../../addConfigValues";
import { FormConfig } from "../../models";
import ImpactDataService from "../../../../services/ImpactDataService";


export const useOperationalBoundary = () => {
  const [formDefaultValues, setFormDefaultValues] = useState<any>();
  const [activeConfig, setActiveConfig] = useState<FormConfig>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let config = cloneDeep(operationalBoundary);
    const values = await getDataForStep(GHG_INVENTORY_METHOD_STEP);

    await addConfigValues(config);

    setFormDefaultValues(values);
    setActiveConfig(config);
  }

  const onFormSubmit = async (values: any) => {
    const savedValue = {
      ...formDefaultValues,
      ...values,
    };

    await ImpactDataService.saveGHGInventoryMethod(savedValue);
  }

  return {
    formDefaultValues,
    activeConfig,
    onFormSubmit
  }
}
