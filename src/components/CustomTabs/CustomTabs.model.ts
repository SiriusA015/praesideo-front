import { CustomFormConfig } from "../CustomForm/CustomForm.model";

export interface CustomTabsProps {
  formConfigs?: CustomFormConfig[];
  formConfig?: CustomFormConfig;
  tabs?: Tab[];
  onSubmit?: (values: any) => void;
  isDataEditable?: boolean;
  isDataDemoable?: boolean;
  formData?: any;
  onTabChange?: (value: string) => void;
}

export interface Tab {
  label: string;
  value: string;
}
