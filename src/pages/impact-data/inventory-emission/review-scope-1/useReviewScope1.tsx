import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Tooltip } from "@material-ui/core";
import { ReviewScope1Props, TableConfig } from "./models";
import DropdownService from "../../../../services/DropdownService";
import { cloneDeep } from "lodash";
import { ImpactmRefDataModel } from "../../../../models/impactm-ref-data.model";
import {
  EXTINGUISHER_UNIT,
  MOBILE_DISTANCE,
  MOBILE_FUEL_COMBUSTION,
  REFRIGERANT_TYPE,
  STATIONARY_FUEL_COMBUSTION,
} from "../activity-scope-1/constants";
import { CustomTableColumn } from "../../../../components/CustomTable/CustomTable.model";
import {
  DistanceModel,
  ExtinguishersModel,
  ImpactmEmissionModel,
  MobileFuelModel,
  RefrigeratorsModel,
  StationaryFuelModel,
} from "../../../../models/impactm-emission.model";
import ImpactmService from "../../../../services/ImpactmService";
import {
  distanceTableConfig,
  extinguishersTableConfig,
  fuelCombustionTableConfig,
  refrigerantTableConfig,
} from "./config";
import styles from "./styles.module.scss";

export const useReviewScope1 = (props: ReviewScope1Props) => {
  const [activeStationaryConfig, setStationaryConfig] = useState<TableConfig>();
  const [activeMobileConfig, setMobileConfig] = useState<TableConfig>();
  const [activeDistanceConfig, setDistanceConfig] = useState<TableConfig>();
  const [activeRefrigerantConfig, setRefrigerantConfig] =
    useState<TableConfig>();
  const [activeExtinguisherConfig, setExtinguisherConfig] =
    useState<TableConfig>();
  const [defaultData, setDefaultData] = useState<ImpactmEmissionModel>();

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    setDefaultData(props.data);
  }, [props.data]);

  const fetch = async () => {
    const impactmRefData = await DropdownService.getImpactmRefData();
    const stationaryConfig = cloneDeep(fuelCombustionTableConfig);
    const mobileConfig = cloneDeep(fuelCombustionTableConfig);
    const distanceConfig = cloneDeep(distanceTableConfig);
    const refrigerantConfig = cloneDeep(refrigerantTableConfig);
    const extinguisherConfig = cloneDeep(extinguishersTableConfig);

    const stationaryFuelCombustionOptions = impactmRefData?.find(
      (ref: ImpactmRefDataModel) => ref.listValue === STATIONARY_FUEL_COMBUSTION,
    );

    const mobileFuelCombustionOptions = impactmRefData?.find(
      (ref: ImpactmRefDataModel) => ref.listValue === MOBILE_FUEL_COMBUSTION,
    );

    const distanceOptions = impactmRefData?.find(
      (ref: ImpactmRefDataModel) => ref.listValue === MOBILE_DISTANCE,
    );

    const refrigerantTypeOptions = impactmRefData?.find(
      (ref: ImpactmRefDataModel) => ref.listValue === REFRIGERANT_TYPE,
    );

    const extinguisherUnitOptions = impactmRefData?.find(
      (ref: ImpactmRefDataModel) => ref.listValue === EXTINGUISHER_UNIT,
    );

    addRenderCellFunctions(stationaryConfig, stationaryFuelCombustionOptions);
    addRenderCellFunctions(mobileConfig, mobileFuelCombustionOptions);
    addRenderCellFunctions(distanceConfig, distanceOptions);
    addRenderCellFunctions(refrigerantConfig, refrigerantTypeOptions);
    addRenderCellFunctions(extinguisherConfig, extinguisherUnitOptions);

    setStationaryConfig(stationaryConfig);
    setMobileConfig(mobileConfig);
    setDistanceConfig(distanceConfig);
    setRefrigerantConfig(refrigerantConfig);
    setExtinguisherConfig(extinguisherConfig);
  };

  const addRenderCellFunctions = (
    config: TableConfig,
    options: ImpactmRefDataModel,
  ) => {
    config.tableConfig.forEach((column: CustomTableColumn) => {
      column.renderAllCells = getRenderCellFunction(column.field, options);
    });
  };

  const getRenderCellFunction = (
    field: string,
    options: ImpactmRefDataModel,
  ) => {
    switch (field) {
      case "fuelTypeId":
        return (data: StationaryFuelModel) => renderFuelType(options, data);
      case "fuelUnitId":
        return (data: StationaryFuelModel) => renderFuelUnit(options, data);
      case "emissionFactorId":
        return (data: StationaryFuelModel) =>
          renderEmissionFactor(options, data);
      case "emissionFactorByUser":
        return (data: StationaryFuelModel) =>
          renderEmissionFactorByUser(options, data);
      case "vehicleTypeId":
        return (data: DistanceModel) => renderVehicleTypeId(options, data);
      case "distanceUnitId":
        return (data: DistanceModel) => renderDistanceUnit(options, data);
      case "referigerantTypeId":
        return (data: RefrigeratorsModel) =>
          renderReferigerantTypeId(options, data);
      case "topupUnitId":
        return (data: RefrigeratorsModel) => renderTopupUnitId(options, data);
    }
  };

  const renderReferigerantTypeId = (
    options: ImpactmRefDataModel,
    data: RefrigeratorsModel,
  ) => {
    return (
      options.childList?.find(
        (option) => option.listId === data.referigerantTypeId,
      )?.listValue || ""
    );
  };

  const renderTopupUnitId = (
    options: ImpactmRefDataModel,
    data: RefrigeratorsModel | ExtinguishersModel,
  ) => {
    if ("referigerantTypeId" in data) {
      return (
        options.childList
          ?.find((option) => option.listId === data.referigerantTypeId)
          ?.childList.find((option) => option.listId === data.topupUnitId)
          ?.listValue || ""
      );
    } else {
      return (
        options.childList[0]?.childList.find(
          (option) => option.listId === data.topupUnitId,
        )?.listValue || ""
      );
    }
  };

  const renderFuelType = (
    options: ImpactmRefDataModel,
    data: StationaryFuelModel | MobileFuelModel,
  ) => {
    return (
      options.childList?.find((option) => option.listId === data.fuelTypeId)
        ?.listValue || ""
    );
  };

  const renderFuelUnit = (
    options: ImpactmRefDataModel,
    data: StationaryFuelModel | MobileFuelModel,
  ) => {
    return (
      options.childList
        ?.find((option) => option.listId === data.fuelTypeId)
        ?.childList.find((option) => option.listId === data.fuelUnitId)
        ?.listValue || ""
    );
  };

  const renderVehicleTypeId = (
    options: ImpactmRefDataModel,
    data: DistanceModel,
  ) => {
    return (
      options.childList
        ?.find((options) => options.listId === data.vehicleCategoryId)
        ?.childList.find((option) => option.listId === data.vehicleTypeId)
        ?.listValue || ""
    );
  };

  const renderDistanceUnit = (
    options: ImpactmRefDataModel,
    data: DistanceModel,
  ) => {
    return (
      options.childList
        ?.find((options) => options.listId === data.vehicleCategoryId)
        ?.childList.find((option) => option.listId === data.vehicleTypeId)
        ?.childList.find((option) => option.listId === data.distanceUnitId)
        ?.listValue || ""
    );
  };

  const renderEmissionFactor = (
    options: ImpactmRefDataModel,
    data:
      | StationaryFuelModel
      | MobileFuelModel
      | DistanceModel
      | ExtinguishersModel
      | RefrigeratorsModel,
  ) => {
    if (data.emissionFactorId) {
      const unit = getUnit(options, data);

      if (unit) {
        const factor = data.emissionFactorsList?.find(
          (factor) => factor.listId === data.emissionFactorId,
        );

        if (factor?.listValue) {
          return (
            <div className={styles.tooltipContainer}>
              {`${factor?.listValue} ${factor?.listValue2}/${unit}`}
              <Tooltip
                title={factor.listKey ? `Source: ${factor.listKey}` : ""}
                aria-label={factor.listKey ? `Source: ${factor.listKey}` : ""}
              >
                <IconButton>
                  <FontAwesomeIcon icon={["fas", "search"]} size="xs" />
                </IconButton>
              </Tooltip>
            </div>
          );
        }
      }
    }

    return "";
  };

  const renderEmissionFactorByUser = (
    options: ImpactmRefDataModel,
    data:
      | StationaryFuelModel
      | MobileFuelModel
      | DistanceModel
      | ExtinguishersModel
      | RefrigeratorsModel,
  ) => {
    if (data.emissionFactorByUser) {
      const unit = getUnit(options, data);

      const factor = data.emissionFactorsList?.find(
        (factor) => factor.listId === data.emissionFactorId,
      );

      if (unit) {
        return (
          <div className={styles.tooltipContainer}>
            {`${data.emissionFactorByUser} ${factor?.listValue2 || "kgCO2"}/${unit}`}
            <Tooltip
              title="Source: you"
              aria-label="Source: you"
            >
              <IconButton>
                <FontAwesomeIcon icon={["fas", "search"]} size="xs" />
              </IconButton>
            </Tooltip>
          </div>
        );
      }
    }
  };

  const getUnit = (
    options: ImpactmRefDataModel,
    data:
      | StationaryFuelModel
      | MobileFuelModel
      | DistanceModel
      | ExtinguishersModel
      | RefrigeratorsModel,
  ) => {
    if ("distanceUnitId" in data) {
      return renderDistanceUnit(options, data);
    }
    if ("fuelTypeId" in data) {
      return renderFuelUnit(options, data);
    } else {
      return renderTopupUnitId(options, data);
    }
  };

  const onStationaryFuelFormSubmit = async (data: StationaryFuelModel) => {
    if (!defaultData) {
      return;
    }

    const saveData = defaultData?.dataImpactmScope1FuelCombustion?.map((stationary) => {
      if (stationary.id === data.id) {
        return {
          ...data,
          emissionFactorByUser: (data.emissionFactorByUser as any) !== "" ? data.emissionFactorByUser : null,
        };
      }

      return stationary;
    });

    setDefaultData(await ImpactmService.saveImpactm({
      ...defaultData,
      dataImpactmScope1FuelCombustion: saveData as StationaryFuelModel[],
    }));
  };

  const onMobileFuelFormSubmit = async (data: MobileFuelModel) => {
    if (!defaultData) {
      return;
    }

    const saveData = defaultData?.dataImpactmScope1MobileFuelCombustion?.map(
      (mobile) => {
        if (mobile.id === data.id) {
          return data;
        }

        return mobile;
      },
    );

    setDefaultData(
      await ImpactmService.saveImpactm({
        ...defaultData,
        dataImpactmScope1MobileFuelCombustion: saveData,
      }),
    );
  };

  const onDistanceFormSubmit = async (data: DistanceModel) => {
    if (!defaultData) {
      return;
    }

    const saveData = defaultData?.dataImpactmScope1Distance?.map((distance) => {
      if (distance.id === data.id) {
        return data;
      }

      return distance;
    });

    setDefaultData(
      await ImpactmService.saveImpactm({
        ...defaultData,
        dataImpactmScope1Distance: saveData,
      }),
    );
  };

  const onRefrigerantFormSubmit = async (data: RefrigeratorsModel) => {
    if (!defaultData) {
      return;
    }

    const saveData = defaultData?.dataImpactmScope1Refrigerators?.map(
      (refrigerators) => {
        if (refrigerators.id === data.id) {
          return data;
        }

        return refrigerators;
      },
    );

    setDefaultData(
      await ImpactmService.saveImpactm({
        ...defaultData,
        dataImpactmScope1Refrigerators: saveData,
      }),
    );
  };

  const onExtinguisherFormSubmit = async (data: ExtinguishersModel) => {
    if (!defaultData) {
      return;
    }

    const saveData = defaultData?.dataImpactmScope1Extinguishers?.map((ext) => {
      if (ext.id === data.id) {
        return data;
      }

      return ext;
    });

    setDefaultData(
      await ImpactmService.saveImpactm({
        ...defaultData,
        dataImpactmScope1Extinguishers: saveData,
      }),
    );
  };

  return {
    activeStationaryConfig,
    activeMobileConfig,
    activeDistanceConfig,
    activeRefrigerantConfig,
    activeExtinguisherConfig,
    defaultData,
    onStationaryFuelFormSubmit,
    onMobileFuelFormSubmit,
    onDistanceFormSubmit,
    onRefrigerantFormSubmit,
    onExtinguisherFormSubmit,
  };
};
