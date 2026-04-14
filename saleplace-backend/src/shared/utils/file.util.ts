import { ReadStream } from "fs"

export function validateFileFormat(
    fileName: string,
    allowedFileFormats: string[]
) {
    const fileParts = fileName.split('.');
    const extension = fileParts[fileParts.length - 1].toLowerCase();
    return allowedFileFormats.map(f => f.toLowerCase()).includes(extension);
}

export async function validateFileSize(
    fileStream: ReadStream,
    allowedFileSizeInBytes: number
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        let fileSizeInBytes = 0;

        fileStream.on('data', (chunk: Buffer | string) => {
            fileSizeInBytes += typeof chunk === 'string' ? Buffer.byteLength(chunk) : chunk.byteLength;
        });

        fileStream.on('end', () => resolve(fileSizeInBytes <= allowedFileSizeInBytes));
        fileStream.on('error', reject);
    });
}