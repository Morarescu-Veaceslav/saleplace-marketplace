import { ProductStatus } from "@/graphql/generated/output";
import { z } from "zod";

export const PRODUCT_STATUS = {
    DRAFT: "DRAFT",
    ACTIVE: "ACTIVE",
    ARCHIVED: "ARCHIVED",
} as const

export const updateProductSchema = z.object({
    productId: z.string(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0.01, "Price must be greater than 0").refine((val) => Number.isInteger(val * 100),
        { message: 'Max 2 decimal places allwed' }).positive("Price must be greater than 0"),
    categoryId: z.string().min(1, "Select category"),
     status: z.nativeEnum(ProductStatus),
});

export type TypeUpdateProductSchema = z.infer<typeof updateProductSchema>;