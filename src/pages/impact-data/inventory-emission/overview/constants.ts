import {
  CoreChartOptions,
  DatasetChartOptions,
  ElementChartOptions,
  PieControllerChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";

import {
  DEFAULT_CHART_OPTIONS,
  DEFAULT_CHART_TITLE,
} from "../../../../constants";

export const PIE_CHART_OPTIONS: _DeepPartialObject<
  CoreChartOptions<"pie"> &
    ElementChartOptions<"pie"> &
    PluginChartOptions<"pie"> &
    ScaleChartOptions<"pie"> &
    DatasetChartOptions<"pie"> &
    PieControllerChartOptions
> = {
  ...DEFAULT_CHART_OPTIONS,
  aspectRatio: 1,
  plugins: {
    title: {
      ...DEFAULT_CHART_TITLE,
      display: false,
      padding: 0,
    },
    tooltip: {
      enabled: false,
    },
    datalabels: {
      color: "white",
      formatter: (value) => `${value}%`,
    },
    legend: {
      display: false,
    },
  },
};

export const SCOPE_PIE_CHART_OPTIONS = {
  ...PIE_CHART_OPTIONS,
  aspectRatio: 1,
  plugins: {
    ...PIE_CHART_OPTIONS.plugins,
    reactLegend: {
      // ID of the container to put the legend in
      containerID: "scope-legend-container",
    },
  },
};

export const SOURCE_PIE_CHART_OPTIONS = {
  ...PIE_CHART_OPTIONS,
  plugins: {
    ...PIE_CHART_OPTIONS.plugins,
    reactLegend: {
      // ID of the container to put the legend in
      containerID: "source-legend-container",
    },
  },
};

export const SANKEY_CHART_OPTIONS = {
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
};
