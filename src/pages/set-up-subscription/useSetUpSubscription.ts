import { useEffect, useState } from "react";
import { ProductModel } from "../../models/product.model";
import ProductService from "../../services/ProductService";
import {
  IMPACT_MEASUREMENT_VARIANT_NAME,
  IMPACT_PERFORMANCE_MEASUREMENT_VARIANT_NAME,
  IMPACT_PERFORMANCE_VARIANT_NAME,
  IMPACT_PRODUCT_NAME,
  TRACE_L_VARIANT_NAME,
  TRACE_M_VARIANT_NAME,
  TRACE_PRODUCT_NAME,
  TRACE_S_VARIANT_NAME,
  TRACE_UNLIMITED_VARIANT_NAME,
  TRACE_XS_VARIANT_NAME,
} from "./constants";
import { ProductVariantModel } from "../../models/product-variant.model";
import { VARIANTS_CONFIG } from "./configs";
import { VariantDescription } from "./models";
import { useHistory } from "react-router-dom";
import { LOGIN_ROUTE, ROOT_ROUTE } from "../../constants";
import { useAuth } from "../../helpers/useAuth";

export const useSetUpSubscription = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel>();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantModel>();
  const [variantDescriptions, setVariantDescriptions] =
    useState<VariantDescription[]>();
  const [question1, setQuestion1] = useState<string>();
  const [question2, setQuestion2] = useState<string>();
  const [suppliers, setSuppliers] = useState<number>();
  const history = useHistory();
  const { getSubscription, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push(LOGIN_ROUTE);
    } else {
      ProductService.getProducts().then((products) => setProducts(products));
    }
  }, []);

  const onSelectedProduct = (value: string) => {
    setSelectedProduct(products?.find((product) => product.name === value));
    setQuestion1(undefined);
    setQuestion2(undefined);
    setSuppliers(undefined);
  };

  const isContinueAllow = () => {
    if (selectedProduct) {
      if (selectedProduct.name === IMPACT_PRODUCT_NAME) {
        return question1 && question2;
      } else {
        return !!suppliers;
      }
    }

    return false;
  };

  const onContinueHandler = () => {
    let variantName = "";

    if (selectedProduct?.name === TRACE_PRODUCT_NAME && !!suppliers) {
      if (suppliers < 20) {
        variantName = TRACE_XS_VARIANT_NAME;
      } else if (suppliers < 100) {
        variantName = TRACE_S_VARIANT_NAME;
      } else if (suppliers < 1000) {
        variantName = TRACE_M_VARIANT_NAME;
      } else if (suppliers < 5000) {
        variantName = TRACE_L_VARIANT_NAME;
      } else {
        variantName = TRACE_UNLIMITED_VARIANT_NAME;
      }
    } else if (selectedProduct?.name === IMPACT_PRODUCT_NAME) {
      if (question1 === "yes" && question2 === "yes") {
        variantName = IMPACT_PERFORMANCE_VARIANT_NAME;
      } else if (question1 === "no" && question2 === "yes") {
        variantName = IMPACT_PERFORMANCE_MEASUREMENT_VARIANT_NAME;
      } else {
        variantName = IMPACT_MEASUREMENT_VARIANT_NAME;
      }
    }

    const variant = selectedProduct?.variants.find(
      (v) => v.name === variantName
    );

    setSelectedVariant(variant);

    const variantDescriptionIndexes =
      VARIANTS_CONFIG.mapVariantsToDescriptions.find((map) =>
        map.names.includes(variant?.name || "")
      )?.descriptionsIndex || [];

    setVariantDescriptions(
      variantDescriptionIndexes.map(
        (index) => VARIANTS_CONFIG.descriptions[index]
      )
    );
  };

  const onBackHandler = () => {
    setVariantDescriptions(undefined);
    setSelectedVariant(undefined);
    setSelectedProduct(undefined);
  };

  const onConfirmHandler = () => {
    if (selectedVariant) {
      ProductService.subscribe(selectedVariant.id).then(() => {
        getSubscription();

        history.push(ROOT_ROUTE);
      });
    }
  };

  return {
    products,
    selectedProduct,
    selectedVariant,
    variantDescriptions,
    onBackHandler,
    onConfirmHandler,
    onContinueHandler,
    isContinueAllow,
    setQuestion1,
    setQuestion2,
    setSuppliers,
    onSelectedProduct,
  };
};
