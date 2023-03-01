import { Grid, LinearProgress, List, ListItem, Tab, Typography } from "@material-ui/core";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";

import {
  CardCategoryNumbers,
  VerticalStatCard,
} from "../../../components/Cards/VerticalStatCard";
import { YearType } from "../../../models/DateTypes";
import TracePerformanceService from "../../../services/TracePerformanceService";
import { AvailableNumberType } from "../models";
import { getLineChartOptions, TABS } from "./constants";
import { CategoryNumbers, TemperatureAlignmentStat } from "./models";
import styles from "../styles.module.scss";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import clsx from "clsx";
import TemperatureAlignmentImage from "../../../components/TemperatureAlignmentImage/TemperatureAlignmentImage";
import { getColorByTemperature } from "../../../constants";

type TemperatureAlignmentProps = {
  filters?: Record<string, YearType>;
  suppliers?: AvailableNumberType;
  setLastComputed: Dispatch<SetStateAction<string | undefined>>;
  setEmpty: Dispatch<SetStateAction<boolean>>;
};

export const TemperatureAlignment = ({
                                       filters,
                                       suppliers,
                                       setLastComputed,
                                       setEmpty,
                                     }: TemperatureAlignmentProps) => {
  const [statistics, setStatistics] = useState<TemperatureAlignmentStat>();
  const [activeTab, setActiveTab] = useState<string>(TABS[0].value);
  const [temperatureScoreData, setTemperatureScoreData] = useState<any>();

  const fetchAlignment = async (filters: Record<string, YearType>) => {
    const { data } = await TracePerformanceService.getTemperatureAlignment(
      filters.year,
    );
    if (data) {
      setStatistics(data);
      setLastComputed(data?.lastCalculationDate);

      setTemperatureScoreData({
        labels: ["", ""],
        datasets: [
          {
            data: [data.temperatureScore, 3.5 - data.temperatureScore],
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
      });
    } else {
      setEmpty(true);
    }
  };

  useEffect(() => {
    if (filters) {
      fetchAlignment(filters);
    }
  }, [filters]);

  const handleChangeOnTabs = (event: React.ChangeEvent<{}>, value: string) => setActiveTab(value);

  const getCardCategoryNumbers = (
    values: CategoryNumbers[],
    availableNumber: number,
  ): CardCategoryNumbers[] => {
    return values.map(({ label, value }) => ({
      label,
      percentage: value ? (value / availableNumber) * 100 : 0,
    }));
  };

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

  const temperatureNumbers = useMemo(() => {
    const values = statistics?.temperatureNumbers;
    const available = suppliers?.available;
    return values && available
      ? getCardCategoryNumbers(values, available)
      : undefined;
  }, [suppliers?.available, statistics?.temperatureNumbers]);

  const probabilityNumbers_1_5 = useMemo(() => {
    const values = statistics?.probabilityNumbers_1_5;
    const available = suppliers?.available;
    return values && available
      ? getCardCategoryNumbers(values, available)
      : undefined;
  }, [suppliers?.available, statistics?.probabilityNumbers_1_5]);

  const probabilityNumbers_2 = useMemo(() => {
    const values = statistics?.probabilityNumbers_2;
    const available = suppliers?.available;
    return values && available
      ? getCardCategoryNumbers(values, available)
      : undefined;
  }, [suppliers?.available, statistics?.probabilityNumbers_2]);

  return statistics ? (
    <Grid container direction="row">
      <Grid
        classes={{
          root: styles.temperatureCardGrid,
        }}
        item xs={4}
        style={{paddingRight: 30}}
      >
        {temperatureScoreData &&
          <div className={`${styles.widget} ${styles.temperatureChart}`}>
            <div className={styles.temperatureChartHeader}>
              <h2>Temperature Score</h2>
              <div className={styles.categoryContainer}>
                {Boolean(temperatureNumbers?.length) && (
                  <h3 className={styles.description}>
                    Number of suppliers by temperature score category
                  </h3>
                )}
                <List>
                  {temperatureNumbers?.map(({ label, percentage }, index) => (
                    <ListItem key={label} className={styles.categoryItem}>
                      <Typography><b>{label}</b></Typography>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        className={clsx(styles.progress, {
                          [styles.progressGreen]: index === 0,
                          [styles.progressOlive]: index === 1,
                          [styles.progressOrange]: index === 2,
                          [styles.progressRed]: index === 3,
                        })}
                      />
                    </ListItem>
                  ))}
                </List>
              </div>
              <Doughnut
                data={temperatureScoreData}
                options={options}
              />
              <div className={styles.doughnutChartDegrees}>
                <div className={styles.left}>1.5°</div>
                <div className={styles.right}>3.2°</div>
              </div>
              <div className={styles.temperature}>
                <h1 className={styles.highlightNumber1}
                    style={{color: `${getColorByTemperature(statistics.temperatureScore, 1)}`}}>
                  {statistics.temperatureScore}°
                </h1>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <TemperatureAlignmentImage temperature={statistics.temperatureScore} />
            </div>
          </div>
        }
      </Grid>
      <Grid xs={8} item>
        <Grid container direction="row">
          <Grid xs={6} item style={{paddingRight: 15}}>
            <VerticalStatCard
              variant="probability"
              title="Probability of"
              subTitle="1.5&deg;"
              category="probability of achieving 1.5&deg;C"
              result={{
                label: `${statistics.probability_1_5}%`,
                value: statistics.probability_1_5,
              }}
              start={{
                label: "0",
                value: 0,
              }}
              end={{
                label: "100",
                value: 100,
              }}
              categoryValues={probabilityNumbers_1_5}
            />
          </Grid>
          <Grid xs={6} item style={{paddingLeft: 15, paddingBottom:15}}>
            <VerticalStatCard
              variant="probability"
              title="Probability of"
              subTitle="2.0&deg;"
              category="probability of achieving 2.0&deg;C"
              result={{
                label: `${statistics?.probability_2}%`,
                value: statistics.probability_2,
              }}
              start={{
                label: "0",
                value: 0,
              }}
              end={{
                label: "100",
                value: 100,
              }}
              categoryValues={probabilityNumbers_2}
            />
          </Grid>
          <Grid xs={12} item>
            <div className={`${styles.chartContainer} ${styles.widget}`}>
              <TabContext value={activeTab}>
                <div className={styles.information}>
                  <h2>Emissions Reduction Transition Pathway</h2>
                  <TabList
                    aria-label="chart tabs"
                    onChange={handleChangeOnTabs}
                    classes={{ root: styles.tabHeader }}
                  >
                    {TABS.map((element, index) => (
                      <Tab
                        label={element.title}
                        value={element.value}
                        key={"tabHeader" + index}
                      />
                    ))}
                  </TabList>
                </div>
                {TABS.map((element, index) => (
                  <TabPanel
                    key={"tabContent" + index}
                    value={element.value}
                    className={styles.tabContent}
                  >
                    <div className={styles.chart}>
                      <Line
                        data={element.value === "supplyChainEmission" ? statistics.supplyChainEmission : statistics.supplierEmission}
                        options={getLineChartOptions()}
                      />
                    </div>
                  </TabPanel>
                ))}
              </TabContext>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : <></>;
};
