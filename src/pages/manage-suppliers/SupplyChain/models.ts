import { NestedValue } from "react-hook-form";

import { SupplierType } from "../models";

export type AddSupplierFormType = {
  autocomplete: NestedValue<SupplierType>;
  yearType: number;
  year: number;
  month?: number;
};

export type NewSupplierData = {
  companyName: string;
  isFinancialYear: boolean;
  startMonth?: number;
  supplierId: number | null;
  yearRepresentationId: number;
};

export type SupplierTypeCategories = {
  [id: number]: string;
};
