import { HeadCell } from "../models";

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
