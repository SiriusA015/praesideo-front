import { STATUS } from "../../../constants";

export type SupplierData = {
  supplyChainId: number;
  companyName: string;
  supplierId: number;
  supplierInvitationStatus: STATUS;
  supplierInvitationDate?: number;
  amount?: number;
  supplierContactEmail?: string;
  currency?: string;
};

export type AvailableSuppliers = {
  supplyChainId: number;
  email: string;
  name: string;
};

type Recipient = {
  email: string;
  name: string;
  supplyChainId: number;
};

export type SupplierInvitationInfo = {
  subject: string;
  body: string;
  cc: Recipient[];
  to: Recipient;
};
