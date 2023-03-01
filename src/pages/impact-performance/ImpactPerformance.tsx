import styles from "./ImpactPerformance.module.scss";
import {
  Autocomplete,
  TabContext,
  TabList,
  TabPanel,
} from "@material-ui/lab";
import useImpactPerformance from "./useImpactPerformance";
import {
  Button,
  Chip,
  Drawer,
  Tab,
  TextField, Typography,
} from "@material-ui/core";
import { Icon } from "../../components/Icon/Icon";
import { useText } from "../../helpers/hooks/useText";
import {
  IMPACT_DATA_FINALISE_MESSAGE,
  IMPACT_PERFORMANCE_WAITING_MESSAGE,
} from "../../constants/text-key";
import { TABS, TEMPERATURE_ALIGNMENT } from "./constants";
import TemperatureAlignment from "./TemperatureAlignment/TemperatureAlignment";

const ImpactPerformance = () => {
  const {
    data,
    year,
    years,
    activeTab,
    openFilters,
    isDataSetAccepted,
    isDataSetEditable,
    companyName,
    authApiModelItem,
    authApiModelItemState,
    setOpenFilters,
    handleChangeYear,
    handleChangeOnTabs,
  } = useImpactPerformance();

  const { getText } = useText();

  const renderContainer = (key: string) => {
    switch (key) {
      case TEMPERATURE_ALIGNMENT:
        return <TemperatureAlignment data={data} companyName={companyName} />;
    }
  };

  return (
    <div className={styles.container}>
      <TabContext value={activeTab}>
        <div className={styles.headContainer}>
          <h5>IMPACT</h5>
          <div className={styles.headWrapper}>
            <h1>Performance</h1>
            <TabList
              className={styles.tabHeader}
              onChange={handleChangeOnTabs}
            >
              {TABS.map((tab, index) => (
                <Tab
                  key={`tab-${index}`}
                  label={tab.title}
                  value={tab.value}
                />
              ))}
            </TabList>
            <div className={styles.filterContainer}>
              {
                data && data.lastCalculationDate &&
                <h3 className={styles.lastComputed}>
                  Last computed:{" "}
                  <span>
                    {data?.lastCalculationDate
                      ? new Date(data?.lastCalculationDate).toLocaleDateString()
                      : ""}
                  </span>
                </h3>
              }
              {year && year.label && <Chip label={year.label} />}
              <Button
                className={styles.filterButton}
                onClick={() => setOpenFilters(true)}
              >
                <Icon
                  icon="sliders-h"
                  size="lg"
                  className={styles.filterIcon}
                />
              </Button>
              <Drawer
                anchor={"right"}
                open={openFilters}
                onClose={() => setOpenFilters(false)}
              >
                <div className={styles.filterDrawerContainer}>
                  <h2>Filters</h2>
                  <Autocomplete
                    blurOnSelect
                    disableClearable
                    onChange={(event, value) => handleChangeYear(value)}
                    value={year}
                    options={years}
                    getOptionLabel={(option) => option.label || ""}
                    getOptionSelected={(option, value) => {
                      return value.value === option.value;
                    }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          variant="filled"
                          color="secondary"
                          label={"Year"}
                        />
                      );
                    }}
                  />
                </div>
              </Drawer>
            </div>
          </div>
        </div>
          <div className={styles.section}>
            {isDataSetAccepted && !authApiModelItemState?(
              <>
                {
                  TABS.map((tab, index) => (
                    <TabPanel
                      value={tab.value}
                      classes={{ root: styles.panelRoot }}
                    >
                      {renderContainer(tab.value)}
                    </TabPanel>
                  ))}
              </>
            ) : (
              <div className={styles.waitingMessage}>
                <Typography>
                  { authApiModelItemState? authApiModelItem?.blockMessage : isDataSetEditable ? getText(IMPACT_DATA_FINALISE_MESSAGE) : getText(IMPACT_PERFORMANCE_WAITING_MESSAGE)}
                </Typography>
              </div>
            )}
          </div>
      </TabContext>
    </div>
  );
};

export default ImpactPerformance;
