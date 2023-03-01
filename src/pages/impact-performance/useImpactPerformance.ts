import { useEffect, useState } from "react";
import { useAuth } from "../../helpers/useAuth";
import ImpactPerformanceService from "../../services/ImpactPerformanceService";
import ImpactDataService from "../../services/ImpactDataService";
import MainService from "../../services/MainService";
import { TEMPERATURE_ALIGNMENT } from "./constants";
import { getDataForStep } from "../impact-data/getDataForStep";
import { GENERAL_BACKGROUND_STEP } from "../impact-data/constants";
import { ModelItemType } from "../../models/ModelItemType";
import { IMPACT_PERFORMANCE_TAB } from "../../constants/authApiModelItemList"

const useImpactPerformance = () => {
  const { user } = useAuth();
  const [year, setYear] = useState<any>({});
  const [data, setData] = useState<any>();
  const [activeTab, setActiveTab] = useState<string>(TEMPERATURE_ALIGNMENT);
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [years, setYears] = useState<any>([]);
  const [isDataSetAccepted, setIsDataSetAccepted] = useState<boolean>(false);
  const [isDataSetEditable, setIsDataSetEditable] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>("");
  const [authApiModelItem, setModelItem] = useState<any>();
  const [authApiModelItemState, setModelItemState] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!years || years.length === 0) {
        const { data: yearValues } =
          await MainService.getTemperatureAlignmentYears(
            user.companyId,
          );
        if (!!yearValues && yearValues.length > 0) {
          setYears(yearValues);
          setYear(yearValues[yearValues.length - 1]);
        }
      }

      let generalBackground = await getDataForStep(GENERAL_BACKGROUND_STEP);

      setCompanyName(generalBackground.companyName);
      setIsDataSetAccepted(await ImpactDataService.isImpactDataAccepted());
      setIsDataSetEditable(await ImpactDataService.isImpactDataEditable());
      const authApiModelItem = await MainService.getAuthApiModelItemList();
      authApiModelItem.authApiModelItemList.map((item: ModelItemType)=>{
        if ( item.blockContext == IMPACT_PERFORMANCE_TAB ){
          setModelItem(item);
          setModelItemState(item.isBlock);
        }
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (year && year.value) {
        setData(
          await ImpactPerformanceService.getTemperatureAlignment(
            user.companyId,
            year?.value,
          ),
        );
      } else {
        setData({
          overallScore: {},
          probability15: {},
          probability20: {},
          overall: {},
          scope1: {},
          scope2: {},
          scope3: {},
        });
      }
    };

    fetchData();
  }, [year]);

  const handleChangeOnTabs = (event: React.ChangeEvent<{}>, value: string) => setActiveTab(value);

  const handleChangeYear = (value: any) => {
    setYear(value);
    setOpenFilters(false);
  };

  return {
    activeTab,
    data,
    year,
    years,
    openFilters,
    isDataSetAccepted,
    isDataSetEditable,
    companyName,
    authApiModelItem,
    authApiModelItemState,
    setOpenFilters,
    handleChangeOnTabs,
    handleChangeYear,
  };
};

export default useImpactPerformance;
