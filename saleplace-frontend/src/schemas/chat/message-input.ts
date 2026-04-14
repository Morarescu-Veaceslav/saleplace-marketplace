import z from "zod";

export const messageInputSchema = z.object({
    content: z.string().min(1)
})

export type TypeMessageInputSchema = z.infer<typeof messageInputSchema>