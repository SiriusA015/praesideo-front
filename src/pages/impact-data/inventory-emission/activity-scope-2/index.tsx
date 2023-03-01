import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link, Typography } from "@material-ui/core";

import { ImpactmRefDataModel } from "../../../../models/impactm-ref-data.model";
import { CompanyFacilityModel } from "../../../../models/general-background.model";
import {
  ElectricityModel,
  ImpactmEmissionModel,
} from "../../../../models/impactm-emission.model";
import { IMPACT_DATA_ROUTE } from "../../../../constants";
import GeneralBackgroundService from "../../../../services/GeneralBackgroundService";
import ImpactmService from "../../../../services/ImpactmService";
import DropdownService from "../../../../services/DropdownService";
import { GRID_EMISSION } from "./constants";
import FacilityForm from "./FacilityForm";

type ScopeProps = {
  year: number;
  isImpactDataEditable: boolean;
  isDataDemoable?: boolean;
};

const ActivityScope2 = ({ year, isImpactDataEditable, isDataDemoable }: ScopeProps) => {
  const history = useHistory();
  const [facilities, setFacilities] = useState<CompanyFacilityModel[]>();
  const [unitOptions, setUnitOptions] = useState<ImpactmRefDataModel[]>();
  const [data, setData] = useState<ImpactmEmissionModel>();

  const fetchData = async () => {
    const [{ companyFacilityList }, data, units] = await Promise.all([
      GeneralBackgroundService.getGeneralBackground(),
      ImpactmService.getImpactm(year),
      DropdownService.getImpactmRefData(),
    ]);
    setData(data);
    setFacilities(companyFacilityList);
    setUnitOptions(
      units.find(
        ({ listValue }: ImpactmRefDataModel) => listValue === GRID_EMISSION
      )?.childList?.[0]?.childList
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (facilityData: ElectricityModel) => {
    const filteredElectricity = data?.dataImpactmScope2Electricity?.filter(
      ({ facilityId }) => facilityId !== facilityData.facilityId
    );
    if (data && filteredElectricity) {
      setData(
        await ImpactmService.saveImpactm({
          ...data,
          dataImpactmScope2Electricity: [...filteredElectricity, facilityData],
        })
      );
    }
  };

  const goToBackground = () => {
    history.push(IMPACT_DATA_ROUTE);
  };

  return facilities ? (
    facilities.length > 0 ? (
      <>
        <h3>Electricity purchased</h3>
        {facilities.map((facility) => (
          <FacilityForm
            key={facility.facilityId}
            facility={facility}
            unitOptions={unitOptions}
            dataEmissionId={data?.id as number}
            isDataDemoable={isDataDemoable}
            isDataEditable={isImpactDataEditable}
            data={data?.dataImpactmScope2Electricity?.find(
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
  ) : null;
};

export default ActivityScope2;
