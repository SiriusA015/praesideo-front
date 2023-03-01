import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@material-ui/core";
import { useActivityScope1 } from "./useActivityScope1";
import CustomForm from "../../../../components/CustomForm/CustomForm";
import { TabData } from "../models";
import styles from "./styles.module.scss";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../../helpers/useAuth";
import { useHistory } from "react-router-dom";

const ActivityScope1 = (props: TabData) => {
  const history = useHistory();
  const { isImpactPerformanceAvailable } = useAuth();
  const {
    isStationaryCombustion, activeConfig, formDefaultValues, isMobileCombustion, isRefrigerators, isFireExtinguisher,
    activeStationaryConfig, activeMobileConfig, activeDistanceConfig, activeRefrigeratorConfig, activeExtinguisherConfig
    , defaultValue, onSubmit, onFormSubmit, setStationaryCombustion, setMobileCombustion, setRefrigerators, setFireExtinguisher,
  } = useActivityScope1(props);

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

  if (activeStationaryConfig && activeMobileConfig && activeRefrigeratorConfig && activeExtinguisherConfig) {
    return (
      <>
        <CustomForm
          config={activeConfig?.formConfig}
          onSubmit={handleSubmit}
          isDataDemoable={props.isDataDemoable}
          isDataEditable={
            isImpactPerformanceAvailable ? props.isImpactDataEditable : false
          }
          data={formDefaultValues}
          submitOnBlur
        />
        <FormControl className={styles.formControl}>
          <FormLabel>Is there stationary fuel combustion?</FormLabel>
          <RadioGroup
            row
            name="isStationaryFuel"
            value={isStationaryCombustion ? "yes" : "no"}
            onChange={(event, value) => setStationaryCombustion(value === "yes")}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
            <FormControlLabel value="no" control={<Radio />} label="No" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
          </RadioGroup>
        </FormControl>
        {
          isStationaryCombustion ?
            <CustomForm
              config={activeStationaryConfig}
              isDataDemoable={props.isDataDemoable}
              isDataEditable={props.isImpactDataEditable}
              onSubmit={onSubmit}
              data={defaultValue}
              submitOnBlur
            /> : <></>
        }
        <FormControl className={styles.formControl}>
          <FormLabel>Is there mobile fuel combustion?</FormLabel>
          <RadioGroup
            row
            name="isMobileFuel"
            value={isMobileCombustion ? "yes" : "no"}
            onChange={(event, value) => setMobileCombustion(value === "yes")}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
            <FormControlLabel value="no" control={<Radio />} label="No" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
          </RadioGroup>
        </FormControl>
        {
          isMobileCombustion ?
            <CustomForm
              config={activeMobileConfig}
              isDataDemoable={props.isDataDemoable}
              isDataEditable={props.isImpactDataEditable}
              onSubmit={onSubmit}
              data={defaultValue}
              submitOnBlur
            /> : <></>
        }
        <br />
        <FormControl>
          {
            isMobileCombustion ?
              <FormLabel>Distance Travelled?</FormLabel> : <></>
          }
        </FormControl>
        {
          isMobileCombustion ?
            <CustomForm
              config={activeDistanceConfig}
              isDataEditable={props.isImpactDataEditable}
              isDataDemoable={props.isDataDemoable}
              onSubmit={onSubmit}
              data={defaultValue}
              submitOnBlur
            /> : <></>
        }
        <FormControl className={styles.formControl}>
          <FormLabel>Are there refrigerators or chillers with in your premises?</FormLabel>
          <RadioGroup
            row
            name="isRefrigerator"
            value={isRefrigerators ? "yes" : "no"}
            onChange={(event, value) => setRefrigerators(value === "yes")}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
            <FormControlLabel value="no" control={<Radio />} label="No" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
          </RadioGroup>
        </FormControl>
        {
          isRefrigerators ?
            <CustomForm
              config={activeRefrigeratorConfig}
              isDataEditable={props.isImpactDataEditable}
              isDataDemoable={props.isDataDemoable}
              onSubmit={onSubmit}
              data={defaultValue}
              submitOnBlur
            /> : <></>
        }
        <FormControl className={styles.formControl}>
          <FormLabel>Are there any CO2 type fire extinguishers within your premises?</FormLabel>
          <RadioGroup
            row
            name="isExtinguisher"
            value={isFireExtinguisher ? "yes" : "no"}
            onChange={(event, value) => setFireExtinguisher(value === "yes")}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
            <FormControlLabel value="no" control={<Radio />} label="No" disabled={!props.isImpactDataEditable || props.isDataDemoable}/>
          </RadioGroup>
        </FormControl>
        {
          isFireExtinguisher ?
            <CustomForm
              config={activeExtinguisherConfig}
              isDataEditable={props.isImpactDataEditable}
              isDataDemoable={props.isDataDemoable}
              onSubmit={onSubmit}
              data={defaultValue}
              submitOnBlur
            /> : <></>
        }
      </>
    );
  } else {
    return <></>;
  }
};


export default ActivityScope1;
