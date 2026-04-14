import z from "zod";

export const createReviewInputSchema = z.object({
    productId: z.string().uuid(),

    rating: z.coerce
        .number()
        .min(1, "Minimum rating is 1")
        .max(5, "Maximum rating is 5"),

    comment: z
        .string()
        .max(1000).optional(),
})
export type TypeCreateReviewInputSchema = z.infer<typeof createReviewInputSchema>