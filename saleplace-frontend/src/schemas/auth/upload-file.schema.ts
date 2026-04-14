import { MAX_FILE_SIZE } from '@/libs/constants/url.constants'
import { z } from 'zod'

export const uploadeFileSchema = z.object({
    file: z.union([
        z.instanceof(File).refine(file => file.size <= MAX_FILE_SIZE),
        z.string().transform(value => (value === '' ? undefined : value))
    ]).optional()
})

export type TypeUploadeFileSchema = z.infer<typeof uploadeFileSchema>