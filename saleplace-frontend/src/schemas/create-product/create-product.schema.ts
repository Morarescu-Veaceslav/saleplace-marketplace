import { z } from "zod";

export const createProductSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0.01, "Price must be greater than 0").refine((val) => Number.isInteger(val * 100),
        { message: 'Max 2 decimal places allwed' }).positive("Price must be greater than 0"),
    categoryId: z.string().min(1, "Select category"),
});

export type TypeCreateProductSchema = z.infer<typeof createProductSchema>;