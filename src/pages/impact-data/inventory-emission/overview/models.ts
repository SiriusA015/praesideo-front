import { ChartData } from "chart.js";

export type Activity = {
  itemText: string;
  itemPercentage: number;
  itemValue: number;
};

export type EmissionChartByActivityModel = {
  itemList: Activity[] | null;
};

export type EmissionChartByScopeModel = {
  itemList: Activity[] | null;
  totalTco2: number;
};

export type EmissionChartBySourceModel = {
  scope1: Activity[] | null;
  scope2: Activity[] | null;
  scope3: Activity[] | null;
};

export type OverviewResponseData = {
  emissionChartByActivityModel: EmissionChartByActivityModel;
  emissionChartByScopeModel: EmissionChartByScopeModel;
  emissionChartBySourceModel: EmissionChartBySourceModel;
};

export type OverviewData = {
  emissionByScope: {
    data: ChartData<"pie">;
    total: number | null;
  };
  emissionBySource?: {
    scope1?: ChartData<"pie">;
    scope2?: ChartData<"pie">;
    scope3?: ChartData<"pie">;
  };
  emissionByActivity?: {
    data: ChartData<"sankey">;
  };
};
