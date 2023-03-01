import axios from "axios";

import {
  IMPACT_PERFORMANCE_YEARS_ENDPOINT,
  YEAR_REPRESENTATION_ENDPOINT,
  AUTHAPIMODELITEMLIST,
} from "../constants";
import { errorHandler } from "../helpers/errorHandler";
import {
  ServiceResponseType,
  YearRepresentationOption,
} from "../models/Api.model";
import { YearType } from "../models/DateTypes";
import { ModelItemType } from "../models/ModelItemType";

/**
 * Main service contains all common methods
 * which can be used everywhere in app
 */
const MainService = {
  getRepresentationYears: async (): Promise<
    ServiceResponseType<YearRepresentationOption[]>
  > => {
    try {
      const { data } = await axios.get<YearRepresentationOption[]>(
        YEAR_REPRESENTATION_ENDPOINT
      );
      return { data };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getTemperatureAlignmentYears: async (
    companyId: number
  ): Promise<ServiceResponseType<YearType[]>> => {
    try {
      const response = await axios.get(
        `${IMPACT_PERFORMANCE_YEARS_ENDPOINT}?organisationId=${companyId}`
      );

      return {
        data: response.data.map((year: number) => ({
          value: year,
          label: year.toString(),
        })),
      };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getAuthApiModelItemList: async () => {
    const response = await axios.get(`${AUTHAPIMODELITEMLIST}`);
    return response.data
  },
};

export default MainService;
