import { useAuth } from "../../helpers/useAuth";
import { FormConfig } from "./models";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { impactMeasurementConfig, impactPerformanceConfig } from "./configs";
import ImpactDataService from "../../services/ImpactDataService";
import SettingsService from "../../services/SettingsService";
import { cloneDeep } from "lodash";
import GeneralBackgroundService from "../../services/GeneralBackgroundService";
import {
  BASELINE_TABULATION,
  CLIMATE_METRICS_STEP,
  DEFAULT_EMISSIONS_INVENTORY_METHOD,
  FACILITIES_TABULATION,
  FINANCIAL_INFORMATION_STEP,
  GENERAL_BACKGROUND_STEP,
  GHG_INVENTORY_METHOD_STEP,
  GHG_REDUCTION_TARGET_TABULATION,
  GHG_TARGET_SETTING_STEP,
  ORGANISATION_TABULATION,
  SERVICES_TABULATION,
  SHORT_TERM_REDUCTION_TABULATION,
  STRUCTURE_TABULATION,
  SUPPORTING_DOCUMENTS_STEP,
} from "./constants";
import {
  CompanyFacilityDataModel,
  CompanyProductServicesModel,
  GeneralBackgroundModel,
} from "../../models/general-background.model";
import { IMPACT_PERFORMANCE_VARIANT_NAME } from "../set-up-subscription/constants";
import { getDataForStep } from "./getDataForStep";
import { mapPageIndexToKey, mapPathnameToPageConfigIndex } from "./mapPage";
import { mapFileFieldNameToId } from "./mapFileField";
import { addConfigValues } from "./addConfigValues";

const useImpactData = () => {
  const { isImpactPerformanceAvailable } = useAuth();
  const [ isImpactDataDemoable, setDemo] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();  
  const { user, subscription } = useAuth();
  const [activeStep] = useState<number>(
    mapPathnameToPageConfigIndex(location.pathname)
  );
  const [activeConfig, setActiveConfig] = useState<FormConfig>();
  const [formDefaultValues, setFormDefaultValues] = useState<any>();
  const [progressInfo, setProgressInfo] = useState<any>();
  const [activeTab, setActiveTab] = useState<string>(ORGANISATION_TABULATION);
  const [companyName, setCompanyName] = useState<string>("");
  const [isImpactDataEditable, setIsImpactDataEditable] =
    useState<boolean>(true);
  const [tabsData, setTabsData] = useState<any>({
    baseline: {},
    ghgReductionTargets: {},
    shortTermReductionPlan: {},
    organisation: {},
    structure: {},
    facilities: {},
    services: {},
  });
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");
  const formPagesConfig = isImpactPerformanceAvailable
    ? impactPerformanceConfig
    : impactMeasurementConfig;

  const handleClickOnStep = (index: number) => {
    history.push("/" + mapPageIndexToKey(index));
  };

  const handleClickOnNext = () => {
    history.push("/" + mapPageIndexToKey(activeStep + 1));
  };

  const handleClickOnBack = () => {
    history.push("/" + mapPageIndexToKey(activeStep - 1));
  };

  const getIsImpactDataDemoable = async () => {
    const demoCompany = await ImpactDataService.getDemoCompany();
    demoCompany.map((item: any) => {
      if (item.listValue === user.companyId) {
        setDemo(true);
      }
    })
  };

  useEffect(() => {
    let fetchData = async () => {
      let config = cloneDeep(formPagesConfig[activeStep]);
      let values;
      let generalBackground = await getDataForStep(GENERAL_BACKGROUND_STEP);
      setCompanyName(generalBackground.companyName);
      await getIsImpactDataDemoable();
      if (config.key === GHG_TARGET_SETTING_STEP) {
        let newTabsData = { ...tabsData };
        newTabsData.baseline = await getDataForStep(GHG_TARGET_SETTING_STEP);
        newTabsData.baseline.companyName = companyName;

        newTabsData.ghgReductionTargets = { ...newTabsData.baseline };
        newTabsData.shortTermReductionPlan = { ...newTabsData.baseline };
        setTabsData(newTabsData);
        setActiveTab(BASELINE_TABULATION);
        values = newTabsData.baseline;
      } else if (config.key === GENERAL_BACKGROUND_STEP) {
        let newTabsData = { ...tabsData };
        newTabsData.organisation = await getDataForStep(
          GENERAL_BACKGROUND_STEP
        );
        newTabsData.structure = { ...newTabsData.organisation };
        newTabsData.facilities = { ...newTabsData.organisation };
        newTabsData.service = { ...newTabsData.organisation };

        setTabsData(newTabsData);
        setActiveTab(ORGANISATION_TABULATION);
        values = newTabsData.organisation;
      } else {
        values = await getDataForStep(config.key);
      }
      await updatePercentages();
      await checkIfImpactDataIsEditable();
      setFormDefaultValues(values);
      await addConfigValues(config);
      if (config.key === GHG_INVENTORY_METHOD_STEP) {
        values.companyName = companyName;
        if (
          Number.isNaN(Number.parseInt(values.emissionsAccountingMethod)) &&
          subscription !== IMPACT_PERFORMANCE_VARIANT_NAME
        ) {
          values.emissionsAccountingMethod = DEFAULT_EMISSIONS_INVENTORY_METHOD;
          await ImpactDataService.saveGHGInventoryMethod({
            ...formDefaultValues,
            ...values,
          });
        }
        setFormDefaultValues(values);
      }
      if (config.key === SUPPORTING_DOCUMENTS_STEP) {
        config.onFileInputChange = onFileInputChange;
        config.onRemoveFile = onRemoveFile;
      }
      setActiveConfig(config);
    };
    fetchData();
  }, []);

  const getStructureOptions = ({
    companyStructureList,
  }: GeneralBackgroundModel) =>
    companyStructureList.map(({ relCompanyId, relCompanyIdCompanyName }) => ({
      listValue: relCompanyIdCompanyName,
      listId: relCompanyId,
    }));

  const updatePercentages = async () => {
    let percentages = await ImpactDataService.getPercentages();
    setProgressInfo(percentages);
  };

  const checkIfImpactDataIsEditable = async () => {
    const userList = await SettingsService.getUsersWithPermissions(user.companyId)
    const selectUser = userList.find((item: any)=>{
      return (item.username === user.username);
    });
    const editAble = await ImpactDataService.isImpactDataEditable();
    if (editAble && selectUser.impactDataPermission === 'EDITOR') {
      setIsImpactDataEditable(true);  
    }else{
      setIsImpactDataEditable(false);  
    }
  };

  const onRemoveFile = (fieldName: string, filename: string) => {
    ImpactDataService.removeFile(mapFileFieldNameToId(fieldName), filename)
      .then(async () => {
        let config = { ...formPagesConfig[activeStep] };
        let values = await getDataForStep(config.key);
        setFormDefaultValues(values);
      })
      .catch((error: any) => console.log(error));
  };

  const onFileInputChange = async (event: any) => {
    event.preventDefault();
    let formData = new FormData();
    let jsonBodyData = {
      fileType: mapFileFieldNameToId(event.target.name),
      filename: "file.csv",
    };
    for (let key of Object.keys(event.target.files)) {
      if (key !== "length") {
        formData.append("file", event.target.files[key]);
      }
    }
    formData.append(
      "info",
      new Blob([JSON.stringify(jsonBodyData)], {
        type: "application/json",
      })
    );
    try {
      await ImpactDataService.uploadFile(formData);
    } catch (error) {
      setError("Something went wrong. Please try again");
    }
    let config = { ...formPagesConfig[activeStep] };
    let values = await getDataForStep(config.key);
    setFormDefaultValues(values);
  };

  const onFormSubmit = async (values: any) => {
    try {
      if (activeConfig?.key === FINANCIAL_INFORMATION_STEP) {
        let data = await ImpactDataService.saveFinancialInformation({
          ...values,
          companyId: user.companyId,
          userFinancialDetailId: formDefaultValues.userFinancialDetailId,
        });
        setFormDefaultValues({
          ...formDefaultValues,
          userFinancialDetailId: data.userFinancialDetailId,
        });
      } else if (activeConfig?.key === GENERAL_BACKGROUND_STEP) {
        setCompanyName(values.companyName || formDefaultValues.companyName);

        // Add facility data
        if (
          activeTab === SERVICES_TABULATION &&
          values.companyProductServicesList
        ) {
          values.companyProductServicesList =
            values.companyProductServicesList.map(
              (product: CompanyProductServicesModel) => ({
                ...product,
                companyFacilityData: product.companyFacilityData
                  ? product.companyFacilityData
                  : formDefaultValues.companyFacilityList?.map(
                      (facility: CompanyFacilityDataModel) => ({
                        compProdServId: product.id,
                        facilityId: facility.facilityId,
                      })
                    ) || [],
              })
            );
        }

        let response = await GeneralBackgroundService.saveGeneralBackground({
          ...formDefaultValues,
          ...values,
        });

        if (activeTab === SERVICES_TABULATION) {
          response = await GeneralBackgroundService.getGeneralBackground();
        }

        const facilityCompanyOptions = [
          {
            listValue: companyName,
            listId: user.companyId,
          },
          ...(!response.isStandalone ? getStructureOptions(response) : []),
        ];
        const companyOptions = getStructureOptions(response);

        let newTabsData = {
          ...tabsData,
          organisation: response,
          structure: {
            ...response,
            companyStructureList: response.companyStructureList.map(
              (structure) => ({
                companyOptions,
                ...structure,
              })
            ),
          },
          facilities: {
            ...response,
            companyFacilityList: response.companyFacilityList.map(
              (facility) => ({
                facilityCompanyOptions,
                ...facility,
              })
            ),
          },
          service: response,
        };

        if (
          activeTab === ORGANISATION_TABULATION ||
          activeTab === STRUCTURE_TABULATION ||
          activeTab === SERVICES_TABULATION
        ) {
          let config = cloneDeep(formPagesConfig[activeStep]);
          await addConfigValues(config);
          setActiveConfig(config);
        }

        setTabsData(newTabsData);
        switch (activeTab) {
          case FACILITIES_TABULATION: {
            setFormDefaultValues(newTabsData.facilities);
            break;
          }
          case STRUCTURE_TABULATION: {
            setFormDefaultValues(newTabsData.structure);
            break;
          }
          default: {
            setFormDefaultValues(newTabsData.organisation);
          }
        }
      } else if (activeConfig?.key === GHG_INVENTORY_METHOD_STEP) {
        const response = await ImpactDataService.saveGHGInventoryMethod({
          ...formDefaultValues,
          ...values,
        });
        let data = ImpactDataService.getGHGInventoryMethodFromData(
          response.dataSetGhgInventoryMethod
        );

        setFormDefaultValues(data);
      } else if (activeConfig?.key === GHG_TARGET_SETTING_STEP) {
        let response = await ImpactDataService.saveGHGTargetSetting({
          ...formDefaultValues,
          ...values,
        });

        let newTabsData = { ...tabsData };
        let data = ImpactDataService.getGHGTargetSettingFromData(
          response.emissionsReduction
        );

        newTabsData.baseline = { ...newTabsData.baseline, ...data };
        newTabsData.ghgReductionTargets = {
          ...newTabsData.ghgReductionTargets,
          ...data,
        };
        newTabsData.shortTermReductionPlan = {
          ...newTabsData.ghgReductionTargets,
          ...data,
        };
        setTabsData(newTabsData);

        setFormDefaultValues(newTabsData.baseline);
      } else if (activeConfig?.key === CLIMATE_METRICS_STEP) {
        let data = await ImpactDataService.saveClimateMetrics({
          ...values,
          climateMechanismInfluenceId:
            formDefaultValues.climateMechanismInfluenceId,
        });
        setFormDefaultValues({
          ...formDefaultValues,
          climateMechanismInfluenceId:
            data && data.climateMechanismsInfluence
              ? data.climateMechanismsInfluence.climateMechanismInfluenceId
              : null,
        });
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.status &&
        error.response.status === 400
      ) {
        setError("The value was invalid");
      } else {
        setError("The data could not be saved. Please try again");
      }
    }
    updateCompletedInformation();
  };

  const updateCompletedInformation = () => {
    setLastSaved(new Date());
    updatePercentages();
  };

  const onTabsChange = async (value: string) => {
    switch (value) {
      case ORGANISATION_TABULATION:
      case SERVICES_TABULATION: {
        setFormDefaultValues(await getDataForStep(GENERAL_BACKGROUND_STEP));
        break;
      }
      case STRUCTURE_TABULATION: {
        const defaultValues =
          await GeneralBackgroundService.getGeneralBackground();

        const companyOptions = getStructureOptions(defaultValues);

        setFormDefaultValues({
          ...defaultValues,
          companyStructureList: defaultValues.companyStructureList.map(
            (structure) => ({
              companyOptions,
              ...structure,
            })
          ),
        });
        break;
      }
      case FACILITIES_TABULATION: {
        const defaultValues =
          await GeneralBackgroundService.getGeneralBackground();
        const facilityCompanyOptions = [
          {
            listValue: companyName,
            listId: user.companyId,
          },
          ...(!defaultValues.isStandalone
            ? getStructureOptions(defaultValues)
            : []),
        ];

        setFormDefaultValues({
          ...defaultValues,
          companyFacilityList: defaultValues.companyFacilityList.map(
            (facility) => ({
              facilityCompanyOptions,
              ...facility,
            })
          ),
        });
        break;
      }
      case BASELINE_TABULATION:
      case GHG_REDUCTION_TARGET_TABULATION:
      case SHORT_TERM_REDUCTION_TABULATION: {
        let values = await getDataForStep(GHG_TARGET_SETTING_STEP);
        values.companyName = companyName;

        setFormDefaultValues(values);
        break;
      }
    }
    setActiveTab(value);
  };

  const handleAlertClose = () => {
    setError("");
  };

  return {
    activeConfig,
    isImpactDataEditable,
    isImpactDataDemoable,

    activeTab,
    error,
    formDefaultValues,
    companyName,
    handleClickOnBack,
    handleClickOnNext,
    handleClickOnStep,
    handleAlertClose,
    updateCompletedInformation,
    lastSaved,
    onFormSubmit,
    onTabsChange,
    progressInfo,
    state: { activeStep },
  };
};

export default useImpactData;
