import { ImpactmEmissionModel } from "../../../models/impactm-emission.model";

export interface Tab {
  label: string;
  value: string;
  subTabs?: Tab[];
}

export interface TabData {
  yerRepresentationId: number;
  isMeasurement: boolean;
  isFinancialYear: boolean;
  startMonth: number;
  isDataDemoable?: boolean;
  isImpactDataEditable: boolean;
  data?: ImpactmEmissionModel;
}
