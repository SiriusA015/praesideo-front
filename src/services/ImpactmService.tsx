import axios from "axios";
import {
  ImpactmEmissionModel,
  DistanceModel,
  MobileFuelModel,
  StationaryFuelModel, RefrigeratorsModel, ExtinguishersModel, EmployeeCommuteModel, BusinessTravelModel, Scope3CalcModel,
} from "../models/impactm-emission.model";

const ImpactmService = {
  getImpactm: async (yearRepresentationId: number) => {
    let response = await axios.get(
      `private/impactm/get-data?yearRepresentationId=${yearRepresentationId}`,
    );
    return {
      ...response.data,
      dataImpactmScope1FuelCombustion: response.data?.dataImpactmScope1FuelCombustion
        ?.sort((a: StationaryFuelModel, b: StationaryFuelModel) => (a.id > b.id)),
      dataImpactmScope1MobileFuelCombustion: response.data?.dataImpactmScope1MobileFuelCombustion
        ?.sort((a: MobileFuelModel, b: MobileFuelModel) => (a.id > b.id)),
      dataImpactmScope1Distance: response.data?.dataImpactmScope1Distance
        ?.sort((a: DistanceModel, b: DistanceModel) => (a.id > b.id)),
      dataImpactmScope1Refrigerators: response.data?.dataImpactmScope1Refrigerators
        ?.sort((a: RefrigeratorsModel, b: RefrigeratorsModel) => (a.id > b.id)),
      dataImpactmScope1Extinguishers: response.data?.dataImpactmScope1Extinguishers
        ?.sort((a: ExtinguishersModel, b: ExtinguishersModel) => (a.id > b.id)),
    };
  },

  getImpactmCalc: async (yearRepresentationId: number) => {

    let response = await axios.get(
      `private/impactm/get-data?yearRepresentationId=${yearRepresentationId}`,
    );

    const data = response.data;

    let tempBusinessTravel: number = 0;
    let tempEmployeeCommute: number = 0;

    if (data !== undefined && data.dataImpactmScope3BusinessTravel) {
      
      data.dataImpactmScope3BusinessTravel.forEach((item: EmployeeCommuteModel) => {
        tempBusinessTravel = tempBusinessTravel + item.calcTotalDistanceConverted * item.calcTco2;
      });
    }
    
    if (data !== undefined && data.dataImpactmScope3EmployeeCommute) {
      
      data.dataImpactmScope3EmployeeCommute.forEach((item: BusinessTravelModel) => {
        tempEmployeeCommute = tempEmployeeCommute + item.calcTotalDistanceConverted * item.calcTco2;
      });
    }

    const totalScope = tempBusinessTravel + tempEmployeeCommute;
    const result: Scope3CalcModel = {
      scope3BusinessTravel: tempBusinessTravel,
      scope3EmployeeCommute: tempEmployeeCommute,
      scope3Total: totalScope,
      isMeasurement: data.isMeasurement
    }

    return result
  },

  getReviewPercentate: async (yearRepresentationId: number) => {
    let response = await axios.get<number>(
      `private/impactm/get-percentage-completion?yearRepresentationId=${yearRepresentationId}`,
    );
    return response.data
  },
  
  saveImpactm: async (data: ImpactmEmissionModel) => {
    let response = await axios.post(
      "private/impactm/update-data",
      data,
    );
    return response.data;
  },
  finalizeData: async (yearRepresentationId: number) => {
    await axios.post(
      `private/impactm/finalize-data?yearRepresentationId=${yearRepresentationId}`,
    );
  },
  deleteStationaryFuel: async (id: number) => {
    await axios.delete(`private/impactm/delete-stationary-fuel?id=${id}`);
  },
  deleteStationaryEmployeeCommute: async (id: number) => {
    await axios.delete(`private/impactm/delete-employee-commute?id=${id}`);
  },
  deleteStationaryBusinessTravel: async (id: number) => {
    await axios.delete(`private/impactm/delete-business-travel?id=${id}`);
  },
  deleteMobileFuel: async (id: number) => {
    await axios.delete(`private/impactm/delete-mobile-fuel?id=${id}`);
  },
  deleteDistance: async (id: number) => {
    await axios.delete(`private/impactm/delete-distance?id=${id}`);
  },
  deleteRefrigerator: async (id: number) => {
    await axios.delete(`private/impactm/delete-refrigerator?id=${id}`);
  },
  deleteExtinguisher: async (id: number) => {
    await axios.delete(`private/impactm/delete-extinguisher?id=${id}`);
  },
};

export default ImpactmService;
