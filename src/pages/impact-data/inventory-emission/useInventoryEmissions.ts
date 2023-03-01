import { useEffect, useState } from "react";
import {
  ACTIVITY_SCOPE_1_TABULATION,
  ACTIVITY_TABULATION, EMISSIONS_OPERATIONAL_BOUNDARY_TABULATION, EMISSIONS_OVERVIEW_TABULATION, EMISSIONS_TABULATION,
  REVIEW_SCOPE_1_TABULATION,
  REVIEW_TABULATION,
} from "./constants";
import { Tab } from "./models";
import { enterEmissionTabulation, measureEmissionTabulation } from "./config";
import DropdownService from "../../../services/DropdownService";
import { ImpactmEmissionModel } from "../../../models/impactm-emission.model";
import ImpactmService from "../../../services/ImpactmService";
import { YearRepresentationOption } from "../../../models/Api.model";
import GeneralBackgroundService from "../../../services/GeneralBackgroundService";
import { GeneralBackgroundModel } from "../../../models/general-background.model";
import MainService from "../../../services/MainService";
import { IMPACT_EMISSIONS_TAB } from "../../../constants/authApiModelItemList"
import { ModelItemType } from "../../../models/ModelItemType";

const useInventoryEmissions = () => {
  const [isMeasureEmission, setMeasureEmission] = useState<boolean>(true);
  const [yearRepresentationId, setYearRepresentationId] = useState<number>(0);
  const [isFinancialYear, setIsFinancialYear] = useState<boolean>(true);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [startMonth, setStartMonth] = useState<number>(0);
  const [data, setData] = useState<ImpactmEmissionModel>();
  const [generalBackground, setGeneralBackground] = useState<GeneralBackgroundModel>();

  const [allYears, setYears] = useState<YearRepresentationOption[]>([]);
  const [tabConfig, setTabConfig] = useState<Tab[]>([...measureEmissionTabulation, ...enterEmissionTabulation]);
  const [activeTab, setActiveTab] = useState<string>(ACTIVITY_TABULATION);
  const [secondActiveTab, setSecondActiveTab] = useState<string>(ACTIVITY_SCOPE_1_TABULATION);
  const [authApiModelItem, setModelItem] = useState<any>();
  const [authApiModelItemState, setModelItemState] = useState<boolean>(true);
  const [percentage, setPercentage] = useState<number>(100);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    const years = await DropdownService.getYearRepresentation();
    const generalBackground = await GeneralBackgroundService.getGeneralBackground();
    const data = await ImpactmService.getImpactm(generalBackground?.yearRepresentationId);
    const percent = await ImpactmService.getReviewPercentate(generalBackground?.yearRepresentationId);

    const authApiModelItem = await MainService.getAuthApiModelItemList();
    authApiModelItem.authApiModelItemList.map((item: ModelItemType)=>{
      if ( item.blockContext == IMPACT_EMISSIONS_TAB ){
        setModelItem(item);
        setModelItemState(item.isBlock);
      }
    });

    setGeneralBackground(generalBackground);
    setYearRepresentationId(generalBackground?.yearRepresentationId);
    setIsFinancialYear(generalBackground?.isFinancialYear || false);
    setStartMonth(generalBackground?.startMonth || 0);

    // if (data.isMeasurement !== undefined) {
    //   onMeasureEmissionChange(data.isMeasurement, false);
    // }

    setYears(years);
    setPercentage(percent);
    setData(data);

  };

  const onTabChange = (event: React.ChangeEvent<{}>, value: string) => {
    setActiveTab(value);
    switch (value) {
      case ACTIVITY_TABULATION:
        setSecondActiveTab(ACTIVITY_SCOPE_1_TABULATION);
        break;
      case REVIEW_TABULATION:
        setSecondActiveTab(REVIEW_SCOPE_1_TABULATION);
        break;
      case EMISSIONS_TABULATION:
        setSecondActiveTab(EMISSIONS_OPERATIONAL_BOUNDARY_TABULATION);
        break;
    }
  };

  const onSecondTabChange = async (event: React.ChangeEvent<{}>, value: string) => {
    setSecondActiveTab(value);
    setData(await ImpactmService.getImpactm(yearRepresentationId));
  };

  const onMeasureEmissionChange = (value: boolean, save = true) => {
    setMeasureEmission(value);
    if (save) {
      ImpactmService.saveImpactm({
        ...data as ImpactmEmissionModel,
        isMeasurement: value,
      });
    }

    if (value) {
      setTabConfig([...measureEmissionTabulation, ...enterEmissionTabulation]);
      setActiveTab(ACTIVITY_TABULATION);
      setSecondActiveTab(ACTIVITY_SCOPE_1_TABULATION);
    } else {
      setTabConfig(enterEmissionTabulation);
      setActiveTab(EMISSIONS_TABULATION);
      setSecondActiveTab(EMISSIONS_OPERATIONAL_BOUNDARY_TABULATION);
    }
  };

  const onDateChange = async (values: Partial<GeneralBackgroundModel>) => {
    const result = await GeneralBackgroundService.saveGeneralBackground({
      ...generalBackground as GeneralBackgroundModel,
      ...values
    });
    setGeneralBackground(result); 
    const data = await ImpactmService.getImpactm(result?.yearRepresentationId);
    setData(data);
  }

  const handlerConfirm = async () => {
    if (percentage && percentage >= 100){
      await ImpactmService.finalizeData(yearRepresentationId);
      setActiveTab(EMISSIONS_TABULATION);
      setSecondActiveTab(EMISSIONS_OVERVIEW_TABULATION);
    }    
  }

  return {
    generalBackground,
    isFinancialYear,
    isDialogOpen,
    startMonth,
    data,
    activeTab,
    isMeasureEmission,
    tabConfig,
    secondActiveTab,
    allYears,
    yearRepresentationId,
    authApiModelItem,
    authApiModelItemState,
    percentage,
    handlerConfirm,
    setYearRepresentationId,
    setIsFinancialYear,
    setStartMonth,
    setDialogOpen,
    onMeasureEmissionChange,
    onTabChange,
    onSecondTabChange,
    onDateChange,
  };
};

export default useInventoryEmissions;
