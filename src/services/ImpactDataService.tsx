import axios from "axios";
import { Option } from "../components/CustomForm/CustomForm.model";
import { EMISSION_OVERVIEW_ENDPOINT, IS_ACCEPTED_ENDPOINT } from "../constants";
import { getAvailableColor } from "../helpers/colors/getAvailableColor";
import { errorHandler } from "../helpers/errorHandler";
import { ServiceResponseType } from "../models/Api.model";
import {
  OverviewData,
  OverviewResponseData,
} from "../pages/impact-data/inventory-emission/overview/models";
import { mapFileFieldIdToName } from "../pages/impact-data/mapFileField";

const ImpactDataService = {
  isImpactDataEditable: async () => {
    let response = await axios.get("private/dataset/is-editable");
    return response.data;
  },
  isImpactDataAccepted: async () => {
    let response = await axios.get(`${IS_ACCEPTED_ENDPOINT}`);
    return response.data;
  },
  saveFinancialInformation: async (data: any) => {
    let body = {
      baseCurrencyId: data.baseCurrency,
      companyId: data.companyId,
      netProfit: data.netProfit,
      revenue: data.turnover,
      startMonth: data.financialYearStartMonth,
      representationYearId:
        data.reportingYear === "financial" ? data.financialYear : data.year,
      userFinancialDetailId: data.userFinancialDetailId || null,
      isFinancialYear: data.reportingYear === "financial",
    };
    let response = await axios.post(
      "private/change-financial-informations",
      body,
    );
    return response.data;
  },
  getFinancialInformation: async () => {
    let response = await axios.get("private/get-financial-informations");
    return {
      baseCurrency: response.data.baseCurrencyId || "",
      financialYearStartMonth: response.data.startMonth,
      financialYear: response.data.representationYearId,
      year: response.data.representationYearId,
      netProfit: response.data.netProfit,
      turnover: response.data.revenue,
      userFinancialDetailId: response.data.userFinancialDetailId,
      reportingYear: response.data.isFinancialYear ? "financial" : "reporting",
    };
  },
  getGHGInventoryMethod: async () => {
    let response = await axios.get("private/dataset/get-ghg-inventory-method");
    let dataset = response.data.dataSetGhgInventoryMethod;
    let data = {
      approachCriteria: null,
      auditingAndValidation: null,
      emissionsAccountingMethod: null,
      operationalBoundary: [],
      organisationalBoundary: null,
      customEmissionsAccountingMethod: "",
      auditingValidationOther: null,
    };
    if (dataset) {
      data = ImpactDataService.getGHGInventoryMethodFromData(dataset);
    }
    return data;
  },
  getGHGInventoryMethodFromData(dataset: any): any {
    return {
      approachCriteria: dataset.organisationalBoundaryCriteriaId,
      auditingAndValidation: dataset.auditingValidationId,
      emissionsAccountingMethod: dataset.emissionsInventoryMethodId,
      operationalBoundary:
        dataset.dataSetGhgInventoryMethodOperationalBoundaries?.map(
          (element: any) => element.operationalBoundaryId,
        ),
      organisationalBoundary: dataset.organisationalBoundaryId,
      customEmissionsAccountingMethod: dataset.otherEmissionsInventoryMethod,
      auditingValidationOther: dataset.auditingValidationOther,
    };
  },
  saveGHGInventoryMethod: async (data: any) => {
    let body = {
      dataSetGhgInventoryMethod: {
        auditingValidationOther: data.auditingValidationOther,
        auditingValidationId: data.auditingAndValidation,
        dataSetGhgInventoryMethodOperationalBoundaries:
          data.operationalBoundary?.map((element: string) => ({
            operationalBoundaryId: element,
          })),
        emissionsInventoryMethodId: data.emissionsAccountingMethod,
        isGhgInventoryPresent: true,
        organisationalBoundaryCriteriaId: data.approachCriteria,
        organisationalBoundaryId: data.organisationalBoundary,
        otherEmissionsInventoryMethod:
          data.emissionsAccountingMethod === 0
            ? data.customEmissionsAccountingMethod || null
            : null,
      },
    };
    let response = await axios.post(
      "private/dataset/save-ghg-inventory-method",
      body,
    );
    return response.data;
  },
  getRecentYear: async (year: number) => {
    let response = await axios.get(
      `private/dataset/get-recent-year-emissions?yearRepresentationId=${year}`,
    );
    let data = response.data.recentYearEmissions;
    let types: number[] = [];
    if (data) {
      data.recentYearEmissionsCarbonCreditsCategories.forEach(
        (category: any) => {
          category.recentYearEmissionsCarbonCreditsCategoryTypes.forEach(
            (type: any) => {
              types.push(type.carbonCompensationTypeId);
            },
          );
        },
      );
      let body: any = {
        participationOfCarbonCredits:
          data.participationOfCarbonCreditsOrCertificates ? "yes" : "no",
        reportingYear: data.isFinancialYear ? "financial" : "calendar",
        financialYearStartMonth: data.financialYearStartMonth,
        financialYear: data.yearRepresentationId,
        year: data.yearRepresentationId,
        scopeNo1: data.scope1,
        scopeNo2: data.scope2,
        scopeNo3: data.scope3,
        carbonCreditsCategoryType: types,
      };
      data.recentYearEmissionsCarbonCreditsCategories.forEach(
        (category: any) => {
          category.recentYearEmissionsCarbonCreditsCategoryTypes.forEach(
            (type: any) => {
              body["quantity" + type.carbonCompensationTypeId] = type.quantity;
              body["cost" + type.carbonCompensationTypeId] = type.cost;
              body["certificationBody" + type.carbonCompensationTypeId] =
                type.certificationBody;
            },
          );
        },
      );
      data.recentYearEmissionsSources.forEach((element: any) => {
        body["sourceNo" + element.operationalBoundaryId] = element.sourceValue;
      });
      return body;
    } else {
      return {};
    }
  },
  saveRecentYear: async (data: any, year: number, options?: Option[]) => {
    let keys = Object.keys(data);
    let sources = keys
      .filter((element: string) => element.startsWith("sourceNo"))
      .map((element) => {
        return {
          operationalBoundaryId: parseInt(element.slice(8)),
          sourceValue: data[element],
        };
      });
    let categories: any[] = [];
    options?.forEach((option) => {
      let category: any = {
        carbonCreditCategoryId: option.value,
        recentYearEmissionsCarbonCreditsCategoryTypes: [],
      };
      if (option.groupedOptions) {
        option.groupedOptions.forEach((groupedOption) => {
          if (
            data.carbonCreditsCategoryType &&
            data.carbonCreditsCategoryType.includes(groupedOption.value)
          ) {
            category.recentYearEmissionsCarbonCreditsCategoryTypes.push({
              carbonCompensationTypeId: groupedOption.value,
              certificationBody:
                data[`certificationBody${groupedOption.value}`] || null,
              cost: data[`cost${groupedOption.value}`] || null,
              quantity: data[`quantity${groupedOption.value}`] || null,
            });
          }
        });
      }
      if (category.recentYearEmissionsCarbonCreditsCategoryTypes.length > 0) {
        categories.push(category);
      }
    });
    let body = {
      recentYearEmissions: {
        financialYearStartMonth: data.financialYearStartMonth,
        isHistoricalEmissions: false,
        participationOfCarbonCreditsOrCertificates:
          data.participationOfCarbonCredits === "yes",
        recentYearEmissionsCarbonCreditsCategories: categories,
        recentYearEmissionsSources: sources,
        scope1: data.scopeNo1,
        scope2: data.scopeNo2,
        scope2Method: 0,
        scope3: data.scopeNo3,
        isFinancialYear: data.reportingYear === "financial",
        yearRepresentationId: year,
      },
    };
    let response = await axios.post(
      "private/dataset/save-year-emissions",
      body,
    );
    return response.data;
  },
  saveHistorical: async (data: any, options?: Option[]) => {
    let keys = Object.keys(data);
    let categories: any[] = [];
    let sources = keys
      .filter((element: string) => element.startsWith("sourceNo"))
      .map((element) => {
        return {
          operationalBoundaryId: parseInt(element.slice(8)),
          sourceValue: data[element],
        };
      });
    options?.forEach((option) => {
      let category: any = {
        carbonCreditCategoryId: option.value,
        recentYearEmissionsCarbonCreditsCategoryTypes: [],
      };
      if (option.groupedOptions) {
        option.groupedOptions.forEach((groupedOption) => {
          if (
            data.carbonCreditsCategoryType &&
            data.carbonCreditsCategoryType.includes(groupedOption.value)
          ) {
            category.recentYearEmissionsCarbonCreditsCategoryTypes.push({
              carbonCompensationTypeId: groupedOption.value,
              certificationBody:
                data[`certificationBody${groupedOption.value}`] || null,
              cost: data[`cost${groupedOption.value}`] || null,
              quantity: data[`quantity${groupedOption.value}`] || null,
            });
          }
        });
      }
      if (category.recentYearEmissionsCarbonCreditsCategoryTypes.length > 0) {
        categories.push(category);
      }
    });
    let body = {
      recentYearEmissions: {
        financialYearStartMonth: data.financialYearStartMonth,
        isHistoricalEmissions: true,
        participationOfCarbonCreditsOrCertificates:
          data.participationOfCarbonCredits === "yes",
        recentYearEmissionsCarbonCreditsCategories: categories,
        scope1: data.scopeNo1,
        scope2: data.scopeNo2,
        scope2Method: 0,
        recentYearEmissionsSources: sources,
        scope3: data.scopeNo3,
        isFinancialYear: data.reportingYear === "financial",
        yearRepresentationId:
          data.reportingYear === "financial"
            ? data.financialYear === 0
              ? null
              : data.financialYear
            : data.year === 0
              ? null
              : data.year,
      },
    };
    let response = await axios.post(
      "private/dataset/save-year-emissions",
      body,
    );
    return response.data;
  },
  saveGHGTargetSetting: async (data: any) => {
    let targets = [];
    let shortTerms = [];

    if (data.target) {
      targets = data.target
        .filter((element: any) => element)
        .map((element: any) => {
          return {
            emissionsReductionTargetScopeId: element.scope,
            targetReductionPercentage: element.reduction,
            targetYear: element.year,
            targetTypeId: element.type,
          };
        });
    }

    if (data.shortTerm) {
      shortTerms = data.shortTerm
        .filter((element: any) => element)
        .map((element: any) => {
          return {
            emissionsReductionTargetScopeId: element.scope,
            targetTypeId: element.type,
            emissionsReductionId: element.reduction,
            targetReductionShortTermPlan1: element.targetReduction1,
            targetReductionShortTermPlan2: element.targetReduction2,
            targetReductionShortTermPlan3: element.targetReduction3,
            targetReductionShortTermPlan4: element.targetReduction4,
            isAssumedSubstitution: element.isAssumedSubstitution === "true",
          };
        });
    }

    let body = {
      emissionsReduction: {
        scope1: data.scopeNo1,
        scope2: data.scopeNo2,
        scope3: data.scopeNo3,
        isEmissionsReductionPresent: !data.dataIsNotPresent,
        financialYearStartMonth: data.financialYearStartMonth,
        isFinancialYear: data.baselineYear === "financial",
        yearRepresentationId:
          data.baselineYear === "financial"
            ? data.financialYear === 0
              ? null
              : data.financialYear
            : data.year === 0
              ? null
              : data.year,
        emissionsReductionTargets: targets,
        emissionsReductionShortTerms: shortTerms,
      },
    };
    let response = await axios.post(
      "private/dataset/save-emissions-reduction-target",
      body,
    );
    return response.data;
  },
  getGHGTargetSetting: async () => {
    let response = await axios.get(
      "private/dataset/get-emissions-reduction-target",
    );
    let data = response.data.emissionsReduction;
    return ImpactDataService.getGHGTargetSettingFromData(data);
  },
  getGHGTargetSettingFromData(data: any): any {
    if (data) {
      let targets = data.emissionsReductionTargets?.map((element: any) => ({
        scope: element.emissionsReductionTargetScopeId,
        reduction: element.targetReductionPercentage,
        type: element.targetTypeId,
        year: element.targetYear,
        id: element.emissionsReductionTargetId,
      }));
      let shortTerms = data.emissionsReductionShortTerms?.map(
        (element: any) => ({
          id: `${element.emissionsReductionId}-${element.targetTypeId}-${element.emissionsReductionTargetScopeId}`,
          reduction: element.emissionsReductionId,
          type: element.targetTypeId,
          scope: element.emissionsReductionTargetScopeId,
          targetReduction1: element.targetReductionShortTermPlan1,
          targetReduction2: element.targetReductionShortTermPlan2,
          targetReduction3: element.targetReductionShortTermPlan3,
          targetReduction4: element.targetReductionShortTermPlan4,
          isAssumedSubstitution: String(element.isAssumedSubstitution),
        }),
      );

      return {
        scopeNo1: data.scope1,
        scopeNo2: data.scope2,
        scopeNo3: data.scope3,
        financialYearStartMonth: data.financialYearStartMonth,
        baselineYear: data.isFinancialYear ? "financial" : "calendar",
        financialYear: data.yearRepresentationId,
        year: data.yearRepresentationId,
        dataIsNotPresent: !data.isEmissionsReductionPresent,
        target: targets,
        shortTerm: shortTerms,
      };
    } else return {};
  },
  saveClimateMetrics: async (data: any) => {
    let influences = [];

    if (data.influences) {
      influences = data.influences
        .filter((element: any) => element)
        .map((element: any) => {
          return {
            climateMechanismInfluenceMetricId: element.id,
            businessAssociation: element.businessAssociation,
          };
        });
    }

    let body = {
      climateMechanismsInfluence: {
        carbonPrice: data.carbonPrice,
        carbonPriceCoverageId: data.carbonPriceCoverage,
        carbonPriceCoverageTypeId: data.carbonPriceCoverageType || null,
        climateMechanismsInfluenceMetrics: influences,
        baseCurrencyId: data.baseCurrency,
        internalCarbonPriceUsed: data.internalCarbonPriceUsed === "yes",
        climateMechanismInfluenceId: data.climateMechanismInfluenceId,
      },
    };
    let response = await axios.post(
      "private/dataset/save-climate-metrics",
      body,
    );
    return response.data;
  },
  getClimateMetrics: async () => {
    let response = await axios.get("private/dataset/get-climate-metrics");
    let data = response.data.climateMechanismsInfluence;
    if (data) {
      let influences = data.climateMechanismsInfluenceMetrics.map(
        (element: any) => ({
          id: element.climateMechanismInfluenceMetricId,
          businessAssociation: element.businessAssociation,
        }),
      );

      return {
        influences: influences,
        carbonPrice: data.carbonPrice,
        carbonPriceCoverage: data.carbonPriceCoverageId,
        carbonPriceCoverageType: data.carbonPriceCoverageTypeId,
        baseCurrency: data.baseCurrencyId,
        internalCarbonPriceUsed: data.internalCarbonPriceUsed ? "yes" : "no",
        climateMechanismInfluenceId: data.climateMechanismInfluenceId,
      };
    } else return {};
  },
  uploadFile: async (body: any) => {
    let response = await axios.post("private/support-documents/upload", body);
    return response.data;
  },
  getFiles: async () => {
    let response = await axios.get("private/support-documents/list");
    let data: any = {};
    if (response.data.files)
      response.data.files.forEach((file: any) => {
        data[mapFileFieldIdToName(file.fileType)] = { filename: file.filename };
      });
    else data = {};
    return data;
  },
  removeFile: async (fileType: number, filename: string) => {
    let response = await axios.post("private/support-documents/remove", {
      fileType,
      filename,
    });
    return response.data;
  },
  getPercentages: async () => {
    let response = await axios.get("private/dataset/calculate-percentage");
    return response.data;
  },
  getDemoCompany: async () => {
    let response = await axios.get("common/ref-list/getbylistkey?listKey=praesideo_demo_company_id");
    return response.data;
  },
  submit: async () => {
    let response = await axios.post("private/dataset/submit");
    return response.data;
  },
  getEmissionOverview: async (
    yearId: number,
  ): Promise<ServiceResponseType<OverviewData>> => {
    try {
      const {
        data: {
          emissionChartByActivityModel,
          emissionChartByScopeModel,
          emissionChartBySourceModel,
        },
      } = await axios.get<OverviewResponseData>(
        `${EMISSION_OVERVIEW_ENDPOINT}?yearRepresentationId=${yearId}`,
      );

      if (emissionChartByScopeModel.itemList === null) {
        return { error: "data is empty" };
      }

      const activities = emissionChartByActivityModel?.itemList;
      let emissionByActivity;

      if (activities) {
        const sortedEmissionValues = Object.entries(activities).sort(
          ([, { itemValue: a }], [, { itemValue: b }]) => b - a,
        );
        const toKey = "to";

        emissionByActivity = {
          data: {
            datasets: [
              {
                label: "Emission by activity",
                colorMode: "from" as "from",
                data: activities.map(
                  ({ itemText, itemPercentage }, index) => ({
                    from: itemText,
                    to: `${toKey}_${index}`,
                    flow: itemPercentage < 10 ? 10 : itemPercentage,
                  }),
                ),
                priority: {
                  // Sorting values array to get the right order,
                  // then setting "to-values" priorities
                  ...sortedEmissionValues.reduce(
                    (priorities, entry, index) => ({
                      ...priorities,
                      [`${toKey}_${entry[0]}`]: index + 1,
                    }),
                    {},
                  ),
                },
                colorFrom: (c: any) =>
                  getAvailableColor(c.dataset.data[c.dataIndex].from),
                colorTo: (c: any) =>
                  getAvailableColor(c.dataset.data[c.dataIndex].from),
                labels: activities.reduce(
                  (labels, { itemValue }, index) => ({
                    ...labels,
                    [`${toKey}_${index}`]: itemValue,
                  }),
                  {},
                ),
              },
            ],
          },
        };
      }

      let emissionBySource;
      const scope1 = emissionChartBySourceModel.scope1
        ? {
          labels: emissionChartBySourceModel.scope1.map(
            ({ itemText, itemValue }) => `${itemText} ${itemValue} tCO2`,
          ),
          datasets: [
            {
              label: "scope 1 emission",
              data: emissionChartBySourceModel.scope1.map(
                ({ itemPercentage }) => itemPercentage,
              ),
              backgroundColor: emissionChartBySourceModel.scope1.map(
                ({ itemText }) => getAvailableColor(itemText),
              ),
              borderColor: emissionChartBySourceModel.scope1.map(
                ({ itemText }) => getAvailableColor(itemText),
              ),
              borderWidth: 1,
            },
          ],
        }
        : undefined;
      const scope2 = emissionChartBySourceModel.scope2
        ? {
          labels: emissionChartBySourceModel.scope2.map(
            ({ itemText, itemValue }) => `${itemText} ${itemValue} tCO2`,
          ),
          datasets: [
            {
              label: "scope 2 emission",
              data: emissionChartBySourceModel.scope2.map(
                ({ itemPercentage }) => itemPercentage,
              ),
              backgroundColor: emissionChartBySourceModel.scope2.map(
                ({ itemText }) => getAvailableColor(itemText),
              ),
              borderColor: emissionChartBySourceModel.scope2.map(
                ({ itemText }) => getAvailableColor(itemText),
              ),
              borderWidth: 1,
            },
          ],
        }
        : undefined;
      const scope3 = emissionChartBySourceModel.scope3
        ? {
          labels: emissionChartBySourceModel.scope3.map(
            ({ itemText, itemValue }) => `${itemText} ${itemValue} tCO2`,
          ),
          datasets: [
            {
              label: "scope 3 emission",
              data: emissionChartBySourceModel.scope3.map(
                ({ itemPercentage }) => itemPercentage,
              ),
              backgroundColor: emissionChartBySourceModel.scope3.map(
                ({ itemText }) => getAvailableColor(itemText),
              ),
              borderColor: emissionChartBySourceModel.scope3.map(
                ({ itemText }) => getAvailableColor(itemText),
              ),
              borderWidth: 1,
            },
          ],
        }
        : undefined;

      emissionBySource =
        scope1 || scope2 || scope3
          ? {
            scope1,
            scope2,
            scope3,
          }
          : undefined;

      return {
        data: {
          emissionByActivity,
          emissionBySource,
          emissionByScope: {
            data: {
              labels: emissionChartByScopeModel.itemList.map(
                ({ itemText, itemValue }) => `${itemText} ${itemValue} tCO2`,
              ),
              datasets: [
                {
                  label: "emission by scope",
                  data: emissionChartByScopeModel.itemList.map(
                    ({ itemPercentage }) => itemPercentage,
                  ),
                  backgroundColor: emissionChartByScopeModel.itemList.map(
                    ({ itemText }) => getAvailableColor(itemText),
                  ),
                  borderColor: emissionChartByScopeModel.itemList.map(
                    ({ itemText }) => getAvailableColor(itemText),
                  ),
                  borderWidth: 1,
                },
              ],
            },
            total: emissionChartByScopeModel.totalTco2,
          },
        },
      };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
};

export default ImpactDataService;
