import { Injectable, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { PRODUCT_VIEW_EVENT, ProductViewEventPayload } from "./product-view.event";

@Injectable()
export class ProductViewEventListener implements OnModuleInit {
    constructor(
        private readonly eventBus: EventbusService,
        private readonly prismaService: PrismaService,

    ) { }

    onModuleInit() {
        this.eventBus.on(PRODUCT_VIEW_EVENT, this.handleProductViewed);
    }

    private handleProductViewed = async (payload: ProductViewEventPayload) => {
        await this.prismaService.product.update({
            where: { id: payload.productId },
            data: { views: { increment: 1 } },
        });
    }
}