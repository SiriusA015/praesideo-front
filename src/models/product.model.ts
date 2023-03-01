import { ProductVariantModel } from "./product-variant.model";

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  active: boolean;
  variants: ProductVariantModel[];
}
