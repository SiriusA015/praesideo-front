import { Icon } from "../../components/Icon/Icon";
import { Order } from "../../constants";
import { TableState } from "./models";
import SuppliersAllocations from "./SuppliersAllocations";
import SuppliersInvitations from "./SuppliersInvitations";
import SupplyChain from "./SupplyChain";

export enum SUPPLIERS_SECTIONS {
  SUPPLY_CHAIN = "SUPPLY_CHAIN",
  SUPPLIER_ALLOCATIONS = "SUPPLIER_ALLOCATIONS",
  SUPPLIERS_INVITATIONS = "SUPPLIERS_INVITATIONS",
};

export const TABS = [
  {
    label: "Supply chain",
    value: SUPPLIERS_SECTIONS.SUPPLY_CHAIN,
  },
  {
    label: "Supplier allocations",
    icon: <Icon icon="clipboard-list-check" />,
    value: SUPPLIERS_SECTIONS.SUPPLIER_ALLOCATIONS,
  },
  {
    label: "Suppliers invitations",
    value: SUPPLIERS_SECTIONS.SUPPLIERS_INVITATIONS,
  },
];

export const TAB_PANELS = {
  [SUPPLIERS_SECTIONS.SUPPLY_CHAIN]: SupplyChain,
  [SUPPLIERS_SECTIONS.SUPPLIER_ALLOCATIONS]: SuppliersAllocations,
  [SUPPLIERS_SECTIONS.SUPPLIERS_INVITATIONS]: SuppliersInvitations
};

export const INITIAL_TABLE_STATE: TableState = {
  order: Order.ASC,
  orderBy: "supplierId",
  pageNumber: 0,
  pageSize: 5,
};
