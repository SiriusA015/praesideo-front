import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import CustomForm from "../../../../components/CustomForm/CustomForm";
import { useAuth } from "../../../../helpers/useAuth";
import { useHistory } from "react-router-dom";
import { useBoundary } from "./useBoundary";
import styles from "./styles.module.scss";
import { TabData } from "../models";
import { useEffect, useState, useRef } from "react";
import { IconButton } from "@material-ui/core";
import { Icon } from "../../../../components/Icon/Icon";
import FacilityForm from "./FacilityForm";
import TravelFacilityForm from "./TravelFacilityForm";
import { Link, Typography } from "@material-ui/core";
import { IMPACT_DATA_ROUTE } from "../../../../constants";
import { EmployeeCommuteModel } from "../../../../models/impactm-emission.model";

const Boundary = (props: TabData) => {
  const history = useHistory();
  const { isImpactPerformanceAvailable } = useAuth();
  const { activeConfig, formDefaultValues, isEmployeeCommute, facilities, isEmployeeCommuteCompleteData, isEmployeeCommutePartialData, isEmployeeCommuteApproximateData, isBusinessTravel,
    isBusinessTravelCompleteData, isBusinessTravelPartialData,
    activeTravelPrimaryConfig, activeTravelPartialConfig, activeEmployeePrimaryConfig, activeEmployeePartialConfig, activeEmployeeApproximativeConfig, defaultValue, 
    onSubmit, onFormSubmit, onEmployeeCommute, onBusinessTravel} =
    useBoundary(props);

  const [open, setOpen] = useState(false);
  const [openTravel, setOpenTravel] = useState(false);
  const [employeeCommuteOpen, setEmployeeCommuteOpen] = useState(false);
  const [businessTravelOpen, setBusinessTravelOpen] = useState(false);
  
  useEffect(() => {
    formDefaultValues?.operationalBoundary.map((item:number)=>{
      if (item===16){
        setEmployeeCommuteOpen(true);
      }
      if (item===15){
        setBusinessTravelOpen(true);
      }
    })
  }, [formDefaultValues, defaultValue]);

  const handleSubmit = async (value: any) => {
    setEmployeeCommuteOpen(false);
    setBusinessTravelOpen(false);
    value?.operationalBoundary.map((item: number)=>{
      if (item === 16){
        setEmployeeCommuteOpen(true);
      }
      if (item === 15){
        setBusinessTravelOpen(true);
      }
    })
    await onFormSubmit(value);
  };

  const onFacilityValue = async (data: EmployeeCommuteModel[], facilityId: any) => {
    defaultValue?.dataImpactmScope3EmployeeCommute?.map((item:EmployeeCommuteModel)=>{
      if (item?.facilityId === facilityId) {
        data.push(item);
      }
    })
  }

  const goToBackground = () => {
    history.push(IMPACT_DATA_ROUTE);
  };

  if (activeConfig) {
    return (
      <>
        <CustomForm
          config={activeConfig.formConfig}
          onSubmit={handleSubmit}
          isDataDemoable={props.isDataDemoable}
          isDataEditable={
            isImpactPerformanceAvailable ? props.isImpactDataEditable : false
          }
          data={formDefaultValues}
          submitOnBlur
        />

{/*   Employee commuting */}
      {employeeCommuteOpen?(
        <>
          <p className={styles.fieldLabel}>   
            <div onClick={() => setOpen(!open)} style={{cursor:"pointer", width:"fit-content"}}>
              <IconButton
                aria-label="expand row"
                size="small"
                style={{marginRight: 10}}
              >
                {open ? (
                    <Icon icon="chevron-up" className={styles.icon} color="grey" />
                  ) : (
                    <Icon icon="chevron-down" className={styles.icon} color="grey" />
                  )}
              </IconButton>
              Employee commuting
            </div>
          </p>
          {open?(
            <>
              <FormControl className={styles.formControl}>
                <FormLabel>How would you like capturing employee commute data ?</FormLabel>
                <RadioGroup
                  row
                  name="isEmployeeCommute"
                  value={isEmployeeCommute}
                  onChange={(event, value) => onEmployeeCommute(value)}
                >
                  <FormControlLabel value="primary" control={<Radio />} label="I have complete primary data" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
                  <FormControlLabel value="partial" control={<Radio />} label="I have partial data" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
                  <FormControlLabel value="approximative" control={<Radio />} label="I need approximative method" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
                </RadioGroup>
              </FormControl>

              {facilities ? (
                facilities.length > 0 ? (
                    <>
                      {facilities.map((facility) => (
                        <FacilityForm
                          facility={facility}
                          onSubmit={onSubmit}
                          isEmployeeCommuteCompleteData={isEmployeeCommuteCompleteData}
                          isEmployeeCommutePartialData={isEmployeeCommutePartialData}
                          isEmployeeCommuteApproximateData={isEmployeeCommuteApproximateData}
                          activeEmployeePrimaryConfig={activeEmployeePrimaryConfig}
                          activeEmployeePartialConfig={activeEmployeePartialConfig}
                          activeEmployeeApproximativeConfig={activeEmployeeApproximativeConfig}
                          dataEmissionId={defaultValue?.id as number}
                          isDataDemoable={props.isDataDemoable}
                          isDataEditable={props.isImpactDataEditable}
                          data={defaultValue?.dataImpactmScope3EmployeeCommute?.filter(
                            ({ facilityId }) => facilityId === facility.facilityId
                          )}
                          onUpdate={handleSubmit}
                        />
                      ))}
                    </>
                  ) : (
                    <Typography>
                      Please enter first your facilities in{" "}
                      <Link onClick={goToBackground}>Background section</Link>
                    </Typography>
                  )
                ) : null}
            </>
          ):(<></>)}
        </>):(<></>)}

{/*  Business Travel */}
      {businessTravelOpen?(
        <>
          <p className={styles.fieldLabel} style={{marginTop: 30}}>   
              <div onClick={() => setOpenTravel(!openTravel)} style={{cursor:"pointer", width:"fit-content"}}>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  style={{marginRight: 10}}
                >
                  {openTravel ? (
                      <Icon icon="chevron-up" className={styles.icon} color="grey" />
                    ) : (
                      <Icon icon="chevron-down" className={styles.icon} color="grey" />
                    )}
                </IconButton>
                Business Travel
              </div>
            </p>
            {openTravel?(
              <>
                <FormControl className={styles.formControl}>
                  <FormLabel>How would you like capturing business travel data ?</FormLabel>
                  <RadioGroup
                    row
                    name="isBusinessTravel"
                    value={isBusinessTravel}
                    onChange={(event, value) => onBusinessTravel(value)}
                  >
                    <FormControlLabel value="primary" control={<Radio />} label="I have complete primary data" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
                    <FormControlLabel value="partial" control={<Radio />} label="I have partial data" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
                  </RadioGroup>
                </FormControl>

                {facilities ? (
                  facilities.length > 0 ? (
                    <>
                      {facilities.map((facility) => (
                        <TravelFacilityForm
                          facility={facility}
                          onSubmit={onSubmit}
                          isBusinessTravelCompleteData={isBusinessTravelCompleteData}
                          isBusinessTravelPartialData={isBusinessTravelPartialData}
                          activeTravelPrimaryConfig={activeTravelPrimaryConfig}
                          activeTravelPartialConfig={activeTravelPartialConfig}
                          dataEmissionId={defaultValue?.id as number}
                          isDataDemoable={props.isDataDemoable}
                          isDataEditable={props.isImpactDataEditable}
                          data={defaultValue?.dataImpactmScope3BusinessTravel?.filter(
                            ({ facilityId }) => facilityId === facility.facilityId
                          )}
                          onUpdate={handleSubmit}
                        />
                      ))}
                    </>
                  ) : (
                    <Typography>
                      Please enter first your facilities in{" "}
                      <Link onClick={goToBackground}>Background section</Link>
                    </Typography>
                  )
                ) : null}
            </>):(<></>)}
        </>):(<></>)}
      </>
    );
  } else {
    return <></>;
  }
};

export default Boundary;
