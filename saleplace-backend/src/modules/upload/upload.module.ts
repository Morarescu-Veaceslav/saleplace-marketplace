import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { ProfileModule } from '../auth/profile/profile.module';
import { ProductImagesModule } from '../product-images/product-images.module';

@Module({
  imports: [ProfileModule, ProductImagesModule],
  controllers: [UploadController,],
  providers: [UploadService],
})
export class UploadModule { }
