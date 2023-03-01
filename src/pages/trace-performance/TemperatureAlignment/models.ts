import { ChartData } from "chart.js";

export type CategoryNumbers = { label: string; value: number };

export type TemperatureAlignmentStat = {
  probability_1_5: number;
  probability_2: number;
  riskScore: number;
  temperatureScore: number;
  startScore: number;
  endScore: number;
  supplyChainEmission: ChartData<"line">;
  supplierEmission: ChartData<"line">;
  probabilityNumbers_1_5: CategoryNumbers[];
  probabilityNumbers_2: CategoryNumbers[];
  riskNumbers: CategoryNumbers[];
  temperatureNumbers: CategoryNumbers[];
  lastCalculationDate: string;
};
