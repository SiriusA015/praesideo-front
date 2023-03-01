export interface GeneralBackgroundModel {
  companyName: string;
  companyDescription: string;
  countryId?: number;
  stateId?: number;
  city: string;
  homeStockExchangeListed: boolean | string;
  homeStockExchangeId?: number;
  industrySectorId?: number;
  industrySubsectorId?: number;
  isParentcompany?: boolean;
  isSubsidiary?: boolean;
  isJointventure?: boolean;
  isStandalone?: boolean;
  organisationLegal?:
    | "parentcompany"
    | "subsidiary"
    | "jointventure"
    | "standalone";
  companySecondaryIndustrylist: CompanySecondaryIndustryModel[];
  companyStructureList: CompanyStructureModel[];
  companyFacilityList: CompanyFacilityModel[];
  companyProductServicesList: CompanyProductServicesModel[];
  isFinancialYear: boolean;
  yearRepresentationId: number;
  startMonth: number;
  productVariantId:number;
}

export interface CompanySecondaryIndustryModel {
  id: number;
  city: string;
  countryId: string;
  industrySectorId: number;
  industrySubsectorId: number;
}

export interface CompanyStructureModel {
  id: number;
  companyId: number;
  relCompanyId: number;
  relCompanyIdCompanyName: string;
  relCompanyName: string;
  relCompanyCategoryId: number;
  economicInterestPercentage: number;
  isOperatingPoliciesControl: boolean | string;
  isFinancialAccounting: boolean | string;
}

export interface CompanyFacilityModel {
  id?: number;
  facilityId?: number;
  companyId?: number;
  facilityName?: string;
  facilityCountryId?: number;
  facilityStateId?: number;
  facilityCity?: string;
  facilityAddress?: string;
  facilityOwnerCompanyId?: number;
  facilityOperationCompanyId?: number;
}

export interface CompanyProductServicesModel {
  id: number;
  companyId: number;
  refProdServId: number;
  prodServName: string;
  isQuantPerFacility: boolean | string;
  totalQuantity: number;
  totalQuantityUnitId: number;
  totalQuantityUnitText: string;
  companyFacilityData: CompanyFacilityDataModel[];
  refProductServices: RefProductServicesModel;
}

export interface CompanyFacilityDataModel {
  id?: number;
  compProdServId?: number;
  facilityId?: number;
  quantity?: number;
  quantityUnitId?: number;
  quantityUnitText?: string;
  quantityInPercentage?: number;
}

export interface RefProductServicesModel {
  id: number;
  prodServName: string;
}
