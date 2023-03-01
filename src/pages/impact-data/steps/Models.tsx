export interface StepsProps {
  activeStep: number;
  onClickStep: (index: number) => void;
  steps: Step[];
  progressInfo: any;
  isDataDemoable: boolean;
  isDataEditable: boolean;
}

export interface Step {
  active: boolean;
  label: string;
  percentageCompleted: number;
  entriesLeft: number;
  key: string;
}

export interface Submit {
  isSubmitted: boolean;
  submissionMessage: string;
}