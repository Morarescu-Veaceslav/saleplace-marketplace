import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import * as fs from 'fs';

@Injectable()
export class UploadService {

  async processAvatar(file: Express.Multer.File) {
    try {
      const buffer = await sharp(file.path)
        .resize(512, 512)
        .webp({ quality: 90 })
        .toBuffer();

      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'avatars' },
          (error, result) => {
            if (error) {
              reject(
                new Error('AVATAR_UPLOAD_FAILED')
              )
            } else {
              resolve(result)
            }

          },
        );

        stream.end(buffer);
      });

      fs.unlinkSync(file.path);

      return {
        publicId: result.public_id,
        version: result.version,
      };
    } catch (error) {
      throw new BadRequestException({
        message: 'Avatar upload failed',
        code: 'AVATAR_UPLOAD_FAILED',
      })
    }
  }


  async processProductImages(files: Express.Multer.File[]) {
    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const buffer = await sharp(file.path)
            .resize(1200, 1200) 
            .webp({ quality: 85 })
            .toBuffer()

          const result = await new Promise<any>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: 'products' },
              (error, result) => {
                if (error) {
                  reject(new Error('PRODUCT_IMAGE_UPLOAD_FAILED'))
                } else {
                  resolve(result)
                }
              },
            )

            stream.end(buffer)
          })

          fs.unlinkSync(file.path)

          return {
            publicId: result.public_id,
            version: result.version,
            url: result.secure_url,
          }
        })
      )

      return results
    } catch (error) {
      throw new BadRequestException({
        message: 'Product images upload failed',
        code: 'PRODUCT_IMAGE_UPLOAD_FAILED',
      })
    }
  }
}
