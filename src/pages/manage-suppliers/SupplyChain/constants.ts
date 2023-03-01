import { HeadCell } from "../models";

export const FINANCIAL_YEAR_OPTIONS = [
  {
    label: "Calendar Year",
    value: 0,
  },
  {
    label: "Financial Year",
    value: 1,
  },
];

export const TABLE_HEAD_CELLS: HeadCell[] = [
  {
    id: "supplierId",
    sortable: false,
    label: "Supplier Name",
  },
  { id: "supplierCategoryId", sortable: false, label: "Category" },
  { id: "supplierTypeId", sortable: false, label: "Type" },
  {
    id: "supplierAmount",
    sortable: false,
    label: "Expenditure",
  },
  { id: "status", sortable: false, label: "Status" },
];
