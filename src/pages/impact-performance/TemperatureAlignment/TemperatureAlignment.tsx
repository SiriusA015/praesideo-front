import styles from "./TemperatureAlignment.module.scss";
import { Grid } from "@material-ui/core";
import { TemperatureAlignmentProps } from "./model";
import ProbabilityCard from "../ProbabilityCard/ProbabilityCard";
import { chart, probability1_5, probability2 } from "./configs";
import CustomChart from "../../../components/CustomChart/CustomChart";
import { Doughnut } from "react-chartjs-2";
import TemperatureAlignmentImage from "../../../components/TemperatureAlignmentImage/TemperatureAlignmentImage";
import { useEffect, useState } from "react";
import { CustomChartConfig } from "../../../components/CustomChart/CustomChart.model";
import { COMPANY_NAME_PLACEHOLDER } from "./constants";
import { getColorByTemperature } from "../../../constants";

const TemperatureAlignment = (props: TemperatureAlignmentProps) => {
  const chartValue = props.data.overallScore.performanceValue;
  const [chartConfigs, setChartConfigs] = useState<CustomChartConfig[]>(chart);

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
    cutout: 125,
  };

  useEffect(() => {
    const companyName = props.companyName || "Company Name";
    const newChartConfigs = [...chartConfigs];

    newChartConfigs.forEach(chartConfig => {
      chartConfig.dataConfigs.forEach(dataConfig => {
        if (dataConfig.label === COMPANY_NAME_PLACEHOLDER) {
          dataConfig.label = companyName;
          dataConfig.overallValue = chartValue;
        }
      });
    });

    setChartConfigs(chartConfigs);

  }, [props.companyName]);

  useEffect(() => {
    const newChartConfigs = [...chartConfigs];

    newChartConfigs.forEach(chartConfig => {
      chartConfig.dataConfigs.forEach(dataConfig => {
        if (dataConfig.name === "overall") {
          dataConfig.overallValue = chartValue;
        }
      });
    });

    setChartConfigs(chartConfigs);

  }, [props.data]);

  const data = {
    labels: ["", ""],
    datasets: [
      {
        data: [chartValue, 3.5 - chartValue],
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }

          const gradient = ctx.createLinearGradient(chartArea.bottom, 0, 0, chartArea.top);
          gradient.addColorStop(0, "#e65c5c");
          gradient.addColorStop(0.5, "#c2b84d");
          gradient.addColorStop(1, "#579663");

          return gradient;
        },
      },
    ],
  };

  return (
    <Grid container direction="row">
      <Grid
        classes={{
          root: styles.overallChartGrid,
        }}
        item xs={4}
      >
        <div className={`${styles.widget} ${styles.overallChart}`}>
          <div className={styles.overallChartHeader}>
            <h2>Overall Temperature Alignment</h2>
            <div className={styles.scopeContent}>
              {(
                props.data.overallScore.underlyingImpactPerformance as any[]
              )?.map((element, index) => (
                <div
                  key={`additionInformation-${index}`}
                  className={styles.additionInformation}
                >
                  {element.performanceScope?.match(/[a-z]+|[^a-z]+/gi)?.join(" ")}
                  <div className={styles.additionInformationValue}>
                    <span>{element.performanceValue}°</span>
                  </div>
                </div>
              ))}
            </div>
            <Doughnut
              data={data}
              options={options}
            />
            <div className={styles.doughnutChartDegrees}>
              <div className={styles.left}>1.5°</div>
              <div className={styles.right}>3.2°</div>
            </div>
            <div className={styles.temperature}>
              <h1 className={styles.highlightNumber1}
                  style={{color: `${getColorByTemperature(chartValue, 1)}`}}>
                {chartValue}°
              </h1>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <TemperatureAlignmentImage temperature={chartValue} />
          </div>
        </div>
      </Grid>
      <Grid item xs={8}>
        <Grid container direction="row">
          <Grid item xs={6}
            classes={{
              root: styles.subGrid1,
            }}
          >
            <ProbabilityCard config={probability1_5} data={props.data} />
          </Grid>
          <Grid item xs={6}
            classes={{
              root: styles.subGrid1,
            }}>
            <ProbabilityCard config={probability2} data={props.data} />
          </Grid>
          <Grid item xs={12}
            classes={{
              root: styles.subGrid2,
            }}>
            <CustomChart configs={chartConfigs} data={props.data} title="Emissions Reduction Transition Pathway" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>);
};

export default TemperatureAlignment;
