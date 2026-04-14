import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { NotificationsService } from "../../notifications.service";
import { ORDER_REFUNDED_EVENT, OrderRefundedEventPayload } from "./refund.event";

@Injectable()
export class OrderRefundedEventListener implements OnModuleInit {
    constructor(
        private readonly eventBus: EventbusService,
        private readonly notificationsService: NotificationsService,
    ) { }

    onModuleInit() {
        this.eventBus.on(ORDER_REFUNDED_EVENT, this.handleOrderRefunded);
    }

    private handleOrderRefunded = async (payload: OrderRefundedEventPayload) => {

        await this.notificationsService.createOrderRefundedNotifications({
            buyerId: payload.buyerId,
            sellerId: payload.sellerId,
            orderId: payload.orderId,
            productId: payload.productId,
        });

    };
}