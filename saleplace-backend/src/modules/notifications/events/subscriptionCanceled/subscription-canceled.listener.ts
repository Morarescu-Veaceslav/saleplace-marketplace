import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { NotificationsService } from "../../notifications.service";
import { SUBSCRIPTION_CANCELED_EVENT, SubscriptionCanceledEventPayload } from "./subscription-canceled.event";

@Injectable()
export class SubscriptionCanceledListener implements OnModuleInit {
    constructor(
        private readonly eventBus: EventbusService,
        private readonly notificationsService: NotificationsService,
    ) { }

    onModuleInit() {
        this.eventBus.on(SUBSCRIPTION_CANCELED_EVENT, this.handleSubscriptionCanceled);
    }

    private handleSubscriptionCanceled = async (
        payload: SubscriptionCanceledEventPayload,
    ) => {
        await this.notificationsService.createSubscriptionCanceledNotification({
            userId: payload.userId,
            subscriptionId: payload.subscriptionId,
            canceledAtPeriodEnd: payload.canceledAtPeriodEnd,
        });
    };

}