import { ProbabilityCardConfig } from "../ProbabilityCard/ProbabilityCard.model";
import { CustomChartConfig } from "../../../components/CustomChart/CustomChart.model";
import { COMPANY_NAME_PLACEHOLDER } from "./constants";


export const probability1_5: ProbabilityCardConfig = {
  title: "Probability of",
  subTitle: "1.5°",
  name: "probability15",
};

export const probability2: ProbabilityCardConfig = {
  title: "Probability of",
  subTitle: "2.0°",
  name: "probability20",
};

export const chart: CustomChartConfig[] = [
  {
    title: "All",
    yLabel: "Emissions tCO2e",
    xLabel: "Year",
    name: "overall",
    dataConfigs: [
      {
        label: "1.5°",
        name: "oneDotFiveDegree",
        borderColor: "#579663",
      },
      {
        label: "2.0°",
        name: "twoDegree",
        borderColor: "#e65c5c",
      },
      {
        label: COMPANY_NAME_PLACEHOLDER,
        name: "overall",
        borderColor: "#246375",
      },
    ],
  },
  {
    title: "Scope 1",
    yLabel: "Emissions tCO2e",
    xLabel: "Year",
    name: "scope1",
    dataConfigs: [
      {
        label: "1.5°",
        name: "oneDotFiveDegree",
        borderColor: "#579663",
      },
      {
        label: "2.0°",
        name: "twoDegree",
        borderColor: "#e65c5c",
      },
      {
        label: COMPANY_NAME_PLACEHOLDER,
        name: "overall",
        borderColor: "#246375",
      },
    ],
  },
  {
    title: "Scope 2",
    yLabel: "Emissions tCO2e",
    xLabel: "Year",
    name: "scope2",
    dataConfigs: [
      {
        label: "1.5°",
        name: "oneDotFiveDegree",
        borderColor: "#579663",
      },
      {
        label: "2.0°",
        name: "twoDegree",
        borderColor: "#e65c5c",
      },
      {
        label: COMPANY_NAME_PLACEHOLDER,
        name: "overall",
        borderColor: "#246375",
      },
    ],
  },
  {
    title: "Scope 3",
    yLabel: "Emissions tCO2e",
    xLabel: "Year",
    name: "scope3",
    dataConfigs: [
      {
        label: "1.5°",
        name: "oneDotFiveDegree",
        borderColor: "#579663",
      },
      {
        label: "2.0°",
        name: "twoDegree",
        borderColor: "#e65c5c",
      },
      {
        label: COMPANY_NAME_PLACEHOLDER,
        name: "overall",
        borderColor: "#246375",
      },
    ],
  },
];
