import styles from "./styles.module.scss";
import { useSetUpSubscription } from "./useSetUpSubscription";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { IMPACT_PRODUCT_NAME } from "./constants";
import { Icon } from "../../components/Icon/Icon";

const SetUpSubscription = () => {
  const {
    products,
    selectedProduct,
    selectedVariant,
    variantDescriptions,
    onBackHandler,
    onConfirmHandler,
    onSelectedProduct,
    isContinueAllow,
    setQuestion1,
    setQuestion2,
    setSuppliers,
    onContinueHandler,
  } = useSetUpSubscription();

  return (
    <div className={styles.form}>
      <h1>Sign Up</h1>
      <h2>{!selectedVariant ? "Subscription" : "Overview"}</h2>
      {!selectedVariant && (
        <FormControl>
          <FormLabel><h3>Which subscription best meets your needs?</h3></FormLabel>
          <RadioGroup
            name="products"
            onChange={(event, value) => onSelectedProduct(value)}
          >
            {products?.map((product, index) => (
              <div className={styles.productContainer} key={`product-${index}`}>
                <FormControlLabel
                  value={product.name}
                  control={<Radio />}
                  label={
                    <div className={styles.productLabel}>{product.name}</div>
                  }
                />
                <h3>{product.description}</h3>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      )}
      {selectedProduct && !selectedVariant && (
        <div className={styles.productVariantContainer}>
          {selectedProduct.name === IMPACT_PRODUCT_NAME ? (
            <>
              <FormControl className={styles.productVariantOption}>
                <FormLabel><h3>Have you done an emissions inventory?</h3></FormLabel>
                <RadioGroup
                  row
                  name="question1"
                  onChange={(event, value) => setQuestion1(value)}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label={<div className={styles.productLabel}>Yes</div>}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label={<div className={styles.productLabel}>No</div>}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl className={styles.productVariantOption}>
                <FormLabel>
                  <h3>Do you/your customers want to assess your climate Impact?</h3>
                </FormLabel>
                <RadioGroup
                  row
                  name="question2"
                  onChange={(event, value) => setQuestion2(value)}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label={<div className={styles.productLabel}>Yes</div>}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio />}
                    label={<div className={styles.productLabel}>No</div>}
                  />
                </RadioGroup>
              </FormControl>
            </>
          ) : (
            <FormControl className={styles.productVariantOption}>
              <FormLabel>
                <h3>Have many suppliers approximately you have in your supply chain?</h3>
              </FormLabel>
              <TextField
                label="Suppliers"
                variant="filled"
                type="number"
                onChange={(e) => setSuppliers(parseInt(e.target.value))}
              />
            </FormControl>
          )}
          <Button
            variant="contained"
            color={"primary"}
            className={styles.fullWidth}
            disabled={!isContinueAllow()}
            onClick={onContinueHandler}
            type="submit"
          >
            Continue
          </Button>
        </div>
      )}
      {selectedVariant && (
        <>
          <h3>Your subscription selection:</h3>
          <div className={styles.subscriptionOverview}>
            <h2>{selectedProduct?.name}</h2>
            {variantDescriptions?.map((description, index) => (
              <div
                className={styles.productVariantDescriptionContainer}
                key={`product-variant-${index}`}
              >
                <Icon
                  icon="check"
                  size="2x"
                  className={styles.icon}
                  color="white"
                  solid
                />
                <div className={styles.productVariantDescription}>
                  <h3>{description.tile}</h3>
                  <h4>{description.description}</h4>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="outlined"
            color={"primary"}
            className={styles.fullWidth}
            onClick={onBackHandler}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color={"primary"}
            className={styles.fullWidth}
            onClick={onConfirmHandler}
            type="submit"
          >
            Confirm
          </Button>
        </>
      )}
    </div>
  );
};

export default SetUpSubscription;
