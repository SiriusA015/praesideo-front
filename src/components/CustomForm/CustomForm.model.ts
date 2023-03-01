import { Control } from "react-hook-form/dist/types/form";

export interface Field {
  name: string;
  newField?: string;
  label?: string | Field[] | any;
  remove?: boolean;
  emptyMessage?: string;
  onRemove?: (id: number) => void;
  addButtonLabel?: string;
  defaultValue: string;
  type:
    | "button"
    | "checkbox"
    | "radio"
    | "file"
    | "section-title"
    | "select"
    | "select-state"
    | "text"
    | "text-button"
    | "multi-select"
    | "multi-scope1-select"
    | "multi-scope2-select"
    | "multi-scope3-select"
    | "location-input"
    | "sections"
    | "sections-facility"
    | "fields-group"
    | "paragraph"
    | "category-fields-group";
  placeholder: string;
  flex?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  link?: string;
  formConfig?: CustomFormConfig;
  formConfigConditionedBy?: ConditionFormConfig;
  inputType?: "text" | "password" | "numeric";
  options?: Option[];
  optionsField?: string;
  rules?: any;
  conditionedBy?: ConditionedField;
  multiple?: boolean;
  grouping?: boolean;
  description?: string;
  filterOptionsBy?: string;
  generateBasedOn?: string;
  autocomplete?: string;
  groupOptions?: boolean;
  percentage?: boolean;
}

export interface CustomFormProps {
  onSubmit?: (value: any) => void;
  config?: CustomFormConfig;
  errors?: FormError;
  facilityId?: number;
  dataEmissionId?: number;
  submitOnBlur?: boolean;
  isDataEditable?: boolean;
  isDataDemoable?: boolean;
  data?: any;
  onFileInputChange?: (file: any) => void;
  onRemoveFile?: (fieldName: string, filename: string) => void;
}

export interface SelectStateComponentProps {
  name: string;
  control: Control;
  countryId: number;
  defaultValue: number;
  handleBlur: () => void;
  isDataDemoable?: boolean;
  isDataEditable?: boolean;
  label: string;
}

export interface CustomFormConfig {
  fields: Field[];
}

export interface Option {
  label?: string;
  value?: string | number;
  category?: string;
  group?: string | number;
  groupedOptions?: Option[];
  groupedOptionId?: number;
  code?: string;
}

export interface FormError {
  [key: string]: {
    message: string;
  };
}

export interface FormValue {
  [key: string]: string | boolean;
}

export interface ConditionedField {
  field: string;
  value: string | number | boolean | null | [];
  disable: boolean;
}

export interface ConditionFormConfig {
  conditionBy: ConditionedField[];
  message: string;
}
