import {
  EmployeeCommuteModel,
  BusinessTravelModel,
  ImpactmEmissionModel,
} from "../../../../models/impactm-emission.model";
import { useEffect, useState } from "react";
import { ReviewScope3Props, TableConfig } from "../review-scope-3/models";
import DropdownService from "../../../../services/DropdownService";
import { ImpactmRefDataModel } from "../../../../models/impactm-ref-data.model";
import { EMPLOYEE_COMMUTE, BUSINESS_TRAVEL } from "../activity-scope-3/constants";
import { cloneDeep } from "lodash";
import { employeeCommuteTableConfig, businessTravelTableConfig } from "./config";
import GeneralBackgroundService from "../../../../services/GeneralBackgroundService";
import { CompanyFacilityModel } from "../../../../models/general-background.model";
import { CustomTableColumn } from "../../../../components/CustomTable/CustomTable.model";
import ImpactmService from "../../../../services/ImpactmService";


export const useReviewScope3 = (props: ReviewScope3Props) => {
  const [activeEmployeeCommuteConfig, setEmployeeCommuteConfig] = useState<TableConfig>();
  const [activeBusinessTravelConfig, setBusinessTravelConfig] = useState<TableConfig>();
  const [defaultData, setDefaultData] = useState<ImpactmEmissionModel>();

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    setDefaultData(props.data);
  }, [props.data]);

  const fetch = async () => {
    const impactmRefData = await DropdownService.getImpactmRefData();
    const facilities = (await GeneralBackgroundService.getGeneralBackground())?.companyFacilityList;
    const employeeCommuteConfig = cloneDeep(employeeCommuteTableConfig);
    const businessTravelConfig = cloneDeep(businessTravelTableConfig);

    const employeeCommute = impactmRefData
    ?.find((ref: ImpactmRefDataModel) => ref.listValue === EMPLOYEE_COMMUTE);

    const businessTravel = impactmRefData
    ?.find((ref: ImpactmRefDataModel) => ref.listValue === BUSINESS_TRAVEL);

    addEmployeeCommuteRenderCellFunctions(employeeCommuteConfig, employeeCommute, facilities);
    addEmployeeCommuteRenderCellFunctions(businessTravelConfig, businessTravel, facilities);

    setEmployeeCommuteConfig(employeeCommuteConfig);
    setBusinessTravelConfig(businessTravelConfig);
  };


  const addEmployeeCommuteRenderCellFunctions = (config: TableConfig, options: ImpactmRefDataModel, facilities: CompanyFacilityModel[]) => {
    config.tableConfig.forEach((column: CustomTableColumn) => {
      if (column.field === "facilityId") {
        column.renderAllCells = (data: EmployeeCommuteModel) => renderFacilityId(facilities, data);
      } else if (column.field === "distanceUnitId") {
        column.renderAllCells = (data: EmployeeCommuteModel) => renderDistanceUnitId(options, data);
      } else if (column.field === "emissionFactorId") {
        column.renderAllCells = (data: EmployeeCommuteModel) => renderEmissionFactor(options, data);
      } else if (column.field === "emissionFactorByUser") {
        column.renderAllCells = (data: EmployeeCommuteModel) => renderEmissionFactorByUser(options, data);
      } else if (column.field === "transportationModeId") {
        column.renderAllCells = (data: BusinessTravelModel) => renderTransportationModeId(options, data);
      }
    });
  };

  const addBusinessTravelRenderCellFunctions = (config: TableConfig, options: ImpactmRefDataModel, facilities: CompanyFacilityModel[]) => {
    config.tableConfig.forEach((column: CustomTableColumn) => {
      if (column.field === "facilityId") {
        column.renderAllCells = (data: BusinessTravelModel) => renderFacilityId(facilities, data);
      } else if (column.field === "distanceUnitId") {
        column.renderAllCells = (data: BusinessTravelModel) => renderDistanceUnitId(options, data);
      } else if (column.field === "emissionFactorId") {
        column.renderAllCells = (data: BusinessTravelModel) => renderEmissionFactor(options, data);
      } else if (column.field === "emissionFactorByUser") {
        column.renderAllCells = (data: BusinessTravelModel) => renderEmissionFactorByUser(options, data);
      } else if (column.field === "transportationModeId") {
        column.renderAllCells = (data: BusinessTravelModel) => renderTransportationModeId(options, data);
      }
    });
  };

  const renderFacilityId = (facilities: CompanyFacilityModel[], data: EmployeeCommuteModel) => {
    return facilities.find(facility => facility.id === data.facilityId)?.facilityName;
  };

  const renderDistanceUnitId = (options: ImpactmRefDataModel, data: EmployeeCommuteModel) => {
    return options.childList?.find(option => option.listId === data.transportationModeId)?.childList?.find(option => option.listId === data.distanceUnitId)?.listValue || "";
  };

  const renderTransportationModeId = (options: ImpactmRefDataModel, data: EmployeeCommuteModel) => {
    return options.childList?.find(option => option.listId === data.transportationModeId)?.listValue || "";
  };

  const renderEmissionFactor = (options: ImpactmRefDataModel, data: EmployeeCommuteModel) => {
    if (data.emissionFactorId) {
      const unit = renderDistanceUnitId(options, data);

      if (unit) {
        const factor = data.emissionFactorsList?.find(factor => factor.listId === data.emissionFactorId);

        if (factor?.listValue) {
          return `${factor.listValue} ${factor.listValue2}/${unit}`;
        }
      }
    }

    return "";
  };

  const renderEmissionFactorByUser = (options: ImpactmRefDataModel, data: EmployeeCommuteModel) => {
    if (data.emissionFactorByUser) {
      const unit = renderDistanceUnitId(options, data);
      const factor = data.emissionFactorsList?.find(factor => factor.listId === data.emissionFactorId);

      if (unit) {
        return `${data.emissionFactorByUser} ${factor?.listValue2 || "kgCO2"}/${unit}`;
      }
    }
  };

  const onFormSubmit = async (data: EmployeeCommuteModel) => {
    if (!defaultData) {
      return;
    }

    const saveData = defaultData?.dataImpactmScope3EmployeeCommute?.map((employeeCommute) => {
      if (employeeCommute.id === data.id) {
        return data;
      }

      return employeeCommute;
    });

    setDefaultData(await ImpactmService.saveImpactm({
      ...defaultData,
      dataImpactmScope3EmployeeCommute: saveData,
    }));
  };

  return {
    activeEmployeeCommuteConfig,
    activeBusinessTravelConfig,
    defaultData,
    onFormSubmit,
  };
};
