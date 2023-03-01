import {
  CLIMATE_METRICS_STEP,
  FINANCIAL_INFORMATION_STEP,
  GENERAL_BACKGROUND_STEP,
  GHG_INVENTORY_METHOD_STEP, GHG_TARGET_SETTING_STEP,
  SUPPORTING_DOCUMENTS_STEP,
} from "./constants";
import ImpactDataService from "../../services/ImpactDataService";
import GeneralBackgroundService from "../../services/GeneralBackgroundService";

export const getDataForStep = async (key?: string) => {
  if (key) {
    switch (key) {
      case FINANCIAL_INFORMATION_STEP:
        return await ImpactDataService.getFinancialInformation();
      case GENERAL_BACKGROUND_STEP:
        return await GeneralBackgroundService.getGeneralBackground();
      case GHG_INVENTORY_METHOD_STEP:
        return await ImpactDataService.getGHGInventoryMethod();
      case GHG_TARGET_SETTING_STEP:
        return await ImpactDataService.getGHGTargetSetting();
      case CLIMATE_METRICS_STEP:
        return await ImpactDataService.getClimateMetrics();
      case SUPPORTING_DOCUMENTS_STEP:
        return await ImpactDataService.getFiles();
      default:
        return null;
    }
  } else {
    return null;
  }
};
