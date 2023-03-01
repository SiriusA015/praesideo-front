import { ImpactmEmissionModel } from "../../../../models/impactm-emission.model";
import { CustomTableColumn } from "../../../../components/CustomTable/CustomTable.model";
import { CustomFormConfig } from "../../../../components/CustomForm/CustomForm.model";

export interface ReviewScope3Props {
  data?: ImpactmEmissionModel;
  isImpactDataEditable: boolean;
  isDataDemoable?: boolean;
}

export interface TableConfig {
  tableConfig: CustomTableColumn[];
  formConfig: CustomFormConfig;
}