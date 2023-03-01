export interface BillingModel {
  id: number;
  customer: number;
  address: string;
  subscription: string;
  periodFormatted: string;
  invoiceType: string;
  invoiceStatus: string;
  invoiceCurrency: string;
  invoiceDate: string;
  invoiceDueDate: string;
  invoiceDateFormatted: string;
  invoiceDueDateFormatted: string;
  invoiceAmount: string;
  invoiceReference: string;
  invoiceAmountFormatted: string;
  invoiceLineItems: InvoiceModel[];
}

export interface BankAccountModel {
  id: number;
  currency: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  bicCode: string;
  accountHolderAddress: string;
  country: string;
}

export interface InvoiceModel {
  id: number;
  invoiceItemText: number;
  invoiceItemCurrency: string;
  invoiceItemAmount: string;
  invoiceItemType: string;
  invoiceItemSequence: string;
  invoiceItemDisplayAmount: string;
}
