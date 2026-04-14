import z from "zod";

export const socialLinksSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1),

    url: z
        .string()
        .trim()
        .min(1)
        .url(),
});

export type TypeSocialLinksSchema = z.infer<typeof socialLinksSchema>