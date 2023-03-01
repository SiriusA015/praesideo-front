import { useEffect, useState } from "react";
import { CustomFormConfig, Option } from "../../../../components/CustomForm/CustomForm.model";
import { mobileFuelTypeConfig, stationaryFuelTypeConfig, mobileDistanceConfig, refrigeratorsConfig,extinguishersConfig } from "./config";
import DropdownService from "../../../../services/DropdownService";
import { ImpactmRefDataModel } from "../../../../models/impactm-ref-data.model";
import { cloneDeep } from "lodash";
import ImpactmService from "../../../../services/ImpactmService";
import ImpactDataService from "../../../../services/ImpactDataService";
import { getDataForStep } from "../../getDataForStep";
import { useAuth } from "../../../../helpers/useAuth";
import { ImpactmEmissionModel } from "../../../../models/impactm-emission.model";
import { GHG_INVENTORY_METHOD_STEP } from "../../constants";
import {
  STATIONARY_FUEL_COMBUSTION,
  MOBILE_FUEL_COMBUSTION,
  MOBILE_DISTANCE,
  REFRIGERANT_TYPE,
  REFRIGERATOR_APPLIANCE_TYPE,
  EXTINGUISHER_APPLIANCE_TYPE, EXTINGUISHER_UNIT,
} from "./constants";
import { TabData } from "../models";
import { FormConfig } from "../../models";
import { boundary } from "./config";
import { addConfigValues } from "../../addConfigValues";

export const useActivityScope1 = (props: TabData) => {
  const { user } = useAuth();
  const [formDefaultValues, setFormDefaultValues] = useState<any>();
  const [activeConfig, setActiveConfig] = useState<FormConfig>();
  const [isStationaryCombustion, setStationaryCombustion] = useState<boolean>(false);
  const [isMobileCombustion, setMobileCombustion] = useState<boolean>(false);
  const [isRefrigerators, setRefrigerators] = useState<boolean>(false);
  const [isFireExtinguisher, setFireExtinguisher] = useState<boolean>(false);
  const [activeStationaryConfig, setStationaryConfig] = useState<CustomFormConfig>();
  const [activeMobileConfig, setMobileConfig] = useState<CustomFormConfig>();
  const [activeDistanceConfig, setDistanceConfig] = useState<CustomFormConfig>();
  const [activeRefrigeratorConfig, setRefrigeratorConfig] = useState<CustomFormConfig>();
  const [activeExtinguisherConfig, setExtinguisherConfig] = useState<CustomFormConfig>();
  const [defaultValue, setDefaultValue] = useState<ImpactmEmissionModel>();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const impactmRefData = await DropdownService.getImpactmRefData();
    const stationaryConfig = cloneDeep(stationaryFuelTypeConfig);
    const mobileConfig = cloneDeep(mobileFuelTypeConfig);
    const distanceConfig = cloneDeep(mobileDistanceConfig);
    const refrigeratorConfig = cloneDeep(refrigeratorsConfig);
    const extinguisherConfig = cloneDeep(extinguishersConfig);
    let config = cloneDeep(boundary);

    const values = await getDataForStep(GHG_INVENTORY_METHOD_STEP);
    await addConfigValues(config);

    setFormDefaultValues(values);    
    setActiveConfig(config);

    const stationaryFuelCombustionOptions = impactmRefData
      ?.find((ref: ImpactmRefDataModel) => ref.listValue === STATIONARY_FUEL_COMBUSTION);

    const mobileFuelCombustionOptions = impactmRefData
      ?.find((ref: ImpactmRefDataModel) => ref.listValue === MOBILE_FUEL_COMBUSTION);

    const mobileDistanceOptions = impactmRefData
      ?.find((ref: ImpactmRefDataModel) => ref.listValue === MOBILE_DISTANCE);

    const refrigerantTypeOptions = impactmRefData
      ?.find((ref: ImpactmRefDataModel) => ref.listValue === REFRIGERANT_TYPE);

    const refrigeratorApplianceOptions = impactmRefData
      ?.find((ref: ImpactmRefDataModel) => ref.listValue === REFRIGERATOR_APPLIANCE_TYPE);

    const extinguisherApplianceOptions = impactmRefData
      ?.find((ref: ImpactmRefDataModel) => ref.listValue === EXTINGUISHER_APPLIANCE_TYPE);

    const extinguisherUnitOptions = impactmRefData
      ?.find((ref: ImpactmRefDataModel) => ref.listValue === EXTINGUISHER_UNIT);

    populateFuelDropDowns(stationaryConfig, stationaryFuelCombustionOptions.childList);
    populateFuelDropDowns(mobileConfig, mobileFuelCombustionOptions.childList);
    populateVehicleCategoryDropDowns(distanceConfig, mobileDistanceOptions.childList);
    populateRefrigeratorDropDowns(refrigeratorConfig, refrigeratorApplianceOptions.childList,refrigerantTypeOptions.childList);
    populateExtinguisherDropDowns(extinguisherConfig, extinguisherApplianceOptions.childList,extinguisherUnitOptions.childList );

    setStationaryConfig(stationaryConfig);
    setMobileConfig(mobileConfig);
    setDistanceConfig(distanceConfig);
    setRefrigeratorConfig(refrigeratorConfig);
    setExtinguisherConfig(extinguisherConfig);
  };


  const populateExtinguisherDropDowns = (config: CustomFormConfig,
                                         extinguisherApplianceOptions: ImpactmRefDataModel[],
                                         extinguisherUnitOptions: ImpactmRefDataModel[]) => {
    config.fields.forEach(field => {
      field.formConfig?.fields.forEach(sectionField => {
        if (sectionField.name === "applianceTypeId" && !sectionField.options) {
          sectionField.options = extinguisherApplianceOptions?.map((ref: ImpactmRefDataModel) => ({
            label: ref.listValue,
            value: ref.listId,
          }));
        }

        if (sectionField.name === "topupUnitId") {
          const topupUnitOptions: Option[] = [];

          extinguisherUnitOptions?.forEach((ref: ImpactmRefDataModel) => {
            ref?.childList?.forEach((subRef: ImpactmRefDataModel) => topupUnitOptions.push({
              label: subRef.listValue,
              value: subRef.listId,
              group: ref.listId,
            }));
          });
          sectionField.options = topupUnitOptions;
        }
      });
    });
  };

  const populateRefrigeratorDropDowns = (config: CustomFormConfig,
                                         refrigeratorApplianceOptions: ImpactmRefDataModel[],
                                         refrigerantTypeOptions: ImpactmRefDataModel[]) => {
    config.fields.forEach(field => {
      field.formConfig?.fields.forEach(sectionField => {
        if (sectionField.name === "referigerantTypeId" && !sectionField.options) {
          sectionField.options = refrigerantTypeOptions?.map((ref: ImpactmRefDataModel) => ({
            label: ref.listValue,
            value: ref.listId,
          }));
        }

        if (sectionField.name === "applianceTypeId" && !sectionField.options) {
          sectionField.options = refrigeratorApplianceOptions?.map((ref: ImpactmRefDataModel) => ({
            label: ref.listValue,
            value: ref.listId,
          }));
        }

        if (sectionField.name === "topupUnitId") {
          const topupUnitOptions: Option[] = [];

          refrigerantTypeOptions?.forEach((ref: ImpactmRefDataModel) => {
            ref?.childList?.forEach((subRef: ImpactmRefDataModel) => topupUnitOptions.push({
              label: subRef.listValue,
              value: subRef.listId,
              group: ref.listId,
            }));
          });
          sectionField.options = topupUnitOptions;
        }
      });
    });
  };

  const populateVehicleCategoryDropDowns = (config: CustomFormConfig, mobileDistanceOptions: ImpactmRefDataModel[]) => {
    config.fields.forEach(field => {
      field.formConfig?.fields.forEach(sectionField => {
        if (sectionField.name === "vehicleCategoryId" && !sectionField.options) {
          sectionField.options = mobileDistanceOptions?.map((ref: ImpactmRefDataModel) => ({
            label: ref.listValue,
            value: ref.listId,
          }));
        }

        if (sectionField.name === "vehicleTypeId") {
          const vehicleTypeOptions: Option[] = [];

          mobileDistanceOptions?.forEach((ref: ImpactmRefDataModel) => {
            ref?.childList?.forEach((subRef: ImpactmRefDataModel) => vehicleTypeOptions.push({
              label: subRef.listValue,
              value: subRef.listId,
              group: ref.listId,
            }));
          });

          sectionField.options = vehicleTypeOptions;
        }

        if (sectionField.name === "distanceUnitId") {
          const distanceUnitOptions: Option[] = [];

          mobileDistanceOptions?.forEach((ref: ImpactmRefDataModel) => {
            ref?.childList?.forEach((subRef: ImpactmRefDataModel) => {
              subRef?.childList?.forEach((subSubRef: ImpactmRefDataModel) => distanceUnitOptions.push({
                label: subSubRef.listValue,
                value: subSubRef.listId,
                group: subRef.listId,
              }));
            });
          });
          sectionField.options = distanceUnitOptions;
        }
      });
    });
  };

  const populateFuelDropDowns = (config: CustomFormConfig, fuelCombustionOptions: ImpactmRefDataModel[]) => {
    config.fields.forEach(field => {
      field.formConfig?.fields.forEach(sectionField => {
        if (sectionField.name === "fuelTypeId" && !sectionField.options) {
          sectionField.options = fuelCombustionOptions?.map((ref: ImpactmRefDataModel) => ({
            label: ref.listValue,
            value: ref.listId,
          }));
        }

        if (sectionField.name === "fuelUnitId") {
          const stationaryFuelCombustionUnityOptions: Option[] = [];

          fuelCombustionOptions?.forEach((ref: ImpactmRefDataModel) => {
            ref?.childList?.forEach((subRef: ImpactmRefDataModel) => stationaryFuelCombustionUnityOptions.push({
              label: subRef.listValue,
              value: subRef.listId,
              group: ref.listId,
            }));
          });

          sectionField.options = stationaryFuelCombustionUnityOptions;
        }
      });
    });
  };

  useEffect(() => {
    setDefaultValue(props.data);
    setStationaryCombustion(props.data?.isStationaryCombustion || false);
    setMobileCombustion(props.data?.isMobileCombustion || false);
    setRefrigerators(props.data?.isRefrigerators || false);
    setFireExtinguisher(props.data?.isFireExtinguisher || false);
  }, [props.data]);

  useEffect(() => {
    if (defaultValue) {
      onSubmit(defaultValue);
    }
  }, [isMobileCombustion, isStationaryCombustion, isRefrigerators, isFireExtinguisher]);

  const onSubmit = async (value: ImpactmEmissionModel) => {
    if (activeStationaryConfig) {
      setStationaryConfig(activeStationaryConfig);
    }
    if (activeMobileConfig) {
      setMobileConfig(activeMobileConfig);
    }
    if (activeDistanceConfig) {
      setDistanceConfig(activeDistanceConfig);
    }
    if (activeRefrigeratorConfig) {
      setRefrigeratorConfig(activeRefrigeratorConfig);
    }
    if (activeExtinguisherConfig) {
      setExtinguisherConfig(activeExtinguisherConfig);
    }

    let saveResponse;

    if (defaultValue && defaultValue.id) {
      saveResponse = await ImpactmService.saveImpactm({
        ...defaultValue,
        isStationaryCombustion: isStationaryCombustion,
        isMobileCombustion: isMobileCombustion,
        isRefrigerators: isRefrigerators,
        isFireExtinguisher: isFireExtinguisher,
        isMeasurement: props.isMeasurement,
        dataImpactmScope1FuelCombustion: value?.dataImpactmScope1FuelCombustion || defaultValue.dataImpactmScope1FuelCombustion,
        dataImpactmScope1MobileFuelCombustion: value?.dataImpactmScope1MobileFuelCombustion || defaultValue.dataImpactmScope1MobileFuelCombustion,
        dataImpactmScope1Distance: value?.dataImpactmScope1Distance || defaultValue.dataImpactmScope1Distance,
        dataImpactmScope1Refrigerators: value?.dataImpactmScope1Refrigerators || defaultValue.dataImpactmScope1Refrigerators,
        dataImpactmScope1Extinguishers: value?.dataImpactmScope1Extinguishers || defaultValue.dataImpactmScope1Extinguishers,
      });
    } else {
      const newImpactmEmission = {
        companyId: user.companyId,
        isFinancialYear: props.isFinancialYear,
        yearRepresentationId: props.yerRepresentationId,
        startMonth: props.startMonth,
        isMeasurement: props.isMeasurement,
        isStationaryCombustion: isStationaryCombustion,
        isMobileCombustion: isMobileCombustion,
        isRefrigerators: isRefrigerators,
        isFireExtinguisher: isFireExtinguisher,
        dataImpactmScope1FuelCombustion: value?.dataImpactmScope1FuelCombustion,
        dataImpactmScope1MobileFuelCombustion: value?.dataImpactmScope1MobileFuelCombustion,
        dataImpactmScope1Distance: value?.dataImpactmScope1Distance,
        dataImpactmScope1Refrigerators: value?.dataImpactmScope1Refrigerators,
        dataImpactmScope1Extinguishers: value?.dataImpactmScope1Extinguishers,
      };
      saveResponse = await ImpactmService.saveImpactm(newImpactmEmission);
    }

    setDefaultValue(saveResponse);
  };

  const onFormSubmit = async (values: any) => {
    const savedValue = {
      ...formDefaultValues,
      ...values,
    };
    await ImpactDataService.saveGHGInventoryMethod(savedValue);
  }

  return {
    activeConfig,
    formDefaultValues,
    isStationaryCombustion,
    isMobileCombustion,
    isRefrigerators,
    isFireExtinguisher,
    activeStationaryConfig,
    activeMobileConfig,
    activeDistanceConfig,
    activeRefrigeratorConfig,
    activeExtinguisherConfig,
    defaultValue,
    onSubmit,
    onFormSubmit,
    setStationaryCombustion,
    setMobileCombustion,
    setRefrigerators,
    setFireExtinguisher,
  };
};
