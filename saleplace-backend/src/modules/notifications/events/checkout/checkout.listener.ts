import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { NotificationsService } from "../../notifications.service";
import { ORDER_PAID_EVENT, OrderPaidEventPayload } from "./checkout.events";

@Injectable()
export class OrderPaidEventListener implements OnModuleInit {
    constructor(
        private readonly eventBus: EventbusService,
        private readonly notificationsService: NotificationsService,
    ) { }

    onModuleInit() {
        this.eventBus.on(ORDER_PAID_EVENT, this.handleOrderPaid);
    }

    private handleOrderPaid = async (payload: OrderPaidEventPayload) => {
       
        await this.notificationsService.createOrderPaidNotifications({
            buyerId: payload.buyerId,
            sellerId: payload.sellerId,
            orderId: payload.orderId,
            productId: payload.productId,
        });

    };
}