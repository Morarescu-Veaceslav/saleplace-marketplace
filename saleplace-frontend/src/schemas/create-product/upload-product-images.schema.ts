import { z } from 'zod'
import { MAX_FILE_SIZE } from '@/libs/constants/url.constants'

export const uploadProductImagesSchema = z.object({
    files: z
        .array(
            z.object({
                id: z.string(),

                file: z
                    .instanceof(File, {
                        message: "invalidFile",
                    })
                    .refine(file => file.size <= MAX_FILE_SIZE, {
                        message: "fileTooLarge",
                    })
                    .refine(
                        file =>
                            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
                        {
                            message: "invalidFileType",
                        }
                    ),
            })
        )
        .min(1, { message: "minFiles" })
        .max(10, { message: "maxFiles" }),
})

export type TypeUploadProductImagesSchema =
    z.infer<typeof uploadProductImagesSchema>