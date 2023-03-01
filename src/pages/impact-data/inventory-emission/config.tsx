import {
  ACTIVITY_SCOPE_1_TABULATION,
  ACTIVITY_SCOPE_2_TABULATION,
  ACTIVITY_SCOPE_3_TABULATION,
  ACTIVITY_TABULATION,
  EMISSIONS_EMISSIONS_DATA_TABULATION,
  EMISSIONS_OPERATIONAL_BOUNDARY_TABULATION,
  EMISSIONS_OVERVIEW_TABULATION,
  EMISSIONS_TABULATION,
  REVIEW_SCOPE_1_TABULATION,
  REVIEW_SCOPE_2_TABULATION,
  REVIEW_SCOPE_3_TABULATION,
  REVIEW_TABULATION,
} from "./constants";
import { Tab } from "./models";
import { FormConfig } from "../models";

export const enterEmissionTabulation: Tab[] = [
  {
    label: "Emissions",
    value: EMISSIONS_TABULATION,
    subTabs: [
      {
        label: "Operational Boundary",
        value: EMISSIONS_OPERATIONAL_BOUNDARY_TABULATION,
      },
      {
        label: "Emissions Data",
        value: EMISSIONS_EMISSIONS_DATA_TABULATION,
      },
      {
        label: "Overview",
        value: EMISSIONS_OVERVIEW_TABULATION,
      },
    ],
  },
];

export const measureEmissionTabulation: Tab[] = [
  {
    label: "Activity",
    value: ACTIVITY_TABULATION,
    subTabs: [
      {
        label: "Scope 1",
        value: ACTIVITY_SCOPE_1_TABULATION,
      },
      {
        label: "Scope 2",
        value: ACTIVITY_SCOPE_2_TABULATION,
      },
      {
        label: "Scope 3",
        value: ACTIVITY_SCOPE_3_TABULATION,
      },
    ],
  },
  {
    label: "Review",
    value: REVIEW_TABULATION,
    subTabs: [
      {
        label: "Scope 1",
        value: REVIEW_SCOPE_1_TABULATION,
      },
      {
        label: "Scope 2",
        value: REVIEW_SCOPE_2_TABULATION,
      },
      {
        label: "Scope 3",
        value: REVIEW_SCOPE_3_TABULATION,
      },
    ],
  },
]


