
import { UploadService } from './upload.service';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
  UnauthorizedException,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProfileService } from '../auth/profile/profile.service';
import { Authorization } from 'src/shared/decorators/auth.decorator';
import { ProductImagesService } from '../product-images/product-images.service';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService,
    private readonly profileService: ProfileService,
    private readonly productImagesService: ProductImagesService
  ) { }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (_, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, unique + extname(file.originalname));
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new BadRequestException('Invalid file type'), false);
        }
        cb(null, true);
      },
    }),
  )

  @Authorization()
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: any,) {

    if (!file) {
      throw new BadRequestException({
        message: 'File not provided',
        code: 'FILE_ERROR',
      })
    }
    const userId = req.session.userId;

    if (!userId) {
      throw new UnauthorizedException({
        message: 'User not authenticated',
        code: 'USER_NOT_FOUND',
      })
    }

    const avatarUrl = await this.uploadService.processAvatar(file);

    const updatedUser = await this.profileService.setCustomAvatar(
      userId,
      avatarUrl,
    );

    return updatedUser
  }


  @Post('product-images')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (_, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, unique + extname(file.originalname));
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new BadRequestException({
            message: 'Invalid file type',
            code: 'INVALID_FILE_TYPE',
          }), false);
        }
        cb(null, true);
      },
    }),
  )


  @Authorization()
  async uploadProductImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('productId') productId: string,
    @Req() req: any,
  ) {

    if (!files || files.length === 0) {
      throw new BadRequestException({
        message: 'Files not provided',
        code: 'FILE_ERROR',
      })
    }

    const userId = req.session.userId

    if (!userId) {
      throw new UnauthorizedException({
        message: 'User not authenticated',
        code: 'USER_NOT_FOUND',
      })
    }

    const images = await this.uploadService.processProductImages(files)

    const productImages = await this.productImagesService.saveProductImages(
      productId,
      images,
      userId
    )

    return productImages
  }

}
