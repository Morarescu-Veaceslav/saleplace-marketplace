import { Module } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { ProductImagesResolver } from './product-images.resolver';
import { StorageModule } from '../libs/storage/storage.module';
import { EventbusModule } from 'src/core/eventbus/eventbus.module';
import { ProductImageEventListener } from './events/product-images.listener';

@Module({
  imports: [StorageModule, EventbusModule],
  providers: [ProductImagesResolver, ProductImagesService, ProductImageEventListener],
  exports: [ProductImagesService]
})
export class ProductImagesModule { }
