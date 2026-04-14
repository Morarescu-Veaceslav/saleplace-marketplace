import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { NotificationsService } from "../../notifications.service";
import { SUBSCRIPTION_DELETED_EVENT, SubscriptionDeletedEventPayload } from "./subscription-deleted.event";

@Injectable()
export class SubscriptionDeletedListener implements OnModuleInit {
    constructor(
        private readonly eventBus: EventbusService,
        private readonly notificationsService: NotificationsService,
    ) { }

    onModuleInit() {
        this.eventBus.on(SUBSCRIPTION_DELETED_EVENT, this.handleSubscriptionDeleted);
    }

    private handleSubscriptionDeleted = async (payload: SubscriptionDeletedEventPayload) => {
        await this.notificationsService.createSubscriptionDeletedNotification({
            userId: payload.userId,
            subscriptionId: payload.subscriptionId,
            canceledAt: payload.canceledAt,
        });
    };

}