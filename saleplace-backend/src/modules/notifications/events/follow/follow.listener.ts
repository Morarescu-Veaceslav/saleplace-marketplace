import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { FOLLOW_EVENT, FollowEventPayload } from "./follow.event";
import { NotificationsService } from "../../notifications.service";


@Injectable()
export class FollowEventListener implements OnModuleInit {
    constructor(
        private readonly eventBus: EventbusService,
        private readonly notificationsService: NotificationsService
    ) { }

    onModuleInit() {
        this.eventBus.on(FOLLOW_EVENT, this.handleFollow);
    }

    private handleFollow = async (payload: FollowEventPayload) => {

        const { followerId, followingId } = payload
        if (followerId === followingId) return

        await this.notificationsService.createFollowNotification(
            {
                actorId: followerId,
                userId: followingId
            })
    }
}