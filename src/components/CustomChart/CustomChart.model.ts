export interface CustomChartProps {
  title: string;
  configs: CustomChartConfig[];
  data: any;
}

export interface CustomChartDataProps {
  config: CustomChartConfig;
  data: any;
}

export interface CustomChartConfig {
  title: string;
  yLabel: string;
  xLabel: string;
  name: string;
  dataConfigs: ChartDataConfig[];
}

export interface ChartDataConfig {
  label: string;
  name: string;
  borderColor: string;
  overallValue?: number;
}
