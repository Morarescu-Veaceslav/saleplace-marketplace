import { Inject, Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class InvoiceEmailQueue {

    constructor(
        @Inject('EMAIL_QUEUE_INVOICE')
        private readonly queue: Queue,
    ) { }

    async sendInvoice(invoiceId: string): Promise<void> {

        await this.queue.add(
            'send-invoice',
            { invoiceId },
            {
                attempts: 5,
                backoff: { type: 'exponential', delay: 5000 },
                removeOnComplete: true,
            },
        );
    }
}
