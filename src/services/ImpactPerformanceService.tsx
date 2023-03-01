import axios from "axios";

const ImpactPerformanceService = {
  getTemperatureAlignment: async (organisationId: number, year: number) => {
    let response = await axios.get(
      `impactperformance?organisationId=${organisationId}&year=${year}`
    );
    let data = response.data;

    let overallData =
      data?.transitionPathway?.find(
        (d: { scope: string }) => d.scope === "scope1-2-3"
      ) || {};
    let scope1Data =
      data?.transitionPathway?.find(
        (d: { scope: string }) => d.scope === "scope1"
      ) || {};
    let scope2Data =
      data?.transitionPathway?.find(
        (d: { scope: string }) => d.scope === "scope2"
      ) || {};
    let scope3Data =
      data?.transitionPathway?.find(
        (d: { scope: string }) => d.scope === "scope3"
      ) || {};
    let overallScore =
      data?.impactPerformance?.find(
        (d: { performancePillar: string }) =>
          d.performancePillar === "OverallScore"
      ) || {};
    let probability15 =
      data?.impactPerformance?.find(
        (d: { performancePillar: string }) =>
          d.performancePillar === "Probability-1.5°"
      ) || {};
    let probability20 =
      data?.impactPerformance?.find(
        (d: { performancePillar: string }) =>
          d.performancePillar === "Probability-2.0°"
      ) || {};

    return {
      overallScore,
      probability15,
      probability20,
      lastCalculationDate: data?.lastCalculationDate,
      overall: {
        labels: [year.toString(), "2030", "2050"],
        overall: [
          overallData.baselineValue,
          overallData.actualShortTerm,
          overallData.actualLongTerm,
        ],
        oneDotFiveDegree: [
          overallData.baselineValue,
          overallData.oneDotFiveDegreeShortTerm,
          overallData.oneDotFiveDegreeLongTerm,
        ],
        twoDegree: [
          overallData.baselineValue,
          overallData.twoDegreeShortTerm,
          overallData.twoDegreeLongTerm,
        ],
      },
      scope1: {
        labels: [year.toString(), "2030", "2050"],
        overall: [
          scope1Data.baselineValue,
          scope1Data.actualShortTerm,
          scope1Data.actualLongTerm,
        ],
        oneDotFiveDegree: [
          scope1Data.baselineValue,
          scope1Data.oneDotFiveDegreeShortTerm,
          scope1Data.oneDotFiveDegreeLongTerm,
        ],
        twoDegree: [
          scope1Data.baselineValue,
          scope1Data.twoDegreeShortTerm,
          scope1Data.twoDegreeLongTerm,
        ],
      },
      scope2: {
        labels: [year.toString(), "2030", "2050"],
        overall: [
          scope2Data.baselineValue,
          scope2Data.actualShortTerm,
          scope2Data.actualLongTerm,
        ],
        oneDotFiveDegree: [
          scope2Data.baselineValue,
          scope2Data.oneDotFiveDegreeShortTerm,
          scope2Data.oneDotFiveDegreeLongTerm,
        ],
        twoDegree: [
          scope2Data.baselineValue,
          scope2Data.twoDegreeShortTerm,
          scope2Data.twoDegreeLongTerm,
        ],
      },
      scope3: {
        labels: [year.toString(), "2030", "2050"],
        overall: [
          scope3Data.baselineValue,
          scope3Data.actualShortTerm,
          scope3Data.actualLongTerm,
        ],
        oneDotFiveDegree: [
          scope3Data.baselineValue,
          scope3Data.oneDotFiveDegreeShortTerm,
          scope3Data.oneDotFiveDegreeLongTerm,
        ],
        twoDegree: [
          scope3Data.baselineValue,
          scope3Data.twoDegreeShortTerm,
          scope3Data.twoDegreeLongTerm,
        ],
      },
    };
  },
};

export default ImpactPerformanceService;
