import {
  Box,
  Grid,
  Link,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { LegendPlugin, Sankey } from "../../../../components/Charts";
import ImpactDataService from "../../../../services/ImpactDataService";
import {
  SANKEY_CHART_OPTIONS,
  SCOPE_PIE_CHART_OPTIONS,
  SOURCE_PIE_CHART_OPTIONS,
} from "./constants";
import { OverviewData } from "./models";
import styles from "./styles.module.scss";
import {
  EMISSIONS_EMISSIONS_DATA_TABULATION,
  EMISSIONS_OPERATIONAL_BOUNDARY_TABULATION,
} from "../constants";

type OverviewProps = {
  year: number;
  changeTab: (event: React.ChangeEvent<{}>, value: string) => Promise<void>;
};

const Overview = ({ year, changeTab }: OverviewProps) => {
  const [overview, setOverview] = useState<OverviewData>();
  const [isEmpty, setEmpty] = useState<boolean>();
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    const fetchOverview = async () => {
      const { data, error } = await ImpactDataService.getEmissionOverview(year);
      console.log('this is get-chart-data__________11::', data);
      setOverview(data);
      setEmpty(Boolean(error));
    };

    fetchOverview();
  }, []);

  if (isEmpty === undefined) {
    return null;
  }
  
  return !isEmpty ? (
    <Grid container spacing={3}>
      <Grid xs={6} item>
        <Paper className={styles.section} elevation={0} variant="outlined">
          <Typography align="center" className={styles.sectionTitle}>
            Emission by scope
          </Typography>
          <Box display="flex" alignItems="center" height={48}>
            <Typography className={styles.sectionTitle}>
              Total:
              <span className={styles.totalTitle}>{` ${
                overview?.emissionByScope.total
                  ? overview?.emissionByScope.total
                  : 0
              } tCO2`}</span>
            </Typography>
          </Box>
          {overview?.emissionByScope && (
            <Box>
              <Grid container>
                <Grid item xs={12}>
                  <Pie
                    data={overview.emissionByScope.data}
                    plugins={[ChartDataLabels, LegendPlugin]}
                    options={SCOPE_PIE_CHART_OPTIONS}
                    className={styles.chart}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div id="scope-legend-container" />
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Grid>
      <Grid xs={6} item>
        <Paper className={styles.section} elevation={0} variant="outlined">
          <Typography align="center" className={styles.sectionTitle}>
            Emission by source
          </Typography>
          <Tabs
            variant="fullWidth"
            value={tab}
            onChange={handleChange}
            aria-label="scope tabs"
            className={styles.tabs}
          >
            <Tab className={styles.tab} label="Scope 1" />
            <Tab className={styles.tab} label="Scope 2" />
            <Tab className={styles.tab} label="Scope 3" />
          </Tabs>
          <Box mt="10px">
            {tab === 0 && overview?.emissionBySource && (
              <Grid container>
                <Grid item xs={12}>
                  {overview.emissionBySource.scope1 && (
                    <Pie
                      data={overview.emissionBySource.scope1}
                      plugins={[ChartDataLabels, LegendPlugin]}
                      options={SOURCE_PIE_CHART_OPTIONS}
                      className={styles.chart}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <div id="source-legend-container" />
                </Grid>
              </Grid>
            )}
            {tab === 1 && overview?.emissionBySource && (
              <Grid container>
                <Grid item xs={12}>
                  {overview.emissionBySource.scope2 && (
                    <Pie
                      data={overview.emissionBySource.scope2}
                      plugins={[ChartDataLabels, LegendPlugin]}
                      options={SOURCE_PIE_CHART_OPTIONS}
                      className={styles.chart}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <div id="source-legend-container" />
                </Grid>
              </Grid>
            )}
            {tab === 2 && overview?.emissionBySource && (
              <Grid container>
                <Grid item xs={12}>
                  {overview.emissionBySource.scope3 && (
                    <Pie
                      data={overview.emissionBySource.scope3}
                      plugins={[ChartDataLabels, LegendPlugin]}
                      options={SOURCE_PIE_CHART_OPTIONS}
                      className={styles.chart}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <div id="source-legend-container" />
                </Grid>
              </Grid>
            )}
          </Box>
        </Paper>
      </Grid>
      <Grid xs={12} item>
        <Paper elevation={0} variant="outlined">
          <Box p="20px">
            <Typography align="center" className={styles.sectionTitle}>
              Emission by activity
            </Typography>
            <Grid container className={styles.sankeyLabels}>
              <Grid item xs={6}>
                <Typography>Emission activities</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">Emissions tCO2</Typography>
              </Grid>
            </Grid>
            {overview?.emissionByActivity && (
              <Sankey
                data={overview.emissionByActivity.data}
                options={SANKEY_CHART_OPTIONS}
              />
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  ) : (
    <Typography>
      Please capture first your{" "}
      <Link
        onClick={(e) => {
          changeTab(e, EMISSIONS_OPERATIONAL_BOUNDARY_TABULATION);
        }}
      >
        Operational Boundary
      </Link>{" "}
      and{" "}
      <Link
        onClick={(e) => {
          changeTab(e, EMISSIONS_EMISSIONS_DATA_TABULATION);
        }}
      >
        Emissions
      </Link>
    </Typography>
  );
};

export default Overview;
