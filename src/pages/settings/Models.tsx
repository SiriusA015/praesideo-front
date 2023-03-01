import { GridColDef } from "@material-ui/data-grid";
import { CustomFormConfig } from "../../components/CustomForm/CustomForm.model";
import { PropsModel } from "../../components/Icon/Models";
import { CustomTableColumn } from "../../components/CustomTable/CustomTable.model";

export interface SettingsConfig {
  label: string;
  value: string;
  type: "table" | "form";
  iconProps: PropsModel;
  gridConfig: GridColDef[];
  tableConfig?: CustomTableColumn[];
  formConfig?: CustomFormConfig;
}
