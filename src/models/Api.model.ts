export interface AuditingValidationOption {
  auditingValidationId: number;
  name: string;
}

export interface BaseCurrencyOption {
  baseCurrencyId: number;
  code: string;
  conversionRate: number;
  country: string;
  currency: string;
  ordering: number;
  symbol: string;
}

export interface CurrencyOptions {
  label: string;
  value: number;
  group: string;
  code: string;
}

export interface YearRepresentationOption {
  yearRepresentationId: number;
  calendarYear: number;
  financialYear: string;
}

export interface EmissionsAccountingMethodOption {
  emissionsInventoryMethodId: number;
  name: string;
}

export interface HomeStockExchangeOption {
  homeStockExchangeId: number;
  name: string;
}

export interface TargetScopeOption {
  emissionsReductionTargetScopeId: number;
  name: string;
}

export interface IndustrySectorOption {
  industrySectorId: number;
  industrySubSectors: [
    {
      industrySubsectorId: number;
      name: string;
    }
  ];
  name: string;
}

export interface ServerResponseType<T> {
  content: T;
}

export interface ServiceResponseType<T> {
  data?: T;
  error?: string;
}

export interface Pageable {
  page: number;
  size: number;
}

export interface Sortable {
  sort: string;
}
