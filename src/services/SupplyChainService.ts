import axios, { AxiosResponse } from "axios";
import queryString from "query-string";

import {
  AVAILABLE_SUPPLIERS_ENDPOINT,
  SUPPLIERS_ALLOCATION_UPDATE_ENDPOINT,
  SUPPLIERS_CATEGORIES_ENDPOINT,
  SUPPLIERS_CHAIN_ENDPOINT,
  SUPPLIERS_ENDPOINT,
  SUPPLIERS_INVITATIONS_CHAIN_ENDPOINT,
  SUPPLIERS_SELECT_ENDPOINT,
  SUPPLIERS_TYPES_ENDPOINT,
  SUPPLIERS_YEARS_ENDPOINT,
  SUPPLIER_INVITATION_INFO_ENDPOINT,
  SUPPLIER_INVITATION_SEND_ENDPOINT,
} from "../constants";
import { errorHandler } from "../helpers/errorHandler";
import {
  SupplierAllocation,
  SupplierAllocations,
  SuppliersYears,
  SupplierType,
} from "../pages/manage-suppliers/models";
import { NewSupplierData } from "../pages/manage-suppliers/SupplyChain/models";
import {
  Pageable,
  ServerResponseType,
  ServiceResponseType,
  Sortable,
  YearRepresentationOption,
} from "../models/Api.model";
import {
  AvailableSuppliers,
  SupplierInvitationInfo,
} from "../pages/manage-suppliers/SuppliersInvitations/models";

type SuppliersChainData = {
  supplier: Record<string, string | number>;
  supplyChainId: number;
};

type SuppliersInvitationsData = {
  supplyChainId: number;
  supplierContactEmail?: string;
  supplierInvitationDate?: string;
  amount?: number;
  currency?: string;
  supplier: {
    companyId: number;
    companyName: string;
  };
  supplierInvitationStatus: {
    id: number;
    value: string;
  };
};

type SuppliersTypeCategoryData = {
  id: number;
  value: string;
};

const SupplyChainService = {
  getSuppliersList: async (query: string = "") => {
    try {
      const response = await axios.get(`${SUPPLIERS_SELECT_ENDPOINT}?query=${query}`);
      return response.data.map(
        ({ companyName, companyId }: SupplierType) => ({
          companyName: {
            label: companyName,
            value: companyName,
          },
          companyId,
        }),
      );
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  addSupplier: async (
    body: NewSupplierData,
  ): Promise<ServiceResponseType<{}>> => {
    try {
      await axios.post(SUPPLIERS_ENDPOINT, body);
      return {};
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  addAllocation: async (
    supplyChainId: number,
    body: Omit<SupplierAllocation, "supplierAllocationId">,
  ): Promise<ServiceResponseType<SupplierAllocation[]>> => {
    try {
      await axios.post<SupplierAllocation[]>(
        `${SUPPLIERS_CHAIN_ENDPOINT}/${supplyChainId}/allocation`,
        body,
      );
      return {};
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getAllocation: async (
    supplyChainId: number,
  ): Promise<ServiceResponseType<SupplierAllocations>> => {
    try {
      const { data } = await axios.get(
        `${SUPPLIERS_CHAIN_ENDPOINT}/${supplyChainId}/allocation`,
      );
      return { data };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  updateAllocation: async (
    body: SupplierAllocation,
  ): Promise<ServiceResponseType<SupplierAllocations>> => {
    try {
      await axios.post(
        `${SUPPLIERS_ALLOCATION_UPDATE_ENDPOINT}/allocation`,
        body,
      );
      return {};
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  deleteAllocation: async (
    supplyAllocationId: number,
  ): Promise<ServiceResponseType<SupplierAllocations>> => {
    try {
      await axios.delete(
        `${SUPPLIERS_CHAIN_ENDPOINT}/${supplyAllocationId}/allocation`,
      );
      return {};
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getSuppliersChain: async (
    body: {
      companyId: number;
      yearRepresentationId: number;
    } & Pageable &
      Sortable,
  ) => {
    try {
      const chain = await axios.get(
        `${SUPPLIERS_CHAIN_ENDPOINT}?${queryString.stringify(body)}`,
      );

      const allocations: AxiosResponse<ServerResponseType<SupplierAllocation[]>>[] = await Promise.all(
        chain.data.content.map(
          async ({ supplyChainId }: SuppliersChainData) =>
            await axios.get(
              `${SUPPLIERS_CHAIN_ENDPOINT}/${supplyChainId}/allocation`,
            ),
        ),
      );

      return {
        ...chain.data,
        content: chain.data.content.map(
          (
            {
              supplier: { companyName, ...data },
              supplyChainId,
            }: SuppliersChainData,
            index: number,
          ) => ({
            ...data,
            supplyChainId,
            supplierId: companyName,
            supplierAllocations: allocations[index].data,
          }),
        ),
      };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getSuppliersYears: async (
    companyId: number,
  ): Promise<ServiceResponseType<SuppliersYears[]>> => {
    try {
      const { data } = await axios.get(
        `${SUPPLIERS_YEARS_ENDPOINT}?${queryString.stringify({
          companyId,
        })}`,
      );
      return { data };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getSuppliersCategories: async (): Promise<ServiceResponseType<SuppliersTypeCategoryData[]>> => {
    try {
      const { data } = await axios.get<SuppliersTypeCategoryData[]>(
        SUPPLIERS_CATEGORIES_ENDPOINT,
      );
      return { data };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getSuppliersTypes: async (): Promise<ServiceResponseType<SuppliersTypeCategoryData[]>> => {
    try {
      const { data } = await axios.get<SuppliersTypeCategoryData[]>(
        SUPPLIERS_TYPES_ENDPOINT,
      );
      return { data };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  deleteSupplierChain: async (selectedChains: number[]) => {
    try {
      await Promise.all(
        selectedChains.map(
          async (id: number) =>
            await axios.delete(`${SUPPLIERS_CHAIN_ENDPOINT}/${id}`),
        ),
      );
      return { error: undefined };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getSuppliersInvitations: async (
    body: {
      companyId: number;
    } & Pageable &
      Sortable,
  ) => {
    try {
      const chain = await axios.get(
        `${SUPPLIERS_INVITATIONS_CHAIN_ENDPOINT}?${queryString.stringify(body)}`,
      );
      return {
        ...chain.data,
        content: chain.data.content.map(
          ({
             supplierContactEmail,
             supplierInvitationDate,
             supplyChainId,
             amount,
             currency,
             supplier: { companyName, companyId },
             supplierInvitationStatus,
           }: SuppliersInvitationsData) => ({
            supplyChainId,
            supplierContactEmail,
            supplierInvitationDate,
            amount,
            currency,
            companyName,
            supplierId: companyId,
            supplierInvitationStatus: supplierInvitationStatus?.value,
          }),
        ),
      };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  updateEmail: async (supplierChainId: number, email: string) => {
    try {
      await axios.post(
        `${SUPPLIERS_INVITATIONS_CHAIN_ENDPOINT}/${supplierChainId}`,
        { email },
      );
      return { error: undefined };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getAvailableSuppliers: async (): Promise<ServiceResponseType<AvailableSuppliers[]>> => {
    try {
      const { data } = await axios.get(AVAILABLE_SUPPLIERS_ENDPOINT);
      return { data };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  getSupplierInvitationInfo: async (
    supplyChainId: number,
  ): Promise<ServiceResponseType<SupplierInvitationInfo>> => {
    try {
      const { data } = await axios.get(
        `${SUPPLIER_INVITATION_INFO_ENDPOINT}/${supplyChainId}`,
      );
      return { data };
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
  sendInvitationMessage: async (
    body: SupplierInvitationInfo,
  ): Promise<ServiceResponseType<{}>> => {
    try {
      await axios.post(SUPPLIER_INVITATION_SEND_ENDPOINT, body);
      return {};
    } catch (e: unknown) {
      return errorHandler(e);
    }
  },
};

export default SupplyChainService;
