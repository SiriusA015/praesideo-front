import { CustomFormConfig } from "../CustomForm/CustomForm.model";
import { ReactNode } from "react";

export interface CustomTableProps {
  columns?: CustomTableColumn[];
  formConfig?: CustomFormConfig;
  onFormSubmit?: (value: any) => void;
  data: any[];
  isDataDemoable?: boolean;
  isDataOpenable?: boolean;
  isDataEditable: boolean;
}

export interface CustomRowProps {
  row: any;
  columns?: CustomTableColumn[];
  formConfig?: CustomFormConfig;
  onFormSubmit?: (value: any) => void;
  isDataDemoable?: boolean;
  isDataOpenable?: boolean;
  isDataEditable: boolean;
}

export interface CustomTableColumn {
  headerName: string;
  field: string;
  renderCell?: (data: any) => ReactNode;
  renderAllCells?: (data: any) => ReactNode;
}
