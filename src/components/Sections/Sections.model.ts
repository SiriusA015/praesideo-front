import {
  ConditionFormConfig,
  CustomFormConfig,
  Field,
} from "../CustomForm/CustomForm.model";

export interface SectionsProps {
  formConfigConditionBy?: ConditionFormConfig;
  formConfig?: CustomFormConfig;
  onSubmit?: (values: any) => void;
  isDataDemoable?: boolean;
  isDataEditable?: boolean;
  facilityId?: number;
  dataEmissionId?: number;
  onBlur?: (values: any) => void;
  data?: any[];
  type?: string;
  label?: string | Field[];
  remove?: boolean;
  emptyMessage?: string;
  onRemove?: (id: number) => void;
  onChange: (...event: any[]) => void;
  addButtonLabel?: string;
}
