import { CustomFormConfig } from "../../../components/CustomForm/CustomForm.model";
import { TabsConfig } from "../models";
import { cloneDeep } from "lodash";
import GeneralBackgroundService from "../../../services/GeneralBackgroundService";

export const industryFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "city",
      type: "location-input",
      defaultValue: "",
      placeholder: "City",
      label: "City",
      flex: 2,
    },
    {
      name: "countryId",
      type: "select",
      defaultValue: "",
      placeholder: "Country",
      label: "Country",
      flex: 2,
    },
    {
      name: "industrySectorId",
      type: "select",
      defaultValue: "",
      placeholder: "Industry",
      label: "Industry",
      flex: 1,
    },
    {
      name: "industrySubsectorId",
      type: "select",
      defaultValue: "",
      placeholder: "Sub-Sector",
      label: "Sub-Sector",
      flex: 1,
      filterOptionsBy: "industrySectorId",
    },
  ],
};

export const structureFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "relCompanyId",
      newField: "relCompanyName",
      optionsField: "companyOptions",
      type: "select",
      defaultValue: "",
      placeholder: "Company Name",
      label: "Company Name",
      flex: 2,
    },
    {
      name: "relCompanyCategoryId",
      type: "select",
      defaultValue: "",
      placeholder: "Company Category",
      label: "Company Category",
      flex: 2,
    },
    {
      name: "economicInterestPercentage",
      type: "text",
      defaultValue: "",
      placeholder: "Economics Interest",
      label: "Economics Interest",
      flex: 1,
      inputType: "numeric",
      percentage: true,
    },
    {
      name: "isOperatingPoliciesControl",
      type: "select",
      defaultValue: "",
      placeholder: "Operating policies control",
      label: "Operating policies control",
      flex: 2,
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
    {
      name: "isFinancialAccounting",
      type: "select",
      defaultValue: "",
      placeholder: "Treatment in financial accounting",
      label: "Treatment in financial accounting",
      flex: 2,
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
  ],
};

export const facilityFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "facilityName",
      type: "text",
      defaultValue: "",
      placeholder: "Facility Name",
      label: "Facility Name",
      flex: 1,
    },
    {
      name: "facilityAddress",
      type: "text",
      defaultValue: "",
      placeholder: "Address",
      label: "Address",
      flex: 2,
    },
    {
      name: "facilityCity",
      type: "location-input",
      defaultValue: "",
      placeholder: "City",
      label: "City",
      flex: 2,
    },
    {
      name: "facilityCountryId",
      type: "select",
      defaultValue: "",
      placeholder: "Country",
      label: "Country",
      flex: 2,
    },
    {
      name: "facilityStateId",
      type: "select-state",
      defaultValue: "",
      placeholder: "State",
      label: "State",
      flex: 2,
      filterOptionsBy: "facilityCountryId",
    },
    {
      name: "facilityOwnerCompanyId",
      type: "select",
      optionsField: "facilityCompanyOptions",
      defaultValue: "",
      placeholder: "Ownership",
      label: "Ownership",
      flex: 2,
    },
    {
      name: "facilityOperationCompanyId",
      type: "select",
      optionsField: "facilityCompanyOptions",
      defaultValue: "",
      placeholder: "Operation",
      label: "Operation",
      flex: 2,
    },
  ],
};

export const serviceFormConfig: CustomFormConfig = {
  fields: [
    {
      name: "refProdServId",
      newField: "prodServName",
      type: "select",
      defaultValue: "",
      placeholder: "Product / Service",
      label: "Product / Service",
      flex: 2,
    },
    {
      name: "isQuantPerFacility",
      type: "select",
      defaultValue: "yes",
      placeholder: "Quantity Provided Per Facility",
      label: "Quantity Provided Per Facility",
      flex: 2,
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
    {
      name: "companyFacilityData",
      type: "sections",
      defaultValue: "",
      placeholder: "Facility",
      remove: false,
      conditionedBy: {
        field: "isQuantPerFacility",
        value: "no",
        disable: true,
      },
      formConfig: {
        fields: [
          {
            name: "facilityName",
            type: "section-title",
            placeholder: "Facility Name",
            defaultValue: "",
            label: [
              {
                name: "facilityName",
                label: "facilityName",
              },
            ],
            flex: 3,
          },
          {
            name: "quantity",
            type: "text",
            inputType: "numeric",
            defaultValue: "",
            placeholder: "Quantity",
            label: "Quantity",
            flex: 3,
          },
          {
            name: "quantityUnitId",
            newField: "quantityUnitText",
            type: "select",
            defaultValue: "",
            placeholder: "Quantity Unit",
            label: "Quantity Unit",
            flex: 3,
          },
        ],
      },
      flex: 1,
    },
    {
      name: "total",
      type: "section-title",
      defaultValue: "",
      placeholder: "Total",
      label: "Total",
      flex: 3,
    },
    {
      name: "totalQuantity",
      type: "text",
      inputType: "numeric",
      defaultValue: "",
      placeholder: "Quantity",
      label: "Quantity",
      conditionedBy: {
        field: "isQuantPerFacility",
        value: "no",
        disable: true,
      },
      flex: 3,
    },
    {
      name: "totalQuantityUnitId",
      newField: "totalQuantityUnitText",
      type: "select",
      defaultValue: "",
      placeholder: "Quantity Unit",
      label: "Quantity Unit",
      conditionedBy: {
        field: "isQuantPerFacility",
        value: "no",
        disable: true,
      },
      flex: 3,
    },
  ],
};

export const organisationConfig: CustomFormConfig = {
  fields: [
    {
      name: "companyName",
      type: "text",
      defaultValue: "",
      placeholder: "Company Name",
      label: "Company Name",
      flex: 1,
    },
    {
      name: "companyDescription",
      type: "text",
      defaultValue: "",
      placeholder: "About your company",
      label: "About your company",
      flex: 1,
    },
    {
      name: "city",
      type: "location-input",
      defaultValue: "",
      placeholder: "City",
      label: "City",
      flex: 1,
    },
    {
      name: "countryId",
      type: "select",
      defaultValue: "",
      placeholder: "Country",
      label: "Country",
      flex: 2,
    },
    {
      name: "stateId",
      type: "select-state",
      defaultValue: "",
      placeholder: "State",
      label: "State",
      flex: 2,
      filterOptionsBy: "countryId",
    },
    {
      name: "homeStockExchangeListed",
      type: "select",
      defaultValue: "",
      placeholder: "Listed",
      label: "Listed",
      flex: 2,
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
    {
      name: "homeStockExchangeId",
      type: "select",
      defaultValue: "",
      placeholder: "Home Stock Exchange",
      label: "Home Stock Exchange",
      flex: 2,
      conditionedBy: {
        field: "homeStockExchangeListed",
        value: "yes",
        disable: false,
      },
    },
    {
      name: "primaryIndustry",
      type: "section-title",
      defaultValue: "",
      placeholder: "Primary Industry",
      label: "Primary Industry",
      flex: 1,
    },
    {
      name: "industrySectorId",
      type: "select",
      defaultValue: "",
      placeholder: "Industry",
      label: "Industry",
      flex: 1,
    },
    {
      name: "industrySubsectorId",
      type: "select",
      defaultValue: "",
      placeholder: "Sub-Sector",
      label: "Sub-Sector",
      flex: 1,
      filterOptionsBy: "industrySectorId",
    },
    {
      name: "companySecondaryIndustrylist",
      type: "sections",
      remove: true,
      onRemove: GeneralBackgroundService.deleteCompanySecondaryIndustry,
      defaultValue: "",
      placeholder: "Secondary Industry",
      label: "Secondary Industry",
      addButtonLabel: "New Industry",
      formConfig: industryFormConfig,
      flex: 1,
    },
  ],
};

export const structureConfig: CustomFormConfig = {
  fields: [
    {
      name: "organisationLegal",
      type: "radio",
      defaultValue: "standalone",
      placeholder: "Which of the following match best with your organisation legal structure?",
      label: "Which of the following match best with your organisation legal structure?",
      flex: 1,
      options: [
        {
          label: "Parent company",
          value: "parentcompany",
        },
        {
          label: "Joint venture",
          value: "jointventure",
        },
        {
          label: "Subsidiary",
          value: "subsidiary",
        },
        {
          label: "Stand alone",
          value: "standalone",
        },
      ],
    },
    {
      name: "companyStructureList",
      type: "sections",
      remove: true,
      onRemove: GeneralBackgroundService.deleteCompanyStructure,
      defaultValue: "",
      placeholder: "Company Structure",
      label: "Company Structure",
      addButtonLabel: "New Company",
      formConfig: structureFormConfig,
      conditionedBy: {
        field: "organisationLegal",
        value: "standalone",
        disable: true,
      },
      flex: 1,
    },
  ],
};

export const facilitiesConfig: CustomFormConfig = {
  fields: [
    {
      name: "companyFacilityList",
      type: "sections",
      remove: true,
      onRemove: GeneralBackgroundService.deleteCompanyFacility,
      defaultValue: "",
      placeholder: "Company Facility",
      label: "Company Facility",
      addButtonLabel: "New Facility",
      formConfig: facilityFormConfig,
      flex: 1,
    },
  ],
};

export const servicesConfig: CustomFormConfig = {
  fields: [
    {
      name: "companyProductServicesList",
      type: "sections",
      remove: true,
      emptyMessage: "Please enter first your Facilities",
      onRemove: GeneralBackgroundService.deleteCompanyProductServices,
      defaultValue: "",
      placeholder: "Company Products / Services",
      label: "Company Product / Service",
      addButtonLabel: "New Product / Service",
      conditionedBy: {
        field: "companyFacilityList",
        value: [],
        disable: true,
      },
      formConfig: serviceFormConfig,
      flex: 1,
    },
  ],
};

export const generalBackgroundTabConfig: TabsConfig = {
  formConfigs: [
    cloneDeep(organisationConfig),
    cloneDeep(structureConfig),
    cloneDeep(facilitiesConfig),
    cloneDeep(servicesConfig),
  ],
  tabs: [
    {
      label: "Organisation",
      value: "organisation",
    },
    {
      label: "Structure",
      value: "structure",
    },
    {
      label: "Facilities",
      value: "facilities",
    },
    {
      label: "Products / Services",
      value: "services",
    },
  ],
};
