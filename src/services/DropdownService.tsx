import axios from "axios";
import { Option } from "../components/CustomForm/CustomForm.model";
import { SUPPLIERS_SELECT_ENDPOINT, YEAR_REPRESENTATION_ENDPOINT } from "../constants";
import {
  AuditingValidationOption,
  BaseCurrencyOption,
  EmissionsAccountingMethodOption,
  HomeStockExchangeOption,
  IndustrySectorOption,
  TargetScopeOption,
  YearRepresentationOption,
} from "../models/Api.model";
import { RefProductServicesModel } from "../models/general-background.model";
import { SupplierType } from "../pages/manage-suppliers/models";

const DropdownService = {
  getAuditingValidation: async () => {
    let response = await axios.get<AuditingValidationOption[]>(
      "common/auditing-validation/list",
    );
    return response.data.map((element) => ({
      label: element.name,
      value: element.auditingValidationId,
    }));
  },
  getBaseCurrency: async () => {
    let response = await axios.get<BaseCurrencyOption[]>(
      "common/base-currency/list",
    );
    let filteredData: BaseCurrencyOption[] = [];
    response.data.forEach((element) => {
      if (
        !filteredData.find(
          (filteredElement) => element.code === filteredElement.code,
        )
      ) {
        filteredData.push(element);
      }
    });
    let sortedData = filteredData
      .slice(0, 7)
      .concat(
        filteredData.slice(7).sort((a, b) => a.code.localeCompare(b.code)),
      );
    return sortedData.map((element, index) => ({
      label: `${element.symbol} ${element.currency}(${element.code})`,
      value: element.baseCurrencyId,
      group: index < 7 ? "Most Used" : "Currencies",
      code: element.code,
    }));
  },
  getFinancialYear: async () => {
    let response = await axios.get<YearRepresentationOption[]>(
      YEAR_REPRESENTATION_ENDPOINT,
    );
    return response.data
      .map((element) => ({
        label: element.financialYear,
        value: element.yearRepresentationId,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  },
  getYear: async () => {
    let response = await axios.get<YearRepresentationOption[]>(
      YEAR_REPRESENTATION_ENDPOINT,
    );
    return response.data
      .map((element) => ({
        label: element.calendarYear.toString(),
        value: element.yearRepresentationId,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  },
  getYearRepresentation: async () => {
    let response = await axios.get<YearRepresentationOption[]>(
      YEAR_REPRESENTATION_ENDPOINT,
    );
    return response.data.sort((a, b) => a.calendarYear - b.calendarYear);
  },
  getEmissionsAccountingMethod: async () => {
    let response = await axios.get<EmissionsAccountingMethodOption[]>(
      "common/emissions-accounting-method/list",
    );
    let data = response.data
      .map((element) => ({
        label: element.name,
        value: element.emissionsInventoryMethodId,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
    data.push({
      label: "Other",
      value: 0,
    });
    return data;
  },
  getHomeStockExchange: async () => {
    let response = await axios.get<HomeStockExchangeOption[]>(
      "common/home-stock-exchange/list",
    );
    return response.data
      .map((element) => ({
        label: element.name,
        value: element.homeStockExchangeId,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  },
  getTargetScope: async () => {
    let response = await axios.get<TargetScopeOption[]>(
      "common/emissions-reduction-target-scope/list",
    );
    return response.data
      .map((element) => ({
        label: element.name,
        value: element.emissionsReductionTargetScopeId,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  },
  getIndustrySector: async () => {
    let response = await axios.get<IndustrySectorOption[]>(
      "common/industry-sector/list",
    );
    return response.data
      .map((element) => ({
        label: element.name,
        value: element.industrySectorId,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  },
  getIndustrySubsector: async () => {
    let response = await axios.get<IndustrySectorOption[]>(
      "common/industry-sector/list",
    );
    let data: Option[] = [];
    response.data.forEach((sector) => {
      sector.industrySubSectors.forEach((subsector) => {
        data.push({
          label: subsector.name,
          value: subsector.industrySubsectorId,
          group: sector.industrySectorId,
        });
      });
    });
    return data.sort((a, b) =>
      a.label ? a.label.localeCompare(b.label || "") : 0,
    );
  },
  getInternalCarbonPriceCoverage: async () => {
    let response = await axios.get<any[]>("common/carbon-price-coverage/list");
    return response.data.map((element) => ({
      label: element.name,
      value: element.carbonPriceCoverageId,
    }));
  },
  getInternalCarbonPriceCoverageType: async () => {
    let response = await axios.get<any[]>(`common/carbon-price-coverage/list`);
    let options: Option[] = [];
    response.data.forEach((element: any) => {
      element.carbonPriceCoverageTypes.forEach((type: any) => {
        options.push({
          label: type.name,
          value: type.carbonPriceCoverageTypeId,
          group: element.carbonPriceCoverageId,
        });
      });
    });
    return options.sort((a, b) =>
      a.label ? a.label.localeCompare(b.label || "") : 0,
    );
  },
  getOperationalBoundary: async () => {
    let response = await axios.get("common/operational-boundary/list");
    return response.data;
  },
  getOperationalBoundaryList: async (operationalBoundaryScopeId: string) => {
    let response = await axios.get(
      `common/operational-boundary/${operationalBoundaryScopeId}/list`,
    );
    return response.data;
  },
  getOperationalBoundaryScope: async () => {
    let response = await axios.get("common/operational-boundary-scope/list");
    let data: any[] = [];
    response.data.forEach((element: any) => {
      let category: any = { category: element.name, groupedOptions: [], groupedOptionId: element.operationalBoundaryScopeId };
      element.operationalBoundaries.forEach((elem: any) => {
        category.groupedOptions.push({
          label: elem.name,
          value: elem.operationalBoundaryId,
        });
      });
      data.push(category);
    });
    return data;
  },
  getOrganisationalBoundaryCriteria: async () => {
    let response = await axios.get(
      "common/organisational-boundary-criteria/list",
    );
    return response.data.map(
      (element: {
        name: string;
        organisationalBoundaryCriteriaId: number;
      }) => ({
        label: element.name,
        value: element.organisationalBoundaryCriteriaId,
      }),
    );
  },
  getOrganisationalBoundaryCriteriaList: async (
    organisationalBoundaryId: string,
  ) => {
    let response = await axios.get(
      `common/organisational-boundary-criteria/${organisationalBoundaryId}/list`,
    );
    return response.data;
  },
  getOrganisationalBoundary: async () => {
    let response = await axios.get("common/organisational-boundary/list");
    return response.data.map(
      (element: { name: string; organisationalBoundaryId: number }) => ({
        label: element.name,
        value: element.organisationalBoundaryId,
      }),
    );
  },
  getCompanyCategory: async () => {
    let response = await axios.get("common/company-category/list");
    return response.data.map((element: { category: string; id: number }) => ({
      label: element.category,
      value: element.id,
    }));
  },
  getPurchaseCreditCategories: async () => {
    let response = await axios.get("common/purchase-credit-categories/list");
    return response.data;
  },
  getPurchaseCreditCategoryType: async () => {
    let response = await axios.get("common/purchase-credit-category-type/list");
    return response.data;
  },
  getCarbonCreditCategory: async () => {
    let response = await axios.get("common/carbon-credit-category/list");
    let data: Option[] = [];
    response.data.forEach((element: any) => {
      let category: any = {
        category: element.name,
        groupedOptions: [],
        value: element.carbonCreditCategoryId,
      };
      element.carbonCompensationTypes.forEach((elem: any) => {
        category.groupedOptions.push({
          label: elem.name,
          value: elem.carbonCompensationTypeId,
        });
      });
      data.push(category);
    });
    return data;
  },
  getCarbonCreditCategoryType: async (carbonCreditCategoryId: number) => {
    let response = await axios.get(
      `common/carbon-compensation-type/${carbonCreditCategoryId}/list`,
    );
    let data: Option[] = [
      {
        category: "",
        groupedOptions: response.data.map((element: any) => ({
          label: element.name,
          value: element.carbonCompensationTypeId,
        })),
      },
    ];
    return data;
  },
  getAllRefProductServices: async () => {
    let response = await axios.get(`common/ref-product-services/list`);
    return response.data.map((prodServ: RefProductServicesModel) => ({
      label: prodServ.prodServName,
      value: prodServ.id,
    }));
  },
  getAllFacilityDataUnitRefList: async () => {
    let response = await axios.get(
      `common/ref-list/getbylistkey?listKey=impactm_facilitydata_unit`,
    );
    return response.data.map((ref: { listId: number; listValue: string }) => ({
      label: ref.listValue,
      value: ref.listId,
    }));
  },
  getAllCountries: async () => {
    let response = await axios.get(
      `common/ref-country/getall`,
    );
    return response.data.map((ref: { id: number; country: string }) => ({
      label: ref.country,
      value: ref.id,
    }));
  },
  getAllStatesByCountryId: async (countryId: number): Promise<Option[]> => {
    let response = await axios.get(
      `common/ref-states/getbycountryid?countryId=${countryId}`,
    );
    return response.data.map((ref: { id: number; stateName: string }) => ({
      label: ref.stateName,
      value: ref.id,
    }));
  },
  getCompanyList: async () => {
    const response = await axios.get(SUPPLIERS_SELECT_ENDPOINT);
    return response.data.map(
      ({ companyName, companyId }: SupplierType) => ({
        label: companyName,
        value: companyId,
      }),
    );
  },
  getImpactmRefData: async () => {
    // const impactmRefData = localStorage.getItem("impactmRefData");

    // if (impactmRefData) {
    //   return JSON.parse(impactmRefData);
    // } else {
    //   const response = await axios.get("private/impactm/get-refdata");
    //   localStorage.setItem("impactmRefData", JSON.stringify(response.data));

    //   return response.data;
    // }
    const response = await axios.get("private/impactm/get-refdata");
    localStorage.setItem("impactmRefData", JSON.stringify(response.data));
    return response.data;
  },
};

export default DropdownService;
