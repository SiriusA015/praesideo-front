import { Chart as ChartJS, ChartData, ChartOptions } from "chart.js";
import { Chart } from "react-chartjs-2";
import { SankeyController, Flow } from "chartjs-chart-sankey";

ChartJS.register(SankeyController, Flow);

type SankeyProps = {
  data: ChartData<"sankey">;
  options?: ChartOptions;
};

export const Sankey = (props: SankeyProps) => {
  return <Chart type="sankey" {...props} />;
};
