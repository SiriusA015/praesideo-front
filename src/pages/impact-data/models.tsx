import { CustomFormConfig } from "../../components/CustomForm/CustomForm.model";
import { Tab } from "../../components/CustomTabs/CustomTabs.model";

export interface FormConfig {
  formConfig?: CustomFormConfig;
  tabsConfig?: TabsConfig;
  onSubmit?: () => void;
  percentageCompleted?: number;
  totalEntries?: number;
  entriesCompleted?: number;
  title?: string;
  key?: string;
  onFileInputChange?: (file: any) => void;
  onRemoveFile?: (fieldName: string, filename: string) => void;
}

export interface TabsConfig {
  formConfig?: CustomFormConfig;
  formConfigs: CustomFormConfig[];
  tabs: Tab[];
}
