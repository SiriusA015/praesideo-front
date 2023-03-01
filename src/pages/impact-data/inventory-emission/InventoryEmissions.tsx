import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Link as MuiLink,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tab,
  Typography,
} from "@material-ui/core";

import { IMPACT_DATA_ROUTE, MONTHS } from "../../../constants";
import { FINANCIAL_YEAR_OPTIONS } from "../../manage-suppliers/SupplyChain/constants";
import ReviewScope1 from "./review-scope-1/ReviewScope1";
import ReviewScope2 from "./review-scope-2/ReviewScope2";
import ReviewScope3 from "./review-scope-3/ReviewScope3";
import Boundary from "./activity-scope-3/Boundary";
import ActivityScope2 from "./activity-scope-2";
import ActivityScope1 from "./activity-scope-1/ActivityScope1";
import EmissionsData from "./emissions-data/EmissionsData";
import OperationalBoundary from "./operational-boundary/OperationalBoundary";
import useInventoryEmissions from "./useInventoryEmissions";
import Overview from "./overview";
import {
  ACTIVITY_SCOPE_1_TABULATION,
  ACTIVITY_SCOPE_2_TABULATION,
  ACTIVITY_SCOPE_3_TABULATION,
  EMISSIONS_EMISSIONS_DATA_TABULATION,
  EMISSIONS_OPERATIONAL_BOUNDARY_TABULATION,
  REVIEW_SCOPE_1_TABULATION,
  EMISSIONS_OVERVIEW_TABULATION,
  REVIEW_TABULATION,
  REVIEW_SCOPE_2_TABULATION,
  ACTIVITY_TABULATION,
  EMISSIONS_TABULATION,
} from "./constants";
import styles from "./styles.module.scss";

interface InventoryEmissionsProps {
  isImpactDataEditable: boolean;
  isDataDemoable?: boolean;
  updateCompletedInformation: () => void;
}

const InventoryEmissions = (props: InventoryEmissionsProps) => {
  const {
    generalBackground,
    activeTab,
    secondActiveTab,
    isMeasureEmission,
    tabConfig,
    allYears,
    yearRepresentationId,
    isFinancialYear,
    isDialogOpen,
    startMonth,
    data,
    authApiModelItem,
    authApiModelItemState,
    percentage,
    onTabChange,
    onSecondTabChange,
    onMeasureEmissionChange,
    onDateChange,
    handlerConfirm,
    setYearRepresentationId,
    setIsFinancialYear,
    setStartMonth,
    setDialogOpen,
  } = useInventoryEmissions();

  const renderSubTabContent = (value: string) => {
    switch (value) {
      case EMISSIONS_EMISSIONS_DATA_TABULATION:
        return (
          <EmissionsData
            isMeasurement={isMeasureEmission}
            isImpactDataEditable={props.isImpactDataEditable}
            isDataDemoable={props.isDataDemoable}
            year={yearRepresentationId}
            data={data}
            updateCompletedInformation={props.updateCompletedInformation}
          />
        );
      case EMISSIONS_OPERATIONAL_BOUNDARY_TABULATION:
        return (
          <OperationalBoundary
            isImpactDataEditable={props.isImpactDataEditable}
            isDataDemoable={props.isDataDemoable}
            updateCompletedInformation={props.updateCompletedInformation}
          />
        );
      case EMISSIONS_OVERVIEW_TABULATION:
        return (
          <>
          {!authApiModelItemState ?(
            <Overview year={yearRepresentationId} changeTab={onSecondTabChange} />)
            :(<div className={styles.invoiceMessage}>
              <Typography>
                {authApiModelItem?.blockMessage}  
              </Typography>
            </div>)}
          </>
        );
      case ACTIVITY_SCOPE_1_TABULATION:
        return (
          <ActivityScope1
            isMeasurement={isMeasureEmission}
            yerRepresentationId={yearRepresentationId}
            isFinancialYear={isFinancialYear}
            startMonth={startMonth}
            data={data}
            isDataDemoable={props.isDataDemoable}
            isImpactDataEditable={props.isImpactDataEditable}
          />
        );
      case ACTIVITY_SCOPE_2_TABULATION:
        return <ActivityScope2
          year={yearRepresentationId}
          isDataDemoable={props.isDataDemoable}
          isImpactDataEditable={props.isImpactDataEditable}
        />;
      case ACTIVITY_SCOPE_3_TABULATION:
        return <Boundary
          isMeasurement={isMeasureEmission}
          yerRepresentationId={yearRepresentationId}
          isFinancialYear={isFinancialYear}
          startMonth={startMonth}
          data={data}
          isDataDemoable={props.isDataDemoable}
          isImpactDataEditable={props.isImpactDataEditable}
        />;
      case REVIEW_SCOPE_1_TABULATION:
        return <ReviewScope1
          data={data}
          isDataDemoable={props.isDataDemoable}
          isImpactDataEditable={props.isImpactDataEditable}
        />;
      case REVIEW_SCOPE_2_TABULATION:
        return <ReviewScope2
          data={data}
          isDataDemoable={props.isDataDemoable}
          isImpactDataEditable={props.isImpactDataEditable}
        />;
      default:
        return <ReviewScope3
        data={data}
        isDataDemoable={props.isDataDemoable}
        isImpactDataEditable={props.isImpactDataEditable}
      />;
    }
  };

  return generalBackground ? (
      generalBackground.countryId ? (
        <>
          <FormControl className={styles.formControl}>
            <FormLabel>What would you like?</FormLabel>
            <RadioGroup
              row
              name="measureEmission"
              value={isMeasureEmission ? "measure" : "enter"}
              onChange={(event, value) => {
                onMeasureEmissionChange(value === "measure");
              }}
            >
              <FormControlLabel
                value="measure"
                control={<Radio />}
                label="Measure your emission"
                disabled={generalBackground.productVariantId === 1 || !props.isImpactDataEditable || props.isDataDemoable}/*Performance Only
                 profile*/
              />
              <FormControlLabel
                value="enter"
                control={<Radio />}
                label="Enter your emission"
                disabled={generalBackground.productVariantId === 3 || !props.isImpactDataEditable || props.isDataDemoable} /*Measurement Only
                 profile*/
              />
            </RadioGroup>
          </FormControl>
          <div className={styles.selectWrapper}>
            <FormControl variant="filled" disabled={!props.isImpactDataEditable}>
              <InputLabel id="year-label">
                {isFinancialYear ? "Financial Year" : "Calendar Year"}
              </InputLabel>
              <Select
                data-tip 
                data-for="registerTip"
                labelId="year-label"
                value={yearRepresentationId}
                label={isFinancialYear ? "Financial Year" : "Calendar Year"}
                disabled = {props.isDataDemoable}
                onChange={(e) => {
                  setYearRepresentationId(Number(e.target.value));
                  onDateChange({
                    yearRepresentationId: Number(e.target.value),
                  });
                  onTabChange(
                    {} as ChangeEvent<{}>,
                    isMeasureEmission ? ACTIVITY_TABULATION : EMISSIONS_TABULATION,
                  );
                }}
              >
                {allYears.map((year) => (
                  <MenuItem
                    key={year.yearRepresentationId}
                    value={year.yearRepresentationId}
                  >
                    {isFinancialYear ? year.financialYear : year.calendarYear}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              color="primary"
              variant="outlined"
              disabled={!props.isImpactDataEditable || props.isDataDemoable}
              onClick={() => setDialogOpen(true)}
            >
              Edit
            </Button>
            <Dialog
              open={isDialogOpen}
              onClose={() => setDialogOpen(false)}
              aria-labelledby="inventory-emission-dialog"
              disablePortal
              className={styles.dialog}
            >
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="filled">
                      <InputLabel id="financial-year-label">
                        Reporting Year
                      </InputLabel>
                      <Select
                        labelId="financial-year-label"
                        label="Reporting Year"
                        disabled = {props.isDataDemoable}
                        defaultValue={isFinancialYear ? 1 : 0}
                        onChange={(e) => {
                          setIsFinancialYear(e.target.value === 1);
                          onDateChange({
                            isFinancialYear: e.target.value === 1,
                          });
                        }}
                      >
                        {FINANCIAL_YEAR_OPTIONS.map(({ label, value }) => (
                          <MenuItem key={value} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    {isFinancialYear && (
                      <>
                        <FormControl fullWidth variant="filled">
                          <InputLabel id="start-month-label">
                            Financial year start month
                          </InputLabel>
                          <Select
                            labelId="start-month-label"
                            label="Financial year start month"
                            defaultValue={startMonth}
                            disabled = {props.isDataDemoable}
                            onChange={(e) => {
                              setStartMonth(e.target.value as number);
                              onDateChange({
                                startMonth: e.target.value as number,
                              });
                            }}
                          >
                            {MONTHS.map(({ text, value }) => (
                              <MenuItem key={value} value={value}>
                                {text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                    )}
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  size="medium"
                  variant="contained"
                  onClick={() => setDialogOpen(false)}
                  color="primary"
                  disabled = {props.isDataDemoable}
                >
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <br></br>
          <TabContext value={activeTab}>
            <AppBar position="static">
              <TabList
                aria-label="inventory emissions tab"
                onChange={onTabChange}
                centered
              >
                {tabConfig.map((tabulation) => (
                  <Tab
                    label={tabulation.label}
                    value={tabulation.value}
                    key={tabulation.value}
                    classes={{ root: styles.tabHeader1 }}
                  />
                ))}
              </TabList>
            </AppBar>
            {tabConfig.map((tabulation) => (
              <TabPanel
                value={tabulation.value}
                key={tabulation.value}
                className={styles.tabContent1}
              >
               
                <TabContext value={secondActiveTab}>
                  <AppBar position="static">
                    <div className={styles.confirmButton}>
                      <TabList
                        aria-label="inventory emissions sub tab"
                        onChange={onSecondTabChange}
                      >
                        {tabulation.subTabs?.map((subTab) => (
                          <Tab
                            label={subTab.label}
                            value={subTab.value}
                            key={subTab.value}
                            classes={{ root: styles.tabHeader2 }}
                          />
                        ))}
                      </TabList>
                      {tabulation.value === REVIEW_TABULATION &&
                        // <Button
                        //   style={{marginLeft: 100}}
                        //   color="primary"
                        //   variant="contained"
                        //   onClick={handlerConfirm}
                        //   disabled={!props.isImpactDataEditable || props.isDataDemoable}
                        // >
                        //   Confirm
                        // </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          className={styles.submit}
                          disabled={!props.isImpactDataEditable || props.isDataDemoable || percentage<100}
                          style={{ marginLeft: 100, background: props.isImpactDataEditable && !props.isDataDemoable &&  percentage>=100? `linear-gradient(90deg, #80bb50 ${percentage}%, #9ec778 ${percentage}%)` : `linear-gradient(90deg, rgb(133 133 133) ${percentage}%, rgb(172 173 172) ${percentage}%)`}}
                          onClick={handlerConfirm}
                          // disabled={!allowSubmit || props.isDataDemoable}
                        >
                          {props.isImpactDataEditable ? <><span className={styles.submitText}>Confirm  &nbsp;&nbsp;</span> {percentage}%</> :
                            "Under Praesideo Review"}
                        </Button>
                      }
                    </div>
                    {tabulation.subTabs?.map((subTab) => (
                      <TabPanel
                        value={subTab.value}
                        key={subTab.value}
                      >
                        {renderSubTabContent(subTab.value)}
                      </TabPanel>
                    ))}
                    {/* {(authApiModelItemState == true && tabulation.value == EMISSIONS_TABULATION)?(
                      <div className={styles.invoiceMessage}>
                        <Typography>
                          {authApiModelItem?.blockMessage}
                        </Typography>
                      </div>
                    ):(
                      <TabList
                        aria-label="inventory emissions sub tab"
                        onChange={onSecondTabChange}
                      >
                        {tabulation.subTabs?.map((subTab) => (
                          <Tab
                            label={subTab.label}
                            value={subTab.value}
                            key={subTab.value}
                            classes={{ root: styles.tabHeader2 }}
                          />
                        ))}
                      </TabList>
                    )} */}
                  </AppBar>
                    
                  {/* {authApiModelItemState && tabulation.value == EMISSIONS_TABULATION?(
                      <></>
                    ) : (
                      <>
                        {tabulation.subTabs?.map((subTab) => (
                          <TabPanel
                            value={subTab.value}
                            key={subTab.value}
                          >
                            {renderSubTabContent(subTab.value)}
                          </TabPanel>
                        ))}
                      </>
                    )
                  } */}
                </TabContext>
              </TabPanel>
            ))}
          </TabContext>
        </>
      ) : (
        <Typography>
          Please enter first your country here in{" "}
          <Link to={IMPACT_DATA_ROUTE}>
            <MuiLink>General Background</MuiLink>
          </Link>
        </Typography>
      )
    ) : null;
};

export default InventoryEmissions;
