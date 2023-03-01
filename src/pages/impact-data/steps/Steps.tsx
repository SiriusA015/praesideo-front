import { Button } from "@material-ui/core";

import { Icon } from "../../../components/Icon/Icon";
import MissingFields from "../missing-fields/MissingFields";
import SubmitMissingFields from "../submit-missing-fields/SubmitMissingFields";
import { StepsProps } from "./Models";
import useSteps from "./useSteps";
import styles from "./Steps.module.scss";

const Steps = (props: StepsProps) => {
  const {
    isImpactPerformanceAvailable,
    onClickSubmit,
    onClickEntry,
    onCloseDialog,
    onCloseSubmitDialog,
    openSubmitDialog,
    progressInfo,
    allowSubmit,
    isDataEditable,
    openDialog,
    selectedIndex,
    percentage,
    stepsSubmitLabel,
  } = useSteps(props);
  return (
    <div className={styles.container}>
      <h2>Data Entry Process</h2>
      {props.steps.map((element, index) => {
        let entriesLeft = 0;
        if (progressInfo) {
          entriesLeft =
            progressInfo[element.key + "PercentageTotal"] -
            progressInfo[element.key + "PercentageCompleted"];
        }
        return (
          <div
            className={props.activeStep === index ? `${styles.step} ${styles.active}` : styles.step}
            onClick={() => props.onClickStep && props.onClickStep(index)}
            key={`step-${index}`}
          >
            <h3>{element.label}</h3>
            {progressInfo &&
              progressInfo[element.key + "MissingFields"] !== null && (
                <div className={styles.details}>
                  <p>{progressInfo[element.key + "Percentage"]}% completed</p>
                  {entriesLeft ? <span>&#183;</span> : ""}
                  {entriesLeft > 0 && (
                    <p
                      className={styles.entry}
                      onClick={(e) => onClickEntry(e, index)}
                    >
                      {entriesLeft} {entriesLeft > 1 ? "entries" : "entry"}{" "}
                      left
                    </p>
                  )}
                  {progressInfo[element.key + "Percentage"] === 100 && (
                    <Icon
                      icon={"check-circle"}
                      color="green"
                      size={"sm"}
                      solid
                    />
                  )}
                </div>
              )}
          </div>
        );
      })}
      <MissingFields
        open={openDialog}
        onClose={onCloseDialog}
        selectedKey={props.steps[selectedIndex].key}
        label={props.steps[selectedIndex].label}
        progressInfo={progressInfo}
      />
      {isImpactPerformanceAvailable && (
        <Button
          variant="contained"
          color="primary"
          className={styles.submit}
          style={{ background: isDataEditable && !props.isDataDemoable &&  percentage>=100? `linear-gradient(90deg, #80bb50 ${percentage}%, #9ec778 ${percentage}%)` : `linear-gradient(90deg, rgb(133 133 133) ${percentage}%, rgb(172 173 172) ${percentage}%)` }}
          onClick={onClickSubmit}
          disabled={percentage<100}
          // disabled={!allowSubmit || props.isDataDemoable}
        >
          {isDataEditable ? <><span className={styles.submitText}>Submit </span> {percentage}%</> :
            "Under Praesideo Review"}
        </Button>
      )}
       <SubmitMissingFields
        open={openSubmitDialog}
        onClose={onCloseSubmitDialog}
        label={stepsSubmitLabel}
      />
    </div>
  );
};

export default Steps;
