export const INVOICE_PAID_EVENT = 'invoice.paid' as const;

export interface InvoicePaidEventPayload {
    invoiceId: string;
    userId: string;
    subscriptionId?: string | null;
  
}