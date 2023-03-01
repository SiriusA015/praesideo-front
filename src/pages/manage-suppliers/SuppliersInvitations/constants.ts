import { HeadCell } from "../models";

export const TABLE_HEAD_CELLS: HeadCell[] = [
  {
    id: "supplierId",
    sortable: false,
    label: "Supplier Name",
  },
  {
    id: "amount",
    sortable: false,
    label: "Expenditure",
  },
  {
    id: "supplierInvitationStatus",
    sortable: false,
    label: "Invitation Status",
  },
  { id: "supplierInvitationDate", sortable: false, label: "Last Sent Date" },
];

export enum INVITATIONS_TABS {
  DASHBOARD = "Invitations dashboard",
  SUMMARY = "Invitations summary",
}
