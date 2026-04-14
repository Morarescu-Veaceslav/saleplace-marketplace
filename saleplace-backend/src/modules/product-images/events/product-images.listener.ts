import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { EventbusService } from "src/core/eventbus/eventbus.service";
import { StorageService } from "src/modules/libs/storage/storage.service";
import { PRODUCT_IMAGES_DELETED_EVENT, ProductImageDeletedEvent } from "./product-image.event";

@Injectable()
export class ProductImageEventListener implements OnModuleInit {
    private readonly logger = new Logger(ProductImageEventListener.name);

    constructor(
        private readonly eventBus: EventbusService,
        private readonly storage: StorageService,
    ) { }

    onModuleInit() {
        this.eventBus.on(PRODUCT_IMAGES_DELETED_EVENT, this.handleImagesDeleted);
    }

    private handleImagesDeleted = async (payload: ProductImageDeletedEvent) => {
        const results = await Promise.allSettled(
            payload.urls.map(url => this.storage.deleteImage(url))
        );

        results.forEach((r, i) => {
            if (r.status === 'rejected') {
                this.logger.error(`Failed to delete ${payload.urls[i]}`, r.reason);
            }
        });
    }
}