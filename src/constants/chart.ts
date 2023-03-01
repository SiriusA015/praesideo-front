import { TitleOptions } from "chart.js";
import { _DeepPartialObject } from "chart.js/types/utils";

import { COLOR } from "./colors";

export const DEFAULT_CHART_OPTIONS = {
  responsive: true,
  aspectRatio: 1.5,
  interaction: {
    intersect: false,
  },
};

export const DEFAULT_AXIS_OPTIONS = {
  grid: {
    display: false,
    borderColor: COLOR.whiteWhale,
  },
  ticks: {
    color: COLOR.tiber,
    font: {
      family: "Chivo-Light",
    },
  },
};

export const DEFAULT_CHART_TITLE: _DeepPartialObject<TitleOptions> = {
  align: "start",
  color: COLOR.tiber,
  display: true,
  font: {
    family: "Chivo-Light",
    size: 14,
  },
  padding: 25,
};
