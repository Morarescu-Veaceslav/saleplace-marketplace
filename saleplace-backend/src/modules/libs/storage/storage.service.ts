import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import sharp from 'sharp';
import { GraphQLError } from 'graphql';
@Injectable()
export class StorageService {
    private readonly bucket: string;

    constructor(private readonly configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.getOrThrow<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.getOrThrow<string>('CLOUDINARY_API_SECRET'),
        });

        this.bucket = this.configService.getOrThrow<string>('CLOUDINARY_BUCKET') || '';
    }

    async uploadImage(buffer: Buffer, publicId: string, folder?: string): Promise<UploadApiResponse> {


        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: `SalePlace/${folder}`,
                    public_id: publicId,
                    format: 'webp',
                    overwrite: true,
                },
                (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error('No result from Cloudinary'));
                    resolve(result);
                }
            );
            stream.end(buffer);
        });
    }


    async deleteImage(dbValue: string): Promise<{ result: string }> {
        const parts = dbValue.split('/');
        if (parts.length < 2) {
            throw new GraphQLError('Invalid avatar reference format.', {
                extensions: {
                    code: 'INVALID_AVATAR_REFERENCE',
                },
            })
        }

        const publicId = parts.slice(1).join('/');
        return cloudinary.uploader.destroy(publicId);
    }

    // async uploadFile(file: FileUpload, folder: string, width: number, height: number): Promise<string> {
    //     const { createReadStream, filename } = file
    //     const stream = createReadStream()
    //     const chunks: Buffer[] = []

    //     for await (const chunk of stream) chunks.push(chunk)
    //     const buffer = Buffer.concat(chunks)

    //     const processedBuffer = await sharp(buffer, { animated: true })
    //         .resize(width, height, { fit: 'inside' })
    //         .webp()
    //         .toBuffer()

    //     const upload = await this.uploadImage(processedBuffer, filename, folder)
    //     return `v${upload.version}/${upload.public_id}`
    // }
}
