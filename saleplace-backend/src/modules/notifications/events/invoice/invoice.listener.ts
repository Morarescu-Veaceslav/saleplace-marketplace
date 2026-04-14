import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { NotificationsService } from "../../notifications.service";
import { INVOICE_PAID_EVENT, InvoicePaidEventPayload } from "./invoice.events";

@Injectable()
export class InvoiceEventListener implements OnModuleInit {
    constructor(
        private readonly eventBus: EventbusService,
        private readonly notificationsService: NotificationsService,
    ) { }

    onModuleInit() {
        this.eventBus.on(INVOICE_PAID_EVENT, this.handleInvoicePaid);
    }

    private handleInvoicePaid = async (payload: InvoicePaidEventPayload) => {
        await this.notificationsService.createInvoicePaidNotification({
            userId: payload.userId,
            invoiceId: payload.invoiceId,
            subscriptionId: payload.subscriptionId,
        });
    };
}