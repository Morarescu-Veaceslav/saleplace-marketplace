import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { NotificationsService } from "../../notifications.service";
import { ORDER_REFUNDED_FAILED_EVENT, OrderRefundedFailedEventPayload } from "./refund-failed.event";

@Injectable()
export class OrderRefundedEventListener implements OnModuleInit {
    constructor(
        private readonly eventBus: EventbusService,
        private readonly notificationsService: NotificationsService,
    ) { }

    onModuleInit() {
        this.eventBus.on(ORDER_REFUNDED_FAILED_EVENT, this.handleOrderRefundedFailed);
    }

    private handleOrderRefundedFailed = async (payload: OrderRefundedFailedEventPayload) => {

        await this.notificationsService.createOrderRefundedFailedNotifications({
            buyerId: payload.buyerId,
            sellerId: payload.sellerId,
            orderId: payload.orderId,
            productId: payload.productId,
        });

    };
}