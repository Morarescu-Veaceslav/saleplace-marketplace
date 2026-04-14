import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { StorageModule } from '../libs/storage/storage.module';
import  "./enums/product-status.enum";
import { EventbusModule } from 'src/core/eventbus/eventbus.module';
import { ProductViewEventListener } from './events/product-view.listener';

@Module({
  imports: [StorageModule, EventbusModule],
  providers: [ProductResolver, ProductService, ProductViewEventListener],
  exports: [ProductService]
})
export class ProductModule { }
