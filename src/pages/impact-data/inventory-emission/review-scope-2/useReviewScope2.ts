import {
  ElectricityModel,
  ImpactmEmissionModel,
} from "../../../../models/impactm-emission.model";
import { useEffect, useState } from "react";
import { ReviewScope1Props, TableConfig } from "../review-scope-1/models";
import DropdownService from "../../../../services/DropdownService";
import { ImpactmRefDataModel } from "../../../../models/impactm-ref-data.model";
import { GRID_EMISSION } from "../activity-scope-2/constants";
import { cloneDeep } from "lodash";
import { electricityTableConfig } from "./config";
import GeneralBackgroundService from "../../../../services/GeneralBackgroundService";
import { CompanyFacilityModel } from "../../../../models/general-background.model";
import { CustomTableColumn } from "../../../../components/CustomTable/CustomTable.model";
import ImpactmService from "../../../../services/ImpactmService";


export const useReviewScope2 = (props: ReviewScope1Props) => {
  const [activeConfig, setConfig] = useState<TableConfig>();
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
    const electricityConfig = cloneDeep(electricityTableConfig);

    const gridOptions = impactmRefData?.find((ref: ImpactmRefDataModel) => ref.listValue === GRID_EMISSION);

    addRenderCellFunctions(electricityConfig, gridOptions, facilities);

    setConfig(electricityConfig);
  };


  const addRenderCellFunctions = (config: TableConfig, options: ImpactmRefDataModel, facilities: CompanyFacilityModel[]) => {
    config.tableConfig.forEach((column: CustomTableColumn) => {
      if (column.field === "facilityId") {
        column.renderAllCells = (data: ElectricityModel) => renderFacilityId(facilities, data);
      } else if (column.field === "totalElectricityUnitId") {
        column.renderAllCells = (data: ElectricityModel) => renderTotalElectricityUnitId(options, data);
      } else if (column.field === "totalRenewableUnitId") {
        column.renderAllCells = (data: ElectricityModel) => renderTotalRenewableUnitId(options, data);
      } else if (column.field === "emissionFactorId") {
        column.renderAllCells = (data: ElectricityModel) => renderEmissionFactor(options, data);
      } else if (column.field === "emissionFactorByUser") {
        column.renderAllCells = (data: ElectricityModel) => renderEmissionFactorByUser(options, data);
      }
    });
  };

  const renderFacilityId = (facilities: CompanyFacilityModel[], data: ElectricityModel) => {
    return facilities.find(facility => facility.id === data.facilityId)?.facilityName;
  };

  const renderTotalElectricityUnitId = (options: ImpactmRefDataModel, data: ElectricityModel) => {
    return options.childList[0]?.childList?.find(option => option.listId === data.totalElectricityUnitId)?.listValue || "";
  };

  const renderTotalRenewableUnitId = (options: ImpactmRefDataModel, data: ElectricityModel) => {
    return options.childList[0]?.childList?.find(option => option.listId === data.totalRenewableUnitId)?.listValue || "";
  };

  const renderEmissionFactor = (options: ImpactmRefDataModel, data: ElectricityModel) => {
    if (data.emissionFactorId) {
      const unit = renderTotalElectricityUnitId(options, data);

      if (unit) {
        const factor = data.emissionFactorsList?.find(factor => factor.listId === data.emissionFactorId);

        if (factor?.listValue) {
          return `${factor.listValue} ${factor.listValue2}/${unit}`;
        }
      }
    }

    return "";
  };

  const renderEmissionFactorByUser = (options: ImpactmRefDataModel, data: ElectricityModel) => {
    if (data.emissionFactorByUser) {
      const unit = renderTotalElectricityUnitId(options, data);
      const factor = data.emissionFactorsList?.find(factor => factor.listId === data.emissionFactorId);

      if (unit) {
        return `${data.emissionFactorByUser} ${factor?.listValue2 || "kgCO2"}/${unit}`;
      }
    }
  };

  const onFormSubmit = async (data: ElectricityModel) => {
    if (!defaultData) {
      return;
    }

    const saveData = defaultData?.dataImpactmScope2Electricity?.map((electricity) => {
      if (electricity.id === data.id) {
        return data;
      }

      return electricity;
    });

    setDefaultData(await ImpactmService.saveImpactm({
      ...defaultData,
      dataImpactmScope2Electricity: saveData,
    }));
  };

  return {
    activeConfig,
    defaultData,
    onFormSubmit,
  };
};
