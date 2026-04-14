import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { NotificationsService } from "../../notifications.service";
import { POST_CREATE_EVENT, PostCreatedEventPayload } from "./post.event";
import { PrismaService } from "src/core/prisma/prisma.service";


@Injectable()
export class PostEventListener implements OnModuleInit {
    constructor(
        private readonly eventBus: EventbusService,
        private readonly notificationsService: NotificationsService,
        private readonly prismaService: PrismaService
    ) { }

    onModuleInit() {
        this.eventBus.on(POST_CREATE_EVENT, this.handleProductCreated);
    }

    private handleProductCreated = async (payload: PostCreatedEventPayload) => {

        const { postId, authorId } = payload

        const followers = await this.prismaService.follow.findMany({
            where: { followingId: authorId },
            select: { followerId: true },
        });

        if (followers.length === 0) return

        await this.notificationsService.createPostNotifications(
            {
                actorId: authorId,
                postId,
                userIds: followers.map(f => f.followerId)
            }
        )
    }
}