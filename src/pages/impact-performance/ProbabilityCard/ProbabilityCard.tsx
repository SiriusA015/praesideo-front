import { ProbabilityCardProps } from "./ProbabilityCard.model";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import styles from "./ProbabilityCard.module.scss";
import { Typography } from "@material-ui/core";

const ProbabilityCard = (props: ProbabilityCardProps) => {
  const chartValue = props.data[props.config.name]?.performanceValue;

  const options = {
    plugins: {
      legend: { display: false },
    },
    centerText: {
      display: true,
      text: `90%`,
    },
    circumference: 180,
    rotation: -90,
    cutout: 110,
  };

  const data = {
    labels: ["", ""],
    datasets: [
      {
        data: [chartValue, 100 - chartValue],
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }

          const gradient = ctx.createLinearGradient(chartArea.bottom, 0, 0, chartArea.top);
          gradient.addColorStop(0, "#579663");
          gradient.addColorStop(0.5, "#c2b84d");
          gradient.addColorStop(1, "#e65c5c");

          return gradient;
        },
      },
    ],
  };

  return (
    <div className={`${styles.container} ${styles.widget}`}>
      <h2>{props.config?.title} <b>{props.config?.subTitle}</b></h2>
      <div className={styles.mainContainer}>
        {chartValue ? (
          <div className={styles.chart}>
            <Doughnut
              data={data}
              options={options}
            />
            <h2
              className={`${styles.highlightNumber2} ${chartValue > 66 ? styles.green : chartValue > 33 ? styles.yellow : styles.red}`}
            >
              {chartValue}%
            </h2>
            <div className={styles.doughnutChartDegrees}>
              <div className={styles.left}>0%</div>
              <div className={styles.right}>100%</div>
            </div>
          </div>
        ) : (
          <Typography className={styles.noDataMessage}>No data present</Typography>
        )}
      </div>
      <div className={styles.subContent}>
        {(
          props.data[props.config.name]?.underlyingImpactPerformance as any[]
        )?.map((element, index) => (
          <div
            key={`additionInformation-${index}`}
            className={styles.additionInformation}
          >
            {element.performanceScope?.match(/[a-z]+|[^a-z]+/gi)?.join(" ")}
            <div className={styles.additionInformationValue}>
              <span>{element.performanceValue + "%"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProbabilityCard;
