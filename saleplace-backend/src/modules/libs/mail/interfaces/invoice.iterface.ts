export interface InvoiceTemplateProps {
  to: string,
  invoiceId: string;
  planName: string;
  amount: number;
  currency: string;
  periodStart?: Date | null;
  periodEnd?: Date | null;
  invoiceUrl: string;
  invoicePdf: string
  issuedAt: Date
}
