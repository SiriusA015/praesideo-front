import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../helpers/useAuth";
import ImpactDataService from "../../../services/ImpactDataService";
import { StepsProps, Submit } from "./Models";

const useSteps = (props: StepsProps) => {
  const { isImpactPerformanceAvailable } = useAuth();
  const [progressInfo, setProgressInfo] = useState<any>(null);
  const [allowSubmit, setAllowSubmit] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [stepsSubmitLabel, setStepsSubmitLabel] = useState<string>("");
  const history = useHistory();

  const onClickSubmit = async () => {
    const result = await ImpactDataService.submit();
    if (result.isSubmitted) {
      setOpenSubmitDialog(true);
      setStepsSubmitLabel(result.submissionMessage);
    } else {
      history.go(0);  
    }
  };
  const onClickEntry = (e: any, index: number) => {
    e.stopPropagation();
    setSelectedIndex(index);
    setOpenDialog(true);
  };
  const onCloseDialog = () => setOpenDialog(false);
  const onCloseSubmitDialog = () => {
    setOpenSubmitDialog(false);
    history.go(0);  
  };

  useEffect(() => {
    setProgressInfo(props.progressInfo);
    if (checkAllowSubmit(props.progressInfo)) {
      setAllowSubmit(props.isDataEditable);
      setPercentage(100);
    } else {
      setAllowSubmit(false);
      setPercentage(calculatePercentage(props.progressInfo));
    }
  }, [props.progressInfo]);

  return {
    isImpactPerformanceAvailable,
    allowSubmit,
    openDialog,
    selectedIndex,
    percentage,
    onClickSubmit,
    onClickEntry,
    onCloseDialog,
    onCloseSubmitDialog,
    openSubmitDialog,
    progressInfo,
    stepsSubmitLabel,
    isDataEditable: props.isDataEditable,
  };
};

export default useSteps;

export const checkAllowSubmit = (percentages: any) => {
  return !!(
    percentages &&
    percentages.generalBackgroundPercentage === 100 &&
    percentages.financialInformationPercentage === 100 &&
    percentages.ghgInventoryMethodPercentage === 100 &&
    percentages.inventoryEmissionsPercentage === 100 &&
    percentages.ghgTargetSettingPercentage === 100 &&
    percentages.climateMetricsPercentage === 100
  );
};

export const calculatePercentage = (percentages: any) => {
  if (!percentages) {
    return 0;
  }

  const percentage = (percentages.generalBackgroundPercentage + percentages.financialInformationPercentage +
    percentages.ghgInventoryMethodPercentage + percentages.inventoryEmissionsPercentage +
    percentages.ghgTargetSettingPercentage + percentages.climateMetricsPercentage) / 6;

  return Math.trunc(percentage);
};
