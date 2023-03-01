import { useEffect, useState } from "react";
import { boundary } from "./config";
import { getDataForStep } from "../../getDataForStep";
import { GHG_INVENTORY_METHOD_STEP } from "../../constants";
import { cloneDeep } from "lodash";
import { addConfigValues } from "../../addConfigValues";
import { FormConfig } from "../../models";
import { ImpactmRefDataModel } from "../../../../models/impactm-ref-data.model";
import DropdownService from "../../../../services/DropdownService";
import ImpactDataService from "../../../../services/ImpactDataService";
import GeneralBackgroundService from "../../../../services/GeneralBackgroundService";
import { employeeCommutePrimaryConfig, employeeCommutePartialConfig, employeeCommuteApproximativeConfig, businessTravelPrimaryConfig, businessTravelPartialConfig } from "./config";
import { CustomFormConfig, Option } from "../../../../components/CustomForm/CustomForm.model";
import { ImpactmEmissionModel } from "../../../../models/impactm-emission.model";
import ImpactmService from "../../../../services/ImpactmService";
import { TabData } from "../models";
import { useAuth } from "../../../../helpers/useAuth";
import { CompanyFacilityModel } from "../../../../models/general-background.model";
import {
  EMPLOYEE_COMMUTE,
  BUSINESS_TRAVEL
} from "./constants";

export const useBoundary = (props: TabData) => {
  const { user } = useAuth();

  const [formDefaultValues, setFormDefaultValues] = useState<any>();
  const [activeConfig, setActiveConfig] = useState<FormConfig>();
  const [isEmployeeCommute, setEmployeeCommute] = useState<string>();
  const [isBusinessTravel, setBusinessTravel] = useState<string>();
  const [facilities, setFacilities] = useState<CompanyFacilityModel[]>();

  const [isEmployeeCommuteCompleteData, setEmployeeCommuteCompleteData] = useState<boolean>(false);
  const [isEmployeeCommutePartialData, setEmployeeCommutePartialData] = useState<boolean>(false);
  const [isEmployeeCommuteApproximateData, setEmployeeCommuteApproximateData] = useState<boolean>(false);

  const [isBusinessTravelCompleteData, setBusinessTravelCompleteData] = useState<boolean>(false);
  const [isBusinessTravelPartialData, setBusinessTravelPartialData] = useState<boolean>(false);

  const [activeEmployeePrimaryConfig, setEmployeePrimaryConfig] = useState<CustomFormConfig>();
  const [activeEmployeePartialConfig, setEmployeePartialConfig] = useState<CustomFormConfig>();
  const [activeEmployeeApproximativeConfig, setEmployeeApproximativeConfig] = useState<CustomFormConfig>();

  const [activeTravelPrimaryConfig, setTravelPartialConfig] = useState<CustomFormConfig>();
  const [activeTravelPartialConfig, setTravelApproximativeConfig] = useState<CustomFormConfig>();

  const [defaultValue, setDefaultValue] = useState<ImpactmEmissionModel>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const impactmRefData = await DropdownService.getImpactmRefData();
    let config = cloneDeep(boundary);
    const employeePrimaryConfig = cloneDeep(employeeCommutePrimaryConfig);
    const employeePartialConfig = cloneDeep(employeeCommutePartialConfig);
    const employeeApproximativeConfig = cloneDeep(employeeCommuteApproximativeConfig);

    const travelPrimaryConfig = cloneDeep(businessTravelPrimaryConfig);
    const travelPartialConfig = cloneDeep(businessTravelPartialConfig);

    const employeeCommute = impactmRefData
    ?.find((ref: ImpactmRefDataModel) => ref.listValue === EMPLOYEE_COMMUTE);

    const businessTravel = impactmRefData
    ?.find((ref: ImpactmRefDataModel) => ref.listValue === BUSINESS_TRAVEL);
    
    employeeCommuteDropDowns(employeePrimaryConfig, employeeCommute.childList);
    employeeCommuteDropDowns(employeePartialConfig, employeeCommute.childList);
    employeeCommuteDropDowns(employeeApproximativeConfig, employeeCommute.childList);

    employeeCommuteDropDowns(travelPrimaryConfig, businessTravel.childList);
    employeeCommuteDropDowns(travelPartialConfig, businessTravel.childList);

    const values = await getDataForStep(GHG_INVENTORY_METHOD_STEP);
    const { companyFacilityList } = await GeneralBackgroundService.getGeneralBackground();
    await addConfigValues(config);

    setFacilities(companyFacilityList);
    setFormDefaultValues(values);
    setActiveConfig(config);
    setDefaultValue(props.data);

    setEmployeePrimaryConfig(employeePrimaryConfig);
    setEmployeePartialConfig(employeePartialConfig);
    setEmployeeApproximativeConfig(employeeApproximativeConfig);

    setTravelPartialConfig(travelPrimaryConfig);
    setTravelApproximativeConfig(travelPartialConfig);
  }

  const onFormSubmit = async (values: any) => {
    const savedValue = {
      ...formDefaultValues,
      ...values,
    };
    await ImpactDataService.saveGHGInventoryMethod(savedValue);
  }

  useEffect(() => {
    setDefaultValue(props.data);
    setEmployeeCommuteCompleteData(props.data?.isEmployeeCommuteCompleteData || false);
    setEmployeeCommutePartialData(props.data?.isEmployeeCommutePartialData || false);
    setEmployeeCommuteApproximateData(props.data?.isEmployeeCommuteApproximateData || false);
    setEmployeeCommutePartialData(props.data?.isBusinessTravelCompleteData || false);
    setEmployeeCommuteApproximateData(props.data?.isBusinessTravelPartialData || false);

    if ( props.data?.isEmployeeCommuteCompleteData ) { setEmployeeCommute('primary') }
    if ( props.data?.isEmployeeCommutePartialData ) { setEmployeeCommute('partial') }
    if ( props.data?.isEmployeeCommuteApproximateData ) { setEmployeeCommute('approximative') }
   
    if ( props.data?.isBusinessTravelCompleteData ) { setBusinessTravel('primary') }
    if ( props.data?.isBusinessTravelPartialData ) { setBusinessTravel('partial') }
    
  }, [props.data]);

  useEffect(() => {
    if (defaultValue) {
      onSubmit(defaultValue);
    }
  }, [isEmployeeCommuteCompleteData, isEmployeeCommutePartialData,isEmployeeCommuteApproximateData, isBusinessTravelCompleteData, isBusinessTravelPartialData]);

  const onEmployeeCommute = (value: string) => {
    setEmployeeCommuteCompleteData(value==="primary");
    setEmployeeCommutePartialData(value==="partial");
    setEmployeeCommuteApproximateData(value==="approximative");
    setEmployeeCommute(value);
  }

  const onBusinessTravel = (value: string) => {
    setBusinessTravelCompleteData(value==="primary");
    setBusinessTravelPartialData(value==="partial");
    setBusinessTravel(value);
  }
  
  const onSubmit = async (value: ImpactmEmissionModel) => {
    if (activeEmployeePrimaryConfig) {
      setEmployeePrimaryConfig(activeEmployeePrimaryConfig);
    }
    if (activeEmployeePartialConfig) {
      setEmployeePartialConfig(activeEmployeePartialConfig);
    }
    if (activeEmployeeApproximativeConfig) {
      setEmployeeApproximativeConfig(activeEmployeeApproximativeConfig);
    }
    if (activeTravelPrimaryConfig) {
      setTravelPartialConfig(activeTravelPrimaryConfig);
    }
    if (activeTravelPartialConfig) {
      setTravelApproximativeConfig(activeTravelPartialConfig);
    }
 
    let saveResponse;

    if (defaultValue && defaultValue.id) {
      saveResponse = await ImpactmService.saveImpactm({
        ...defaultValue,
        isEmployeeCommuteCompleteData: isEmployeeCommuteCompleteData,
        isEmployeeCommutePartialData: isEmployeeCommutePartialData,
        isEmployeeCommuteApproximateData: isEmployeeCommuteApproximateData,
        isBusinessTravelCompleteData: isBusinessTravelCompleteData,
        isBusinessTravelPartialData: isBusinessTravelPartialData,
        dataImpactmScope3EmployeeCommute: value?.dataImpactmScope3EmployeeCommute || defaultValue.dataImpactmScope3EmployeeCommute,
        dataImpactmScope3BusinessTravel: value?.dataImpactmScope3BusinessTravel || defaultValue.dataImpactmScope3BusinessTravel,
      });
    } else {
      const newImpactmEmission = {
        companyId: user.companyId,
        isFinancialYear: props.isFinancialYear,
        yearRepresentationId: props.yerRepresentationId,
        startMonth: props.startMonth,
        isMeasurement: props.isMeasurement,
        isEmployeeCommuteCompleteData: value?.isEmployeeCommuteCompleteData,
        isEmployeeCommutePartialData: value?.isEmployeeCommutePartialData,
        isEmployeeCommuteApproximateData: value?.isEmployeeCommuteApproximateData,
        isBusinessTravelCompleteData: value?.isBusinessTravelCompleteData,
        isBusinessTravelPartialData: value?.isBusinessTravelPartialData,
        dataImpactmScope3EmployeeCommute: value?.dataImpactmScope3EmployeeCommute,
        dataImpactmScope3BusinessTravel: value?.dataImpactmScope3BusinessTravel,
      };

      saveResponse = await ImpactmService.saveImpactm(newImpactmEmission);
    }

    setDefaultValue(saveResponse);
  };

  const employeeCommuteDropDowns = (config: CustomFormConfig, employeeCommuteOptions: ImpactmRefDataModel[]) => {
    config.fields.forEach(field => {
      field.formConfig?.fields.forEach(sectionField => {
        if (sectionField.name === "transportationModeId" && !sectionField.options) {
          sectionField.options = employeeCommuteOptions?.map((ref: ImpactmRefDataModel) => ({
            label: ref.listValue,
            value: ref.listId,
          }));
        }

        if (sectionField.name === "distanceUnitId") {
          const employeeCommuteUnityOptions: Option[] = [];

          employeeCommuteOptions?.forEach((ref: ImpactmRefDataModel) => {
            ref?.childList?.forEach((subRef: ImpactmRefDataModel) => employeeCommuteUnityOptions.push({
              label: subRef.listValue,
              value: subRef.listId,
              group: ref.listId,
            }));
          });

          sectionField.options = employeeCommuteUnityOptions;
        }
      });
    });
  };

  return {
    formDefaultValues,
    activeConfig,
    isEmployeeCommute,
    isEmployeeCommuteCompleteData,
    isEmployeeCommutePartialData,
    isEmployeeCommuteApproximateData,
    isBusinessTravelCompleteData,
    isBusinessTravelPartialData,
    activeEmployeePrimaryConfig,
    activeEmployeePartialConfig,
    activeEmployeeApproximativeConfig,
    activeTravelPrimaryConfig,
    activeTravelPartialConfig,
    defaultValue,
    facilities,
    isBusinessTravel,
    onSubmit,
    onFormSubmit,
    onEmployeeCommute,
    onBusinessTravel
  }
}
