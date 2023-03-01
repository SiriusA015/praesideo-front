import { Option } from "../../components/CustomForm/CustomForm.model";
import DropdownService from "../../services/DropdownService";

export const getOptionsForSelectField = async (
  field: string,
): Promise<Option[]> => {
  switch (field) {
    case "baseCurrency":
      return await DropdownService.getBaseCurrency();
    case "financialYear":
      return await DropdownService.getFinancialYear();
    case "year":
      return await DropdownService.getYear();
    case "auditingAndValidation":
      return await DropdownService.getAuditingValidation();
    case "emissionsAccountingMethod":
      return await DropdownService.getEmissionsAccountingMethod();
    case "homeStockExchangeId":
      return await DropdownService.getHomeStockExchange();
    case "industrySectorId":
      return await DropdownService.getIndustrySector();
    case "industrySubsectorId":
      return await DropdownService.getIndustrySubsector();
    case "carbonPriceCoverage":
      return await DropdownService.getInternalCarbonPriceCoverage();
    case "carbonPriceCoverageType":
      return await DropdownService.getInternalCarbonPriceCoverageType();
    case "operationalBoundary":
      return await DropdownService.getOperationalBoundaryScope();
    case "approachCriteria":
      return await DropdownService.getOrganisationalBoundaryCriteria();
    case "organisationalBoundary":
      return await DropdownService.getOrganisationalBoundary();
    case "participationOfCarbonCredits":
      return await DropdownService.getPurchaseCreditCategories();
    case "participationOfCarbonCreditsType":
      return await DropdownService.getPurchaseCreditCategoryType();
    case "carbonCreditsCategoryType":
      return await DropdownService.getCarbonCreditCategory();
    case "scope":
      return await DropdownService.getTargetScope();
    case "companyCategoryId":
    case "relCompanyCategoryId":
      return await DropdownService.getCompanyCategory();
    case "companyId":
      return await DropdownService.getCompanyList();
    case "refProdServId":
      return await DropdownService.getAllRefProductServices();
    case "totalQuantityUnitId":
    case "quantityUnitId":
      return await DropdownService.getAllFacilityDataUnitRefList();
    case "countryId":
    case "facilityCountryId":
      return await DropdownService.getAllCountries();
    default:
      return [];
  }
};
