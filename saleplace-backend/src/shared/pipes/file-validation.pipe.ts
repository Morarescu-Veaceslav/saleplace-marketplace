import { PipeTransform, ArgumentMetadata, BadRequestException, Injectable } from '@nestjs/common';
//import { FileUpload } from 'graphql-upload';
import { ReadStream } from 'fs';
import { validateFileFormat, validateFileSize } from '../utils/file.util';
import { GraphQLError } from 'graphql';

@Injectable()
export class FileValidationPipe implements PipeTransform {
    public async transform(value: any, metadata: ArgumentMetadata) {
        if (!value || !value.filename) {
            throw new GraphQLError('File not loaded.', {
                extensions: {
                    code: 'FILE_ERROR',
                },
            });
        }

        const { filename, createReadStream } = value;

        const allowedFileFormats = ['jpg', 'jpeg', 'png', 'webp'];
        if (!validateFileFormat(filename, allowedFileFormats)) {
            throw new GraphQLError('File must be jpg, jpeg, or png.', {
                extensions: {
                    code: 'FILE_FORMAT_ERROR',
                },
            });
        }


        const fileStream = createReadStream() as ReadStream;
        const isFileSizeValid = await validateFileSize(fileStream, 10 * 1024 * 1024);
        if (!isFileSizeValid) {
            throw new GraphQLError('File size exceeds 10 MB.', {
                extensions: {
                    code: 'FILE_SIZE_ERROR',
                },
            });
        }

        return value;
    }
}
