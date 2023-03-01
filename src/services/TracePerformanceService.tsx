import axios from "axios";

import {
  COLOR, getColorByTemperature,
  PERFORMANCE_AVAILABLE_SUPPLIERS_ENDPOINT,
  PERFORMANCE_TEMPERATURE_ALIGNMENT_ENDPOINT,
} from "../constants";
import { errorHandler } from "../helpers/errorHandler";
import { ServiceResponseType } from "../models/Api.model";
import { YearType } from "../models/DateTypes";
import { AvailableNumberType } from "../pages/trace-performance/models";
import { TemperatureAlignmentStat } from "../pages/trace-performance/TemperatureAlignment/models";

const TracePerformanceService = {
  getAvailableSuppliers: async (year: number): Promise<ServiceResponseType<AvailableNumberType>> => {
    try {
      const { data } = await axios.get(
        `${PERFORMANCE_AVAILABLE_SUPPLIERS_ENDPOINT}?year=${year}`,
      );
      return { data };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getTemperatureAlignment: async (
    selectedYear: YearType,
  ): Promise<ServiceResponseType<TemperatureAlignmentStat>> => {
    try {
      const { data } = await axios.get<TemperatureAlignmentStat>(
        `${PERFORMANCE_TEMPERATURE_ALIGNMENT_ENDPOINT}?year=${selectedYear.value}`,
      );

      if (!data) {
        return { data };
      }

      const chartOptionsForSupplyChainEmission = [
        {
          borderColor: getColorByTemperature(data.temperatureScore, 1),
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }

            const colorValue = getColorByTemperature(data.temperatureScore, 0.7);
            const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
            gradient.addColorStop(0, "#ffffff");
            gradient.addColorStop(1, colorValue);

            return gradient;
          },
          fill: true,
        },
        {
          borderColor: COLOR.hippieGreen,
        },
        {
          borderColor: COLOR.fireOpal,
        },
      ];

      const chartOptionsForSupplierEmission = {
        borderColor: getColorByTemperature(data.temperatureScore, 1),
      };

      return {
        data: {
          ...data,
          supplyChainEmission: {
            ...data.supplyChainEmission,
            datasets: data.supplyChainEmission.datasets.map(
              (dataset, index) => ({
                ...dataset,
                ...chartOptionsForSupplyChainEmission[index],
              }),
            ).reverse(),
          },
          supplierEmission: {
            ...data.supplierEmission,
            datasets: data.supplierEmission.datasets.filter((data: any) => data && !data.label.includes("1.5") && !data.label.includes("2.0"))
              .map((dataset, index) => ({
                ...dataset,
                ...chartOptionsForSupplierEmission,
              })),
          },
        },
      };
    } catch
      (e: unknown) {
      return errorHandler(e);
    }
  }
  ,
};

export default TracePerformanceService;
