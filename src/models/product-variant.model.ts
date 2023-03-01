import { BaseCurrencyModel } from "./base-currency.model";

export interface ProductVariantModel {
  id: number;
  name: string;
  description: string;
  productSubscriptionAnnualCost: number;
  productSubscriptionTierCostPerSupplier: number;
  productSubscriptionCurrency: BaseCurrencyModel;
}
