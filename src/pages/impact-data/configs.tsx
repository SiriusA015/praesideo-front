import { FormConfig } from "./models";
import { Step } from "./steps/Models";
import { financialInformationConfig } from "./financial-information/config";
import { inventoryMethodAuditingConfig, inventoryMethodConfig } from "./inventory-method/config";
import { ghcTargetSettingTabConfig } from "./target-setting/config";
import { climateMetricsConfig } from "./climate-mechanism/config";
import { supportingDocumentsConfig } from "./supporting-document/config";
import { generalBackgroundTabConfig } from "./general-background/config";

export const impactMeasurementSteps: Step[] = [
  {
    label: "General Background",
    active: false,
    percentageCompleted: 0,
    entriesLeft: 0,
    key: "generalBackground",
  },
  {
    label: "Financial Information",
    active: false,
    percentageCompleted: 0,
    entriesLeft: 0,
    key: "financialInformation",
  },
  {
    label: "GHG Inventory Method",
    active: false,
    percentageCompleted: 0,
    entriesLeft: 0,
    key: "ghgInventoryMethod",
  },
  {
    label: "Inventory Emissions",
    active: false,
    percentageCompleted: 0,
    entriesLeft: 0,
    key: "inventoryEmissions",
  },
];

export const impactPerformanceSteps: Step[] = [
  {
    label: "GHG Target Setting",
    active: false,
    percentageCompleted: 0,
    entriesLeft: 0,
    key: "ghgTargetSetting",
  },
  {
    label: "Climate Mechanisms",
    active: false,
    percentageCompleted: 0,
    entriesLeft: 0,
    key: "climateMetrics",
  },
  {
    label: "Supporting Documents",
    active: false,
    percentageCompleted: 0,
    entriesLeft: 0,
    key: "supportingDocuments",
  },
]

export const impactMeasurementConfig: FormConfig[] = [
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "General Background",
    key: "generalBackground",
    tabsConfig: generalBackgroundTabConfig,
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "Financial Information",
    formConfig: financialInformationConfig,
    key: "financialInformation",
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "GHG Inventory Method",
    formConfig: inventoryMethodConfig,
    key: "ghgInventoryMethod",
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    key: "inventoryEmissions",
    title: "Inventory Emissions",
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    key: "ghgTargetSetting",
    title: "GHG Target Setting",
    tabsConfig: ghcTargetSettingTabConfig,
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "Climate Mechanisms",
    formConfig: climateMetricsConfig,
    key: "climateMetrics",
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "Supporting Documents",
    formConfig: supportingDocumentsConfig,
    key: "supportingDocuments",
  },
];

export const impactPerformanceConfig: FormConfig[] = [
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "General Background",
    key: "generalBackground",
    tabsConfig: generalBackgroundTabConfig,
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "Financial Information",
    formConfig: financialInformationConfig,
    key: "financialInformation",
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "GHG Inventory Method",
    formConfig: inventoryMethodAuditingConfig,
    key: "ghgInventoryMethod",
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    key: "inventoryEmissions",
    title: "Inventory Emissions",
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    key: "ghgTargetSetting",
    title: "GHG Target Setting",
    tabsConfig: ghcTargetSettingTabConfig,
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "Climate Mechanisms",
    formConfig: climateMetricsConfig,
    key: "climateMetrics",
  },
  {
    onSubmit: () => {},
    percentageCompleted: 0,
    totalEntries: 0,
    entriesCompleted: 0,
    title: "Supporting Documents",
    formConfig: supportingDocumentsConfig,
    key: "supportingDocuments",
  },
];
