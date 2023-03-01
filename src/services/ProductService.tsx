import axios from "axios";
import { PRODUCT_ENDPOINT, PRODUCT_VARIANTS_ENDPOINT } from "../constants";

const ProductService = {
  getProducts: async () => {
    let response = await axios.get(`${PRODUCT_ENDPOINT}`);
    return response.data;
  },
  getProductVariantByProductId: async (productId: number) => {
    let response = await axios.get(`${PRODUCT_ENDPOINT}/${productId}/variants`);
    return response.data;
  },
  getProductSubscriptionByCompanyId: async (companyId: number) => {
    let response = await axios.get(
      `${PRODUCT_VARIANTS_ENDPOINT}/subscription/${companyId}`
    );
    return response.data;
  },
  subscribe: async (productVariantId: number) => {
    let response = await axios.post(
      `${PRODUCT_VARIANTS_ENDPOINT}/${productVariantId}/subscribe`
    );
    return response.data;
  },
};

export default ProductService;
