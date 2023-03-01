import { Line } from "react-chartjs-2";
import { CoreInteractionOptions } from "chart.js";
import { CustomChartDataProps } from "./CustomChart.model";
import { getColorByTemperature } from "../../constants";


const CustomChartData = (props: CustomChartDataProps) => {
  const options = {
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    } as CoreInteractionOptions,
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
    scales: {
      x: {
        title: {
          display: true,
          text: props.config.xLabel,
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
          text: props.config.yLabel,
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
  };

  const data = {
    labels: props.data[props.config?.name].labels || [],
    datasets:
      props.config?.dataConfigs.map((config) => ({
        ...config,
        borderColor: config.overallValue ? getColorByTemperature(config.overallValue, 1) : config.borderColor,
        backgroundColor: config.overallValue ? (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }

          const colorValue = config.overallValue ? getColorByTemperature(config.overallValue, 0.7) : config.borderColor;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, "#ffffff");
          gradient.addColorStop(1, colorValue);

          return gradient;
        } : undefined,
        data: props.data[props.config?.name][config.name],
        fill: !!config.overallValue,
      })) || [],
  };

  return (<Line data={data} options={options} />);
};


export default CustomChartData;
