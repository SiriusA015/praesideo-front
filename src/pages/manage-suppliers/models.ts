import { CurrencyOptions } from "../../models/Api.model";
import { Order, STATUS } from "../../constants";
import { SUPPLIERS_SECTIONS } from "./constants";

export type SupplierType = {
  companyName: {
    label: string;
    value: string;
  };
  companyId: number | null;
};

export type SupplierAllocation = {
  supplierAllocationId: number | string;
  supplierAmount?: number | string;
  supplierCategoryId?: number | string;
  supplierCurrencyId?: number | string;
  supplierTypeId?: number | string;
};

export type SupplierAllocations = {
  averageCategoryId: number | string | null;
  averageTypeId: number | string | null;
  sumAmount: number;
  averageCurrencyId: number | string | null;
  status: STATUS;
  allocations: SupplierAllocation[];
};

export type SupplierData = {
  supplierAllocations?: SupplierAllocations;
  city: string;
  companyDescription: string;
  companyId: number;
  supplierId: number;
  country: string;
  homeStockExchangeId: number;
  homeStockExchangeListed: boolean | null;
  industrySectorId: number;
  industrySubsectorId: number;
  supplyChainId: number;
  status: STATUS;
};

export type SuppliersYears = {
  calendarYear: number;
  financialYear: string;
  yearRepresentationId: number;
};

export interface CurrenciesType
  extends Omit<CurrencyOptions, "value" | "label"> {
  id: number;
  value: string;
}

export type SupplierTypeCategories = {
  id: number;
  value: string;
};

export type TableState = {
  order: Order;
  orderBy: string;
  pageNumber: number;
  pageSize: number;
};

export type TabComponentProps = {
  isDemoable?:boolean;
  config: {
    table?: TableState;
    year?: number;
  };
};

export type TabContextType = TabComponentProps & {
  tab: SUPPLIERS_SECTIONS;
};

export type HeadCell = {
  id: string;
  sortable: boolean;
  label: string;
};

export type SuppliersYearsType = {
  selected: number;
  list?: SuppliersYears[];
};
