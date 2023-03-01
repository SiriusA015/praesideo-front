import ReactDOM from "react-dom";
import { List, ListItem } from "@material-ui/core";
import { Chart, ChartOptions, Plugin } from "chart.js";
import { AnyObject } from "chart.js/types/basic";
import clsx from "clsx";

import styles from "./styles.module.scss";

/**
 * React based Legend Plugin
 * HTML example:
 *  https://github.com/chartjs/Chart.js/blob/master/docs/samples/legend/html.md
 */
export const LegendPlugin: Plugin<"pie", AnyObject> = {
  id: "reactLegend",
  afterUpdate(chart: Chart<"pie">, args, options: ChartOptions) {
    const legendContainer = document.getElementById(options.containerID);
    const items =
      chart?.options?.plugins?.legend?.labels?.generateLabels?.(chart);

    ReactDOM.render(
      <List className={styles.list}>
        {items?.map(
          ({
            index,
            datasetIndex,
            fillStyle,
            strokeStyle,
            lineWidth,
            hidden,
            fontColor,
            text,
          }: any) => (
            <ListItem
              key={index}
              className={styles.item}
              onClick={() => {
                const { type } = chart.config;
                if (type === "pie" || type === "doughnut") {
                  // Pie and doughnut charts only have a single dataset and visibility is per item
                  chart.toggleDataVisibility(index);
                } else {
                  chart.setDatasetVisibility(
                    datasetIndex,
                    !chart.isDatasetVisible(datasetIndex)
                  );
                }
                chart.update();
              }}
            >
              <span
                className={styles.box}
                style={{
                  background: fillStyle,
                  borderColor: strokeStyle,
                  borderWidth: `${lineWidth}px`,
                }}
              ></span>
              <p
                className={clsx(styles.text, hidden && styles.textHidden)}
                style={{ color: fontColor }}
              >
                {text}
              </p>
            </ListItem>
          )
        )}
      </List>,
      legendContainer
    );
  },
};
