import {
  IMPACT_DATA_ROUTE,
  IMPACT_PERFORMANCE_ROUTE,
  MANAGE_SUPPLIERS_ROUTE,
  TRACE_PERFORMANCE_ROUTE,
} from "../../constants";

export const IMPACT_MEASEMENT_ONLY = [
  {
    href: IMPACT_DATA_ROUTE,
    text: "Data Entry",
  },
];

export const IMPACT_PERFORMANCE = [
  {
    href: IMPACT_DATA_ROUTE,
    text: "Data Entry",
  },
  {
    href: IMPACT_PERFORMANCE_ROUTE,
    text: "Performance",
  },
];

export const TRACE_ITEMS = [
  {
    href: MANAGE_SUPPLIERS_ROUTE,
    text: "Manage Suppliers",
  },
  {
    href: TRACE_PERFORMANCE_ROUTE,
    text: "Performance",
  },
];
