import axios from "axios";

import { GENERAL_BACKGROUND_ENDPOINT } from "../constants";
import {
  GeneralBackgroundModel,
  RefProductServicesModel,
} from "../models/general-background.model";

const GeneralBackgroundService = {
  saveGeneralBackground: async (data: GeneralBackgroundModel) => {
    let body = { ...data };
    if (data.homeStockExchangeListed) {
      body.homeStockExchangeListed = data.homeStockExchangeListed === "yes";
    }
    if (data.organisationLegal) {
      body.isParentcompany = data.organisationLegal === "parentcompany";
      body.isJointventure = data.organisationLegal === "jointventure";
      body.isSubsidiary = data.organisationLegal === "subsidiary";
      body.isStandalone = data.organisationLegal === "standalone";
      body.organisationLegal = undefined;
    }
    if (data.companyStructureList) {
      body.companyStructureList = data.companyStructureList.map(
        (structure) => ({
          ...structure,
          isFinancialAccounting: structure.isFinancialAccounting === "yes",
          isOperatingPoliciesControl:
            structure.isOperatingPoliciesControl === "yes",
        })
      );
    }
    if (data.companyFacilityList) {
      body.companyFacilityList = data.companyFacilityList.map((facility) => ({
        ...facility,
        facilityId: facility.id,
      }));
    }
    if (data.companyProductServicesList) {
      body.companyProductServicesList = data.companyProductServicesList.map(
        (service) => ({
          ...service,
          isQuantPerFacility: service.isQuantPerFacility === "yes",
        })
      );
    }
    let response = await axios.post("private/change-general-background", body);
    return GeneralBackgroundService.getGeneralBackgroundFromData(response);
  },
  getGeneralBackground: async (companyId?: number) => {
    const response = await axios.get(
      `${GENERAL_BACKGROUND_ENDPOINT}${
        companyId ? `?companyId=${companyId}` : ""
      }`
    );
    return GeneralBackgroundService.getGeneralBackgroundFromData(response);
  },
  getGeneralBackgroundFromData: ({
    data,
  }: {
    data: GeneralBackgroundModel;
  }): GeneralBackgroundModel => {
    return {
      ...data,
      homeStockExchangeListed: data.homeStockExchangeListed ? "yes" : "no",
      companySecondaryIndustrylist: data.companySecondaryIndustrylist || [],
      companyProductServicesList:
        data.companyProductServicesList?.map((service) => ({
          ...service,
          companyFacilityData:
            service.companyFacilityData
              ?.map((facilityData) => ({
                ...facilityData,
                facilityName:
                  data.companyFacilityList?.find(
                    (facility) =>
                      facility.facilityId === facilityData.facilityId
                  )?.facilityName || "",
              }))
              .sort((a, b) => (a.facilityId || 0) - (b.facilityId || 0)) || [],
          isQuantPerFacility: service.isQuantPerFacility ? "yes" : "no",
        })) || [],
      companyFacilityList:
        data.companyFacilityList?.map((facility) => ({
          ...facility,
          id: facility.facilityId,
        })) || [],
      companyStructureList:
        data.companyStructureList?.map((structure) => ({
          ...structure,
          isFinancialAccounting: structure.isFinancialAccounting ? "yes" : "no",
          isOperatingPoliciesControl: structure.isOperatingPoliciesControl
            ? "yes"
            : "no",
        })) || [],
      organisationLegal: data.isParentcompany
        ? "parentcompany"
        : data.isSubsidiary
        ? "subsidiary"
        : data.isJointventure
        ? "jointventure"
        : "standalone",
    };
  },
  addNewRefProductServices: async (productService: RefProductServicesModel) => {
    await axios.post("common/ref-product-services/add", productService);
  },
  deleteCompanySecondaryIndustry: async (id: number) => {
    await axios.delete(`private/delete-company-secondary-industry?id=${id}`);
  },
  deleteCompanyStructure: async (id: number) => {
    await axios.delete(`private/delete-company-structure?id=${id}`);
  },
  deleteCompanyFacility: async (id: number) => {
    await axios.delete(`private/delete-company-facility?id=${id}`);
  },
  deleteCompanyProductServices: async (id: number) => {
    await axios.delete(`private/delete-company-product-services?id=${id}`);
  },
};

export default GeneralBackgroundService;
