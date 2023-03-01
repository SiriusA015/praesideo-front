import { Box, Typography } from "@material-ui/core";
import styles from "./styles.module.scss";
import { Doughnut } from "react-chartjs-2";

type HorizontalLinearGaugeProps = {
  start: { label: string; value: number };
  end: { label: string; value: number };
  value: { label: string; value: number };
};

export const HalfDoughnutProbability = ({
                                        start,
                                        end,
                                        value,
                                      }: HorizontalLinearGaugeProps) => {

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
        data: [value.value, end.value - value.value],
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
    <div className={styles.container}>
      <div className={styles.chart}>
        <Doughnut
          className={styles.doughnutChart}
          data={data}
          options={options}
        />
        <h2 className={`${styles.highlightNumber2} ${value.value > 66 ? styles.green : value.value > 33 ? styles.yellow : styles.red}`}>
          {value.label}
        </h2>
        <Box className={styles.range} display="flex" justifyContent="space-between">
          <Typography className={`${styles.edge} ${styles.left}`}>
            {start.label}%
          </Typography>
          <Typography className={`${styles.edge} ${styles.right}`}>
            {end.label}%
          </Typography>
        </Box>
      </div>
    </div>
  );
};
