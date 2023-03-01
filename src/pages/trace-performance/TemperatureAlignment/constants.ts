import {
  CoreChartOptions, CoreInteractionOptions,
  DatasetChartOptions,
  ElementChartOptions,
  LineControllerChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";

export const getLineChartOptions = (): _DeepPartialObject<CoreChartOptions<"line"> &
  ElementChartOptions<"line"> &
  PluginChartOptions<"line"> &
  ScaleChartOptions<"line"> &
  DatasetChartOptions<"line"> &
  LineControllerChartOptions> => ({
  maintainAspectRatio: false,
  interaction: {
    mode: "index",
    intersect: false,
  } as CoreInteractionOptions,
  scales: {
    x: {
      title: {
        display: true,
        text: "Years",
        font: {
          size: 10,
          family: "Chivo",
        },
        color: "gray",
      },
      ticks: {
        font: {
          size: 12,
          family: "Chivo",
        },
        color: "gray",
      },
    },
    y: {
      title: {
        display: true,
        text: "Emissions tCO2e",
        font: {
          size: 10,
          family: "Chivo",
        },
        color: "gray",
      },
      ticks: {
        font: {
          size: 12,
          family: "Chivo",
        },
        color: "gray",
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#ffffff",
      titleColor: "#173042",
      bodySpacing: 5,
      padding: 8,
      callbacks: {
        labelTextColor: (tooltipItem: any) => "#173042",
      },
    },
  },
});


export const TABS = [
  {
    value: "supplyChainEmission",
    title: "Supply Chain Emission",
  },
  {
    value: "supplierEmission",
    title: "Supplier Emission",
  },
];
