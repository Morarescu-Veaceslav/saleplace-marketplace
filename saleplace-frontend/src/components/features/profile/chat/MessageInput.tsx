'use client'

import { Button } from "@/components/ui/common/Button"
import { useSendMessageMutation } from "@/graphql/generated/output"
import { messageInputSchema, type TypeMessageInputSchema } from "@/schemas/chat/message-input"
import { parseApolloMessage } from "@/utils/gqlError"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface MessageInputProps {
    conversationId: string
}
export function MessageInput({ conversationId }: MessageInputProps) {
    const t = useTranslations('profile.chat.sendMessage')
    const form = useForm<TypeMessageInputSchema>({
        resolver: zodResolver(messageInputSchema),
        values: {
            content: ''
        }
    })

    const [sendMessage, { loading }] = useSendMessageMutation({
        onError(error) {
            toast.error(t(`${parseApolloMessage(error).code}`))
        }
    })

    const onSubmit = async (data: TypeMessageInputSchema) => {
        if (!data.content.trim()) return

        await sendMessage({
            variables: {
                conversationId,
                content: data.content,
            }
        })

        form.reset()
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <input
                {...form.register("content")}
                name="content"
                autoComplete="off"
                placeholder={t('placeholder')}
                className="flex-1 border rounded px-2 py-1"
            />
            <Button
                disabled={loading}
                variant='outline'
                type="submit"
                className="px-4 py-1"
            >
                <Send />
            </Button>
        </form>
    )
}