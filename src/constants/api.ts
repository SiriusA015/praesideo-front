export const TERMS_AND_CONDITIONS_ENDPOINT =
  "https://praesideo.earth/s/Praesideo-Terms-And-Conditions.pdf";

export const PUBLIC_API_ENDPOINT = "public";
export const PRIVATE_API_ENDPOINT = "private";
export const SETTINGS_API_ENDPOINT = "settings";
export const SUPPLIERS_ENDPOINT = "suppliers";
export const TRACE_PERFORMANCE_ENDPOINT = "traceperformance";
export const IMPACT_PERFORMANCE_ENDPOINT = "impactperformance";

export const LOGIN_ENDPOINT = `${PUBLIC_API_ENDPOINT}/login`;
export const REGISTER_ENDPOINT = `${PUBLIC_API_ENDPOINT}/register`;
export const ACTIVATE_ACCOUNT_ENDPOINT = `${PUBLIC_API_ENDPOINT}/activate-account`;
export const CHECK_EXISTING_DOMAIN_ENDPOINT = `${PUBLIC_API_ENDPOINT}/check-existing-domain`;
export const REFRESH_TOKEN_ENDPOINT = `${PUBLIC_API_ENDPOINT}/refresh-token`;
export const FORGET_PASSWORD_ENDPOINT = `${PUBLIC_API_ENDPOINT}/forget-password`;
export const CHANGE_PASSWORD_ENDPOINT = `${PUBLIC_API_ENDPOINT}/restore`;

export const GENERAL_BACKGROUND_ENDPOINT = `${PRIVATE_API_ENDPOINT}/get-general-background`;

export const IS_ACCEPTED_ENDPOINT = `${PRIVATE_API_ENDPOINT}/dataset/is-accepted`;

export const USERS_PERMISSIONS_ENDPOINT = `${SETTINGS_API_ENDPOINT}/permission/users-permission`;
export const CHANGE_USER_PERMISSIONS_ENDPOINT = `${SETTINGS_API_ENDPOINT}/permission/change-user-permission`;
export const CHANGE_USER_STATUS_ENDPOINT = `${SETTINGS_API_ENDPOINT}/permission/change-user-status`;

export const APP_ALL_TEXTS_ENDPOINT = `${PUBLIC_API_ENDPOINT}/appdatatext/list`;
export const YEAR_REPRESENTATION_ENDPOINT = "common/year-representation/list";

export const SUPPLIERS_SELECT_ENDPOINT = `${SUPPLIERS_ENDPOINT}/select`;
export const SUPPLIERS_YEARS_ENDPOINT = `${SUPPLIERS_ENDPOINT}/year-representation/list`;

export const SUPPLIERS_CHAIN_ENDPOINT = `${SUPPLIERS_ENDPOINT}/chain`;
export const SUPPLIERS_ALLOCATION_UPDATE_ENDPOINT = `${SUPPLIERS_CHAIN_ENDPOINT}/update`;

export const SUPPLIERS_DICTIONARIES_ENDPOINT = `${SUPPLIERS_ENDPOINT}/dictionaries`;
export const SUPPLIERS_CATEGORIES_ENDPOINT = `${SUPPLIERS_DICTIONARIES_ENDPOINT}/categories`;
export const SUPPLIERS_TYPES_ENDPOINT = `${SUPPLIERS_DICTIONARIES_ENDPOINT}/types`;

export const SUPPLIERS_INVITATIONS_ENDPOINT = `${SUPPLIERS_ENDPOINT}/invitation`;
export const SUPPLIER_INVITATION_SEND_ENDPOINT = `${SUPPLIERS_INVITATIONS_ENDPOINT}/send`;
export const SUPPLIERS_INVITATIONS_CHAIN_ENDPOINT = `${SUPPLIERS_INVITATIONS_ENDPOINT}/chain`;
export const AVAILABLE_SUPPLIERS_ENDPOINT = `${SUPPLIERS_INVITATIONS_CHAIN_ENDPOINT}/available/suppliers`;
export const SUPPLIER_INVITATION_INFO_ENDPOINT = `${SUPPLIERS_INVITATIONS_CHAIN_ENDPOINT}/info`;

export const PRODUCT_ENDPOINT = `${SETTINGS_API_ENDPOINT}/products`;
export const PRODUCT_VARIANTS_ENDPOINT = `${SETTINGS_API_ENDPOINT}/products/variants`;

export const PERFORMANCE_AVAILABLE_SUPPLIERS_ENDPOINT = `${TRACE_PERFORMANCE_ENDPOINT}/supplychane/availablesupplier/count`;
export const PERFORMANCE_TEMPERATURE_ALIGNMENT_ENDPOINT = `${TRACE_PERFORMANCE_ENDPOINT}/temperaturealignment`;

export const IMPACT_PERFORMANCE_YEARS_ENDPOINT = `${IMPACT_PERFORMANCE_ENDPOINT}/years`;

export const IMPACT_DATA_EMISSION_ENDPOINT = `${PRIVATE_API_ENDPOINT}/impactm`;
export const EMISSION_OVERVIEW_ENDPOINT = `${IMPACT_DATA_EMISSION_ENDPOINT}/get-chart-data`;

export const BILLING_ENDPOINT = `billing/get`;
export const BANKACCOUN_ENDPOINT = `billing/getbankaccounts`;

export const AUTHAPIMODELITEMLIST = `private/auth/getcontentauthorization`;
