import CustomForm from "../../components/CustomForm/CustomForm";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { Icon } from "../../components/Icon/Icon";
import {
  impactMeasurementConfig,
  impactMeasurementSteps,
  impactPerformanceConfig,
  impactPerformanceSteps,
} from "./configs";
import styles from "./ImpactData.module.scss";
import Steps from "./steps/Steps";
import useImpactData from "./useImpactData";
import TimeFromNow from "../../components/TimeFromNow/TimeFromNow";
import { useAuth } from "../../helpers/useAuth";
import { INVENTORY_EMISSION_STEP } from "./constants";
import InventoryEmissions from "./inventory-emission/InventoryEmissions";

const ImpactData = () => {
  const {
    activeConfig,
    formDefaultValues,
    isImpactDataDemoable,
    handleClickOnBack,
    handleClickOnNext,
    handleClickOnStep,
    lastSaved,
    onFormSubmit,
    onTabsChange,
    progressInfo,
    isImpactDataEditable,
    state,
    updateCompletedInformation,
  } = useImpactData();
  const { isImpactPerformanceAvailable } = useAuth();
  const { activeStep } = state;
  const steps = [...impactMeasurementSteps];

  const formPagesConfig = isImpactPerformanceAvailable
    ? impactPerformanceConfig
    : impactMeasurementConfig;

  if (isImpactPerformanceAvailable) {
    steps.push(...impactPerformanceSteps);
  }

  if (activeConfig) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h5>IMPACT</h5>
          <h1>Data Entry</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.formSection}>
            <div className={styles.widget}>
              <div className={styles.widgetHeader}>
                <h2>{activeConfig.title}</h2>
                {lastSaved !== null && (
                  <TimeFromNow className={styles.lastSaved} date={lastSaved} />
                )}
              </div>
              {activeConfig.key === INVENTORY_EMISSION_STEP ? (
                <InventoryEmissions
                  isImpactDataEditable={isImpactDataEditable}
                  isDataDemoable={isImpactDataDemoable}
                  updateCompletedInformation={updateCompletedInformation}
                />
              ) : activeConfig.tabsConfig ? (
                <CustomTabs
                  tabs={activeConfig.tabsConfig?.tabs}
                  formConfigs={activeConfig.tabsConfig?.formConfigs}
                  formConfig={activeConfig.tabsConfig?.formConfig}
                  onSubmit={onFormSubmit}
                  isDataDemoable={isImpactDataDemoable}
                  isDataEditable={isImpactDataEditable}
                  formData={formDefaultValues}
                  onTabChange={onTabsChange}
                />
              ) : (
                <CustomForm
                  config={activeConfig.formConfig}
                  onSubmit={onFormSubmit}
                  isDataDemoable={isImpactDataDemoable}
                  isDataEditable={isImpactDataEditable}
                  data={formDefaultValues}
                  onFileInputChange={activeConfig.onFileInputChange}
                  onRemoveFile={activeConfig.onRemoveFile}
                  submitOnBlur
                />
              )}
            </div>
            <div className={styles.navigation}>
              {activeStep > 0 ? (
                <div className={`${styles.previous} ${styles.widget}`} onClick={handleClickOnBack}>
                  <div className={styles.previousArrow}>
                    <Icon icon={"long-arrow-left"} color="gray" />
                    <span>Previous</span>
                  </div>
                  <h2>{formPagesConfig[activeStep - 1].title}</h2>
                </div>
              ) : (
                <></>
              )}
              {activeStep < steps.length - 1 ? (
                <div className={`${styles.next} ${styles.widget}`} onClick={handleClickOnNext}>
                  <h2>{formPagesConfig[activeStep + 1].title}</h2>
                  <div className={styles.nextArrow}>
                    <span>Next</span>
                    <Icon icon={"long-arrow-right"} color="gray" />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={`${styles.stepsSection} ${styles.widget}`}>
            <Steps
              steps={steps}
              activeStep={activeStep}
              isDataDemoable={isImpactDataDemoable}
              isDataEditable={isImpactDataEditable}
              onClickStep={handleClickOnStep}
              progressInfo={progressInfo}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ImpactData;
