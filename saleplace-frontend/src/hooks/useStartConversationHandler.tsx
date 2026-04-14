'use client'

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useStartConversationMutation } from "@/graphql/generated/output"
import { parseApolloMessage } from "@/utils/gqlError"
import { useTranslations } from "next-intl"

type Props = {
    t: (key: string) => string
}

export function useStartConversationHandler() {
    const t = useTranslations('layout.header.sidebar.profileNav')
    const router = useRouter()

    const [startConversation, { loading }] = useStartConversationMutation({
        update(cache, { data }) {
            const newConv = data?.startConversation
            if (!newConv) return

            cache.modify({
                fields: {
                    getConversations(existing = [], { readField, toReference }) {
                        const exists = existing.some(
                            (ref: any) => readField('id', ref) === newConv.id
                        )

                        if (exists) return existing

                        const newRef = toReference(newConv, true)
                        return [newRef, ...existing]
                    },
                },
            })
        },
        onError(error) {
            toast.error(t(`startConversation.${parseApolloMessage(error).code}`));
        }
    })

    const handleStartConversation = async (userId: string) => {
        const { data } = await startConversation({
            variables: { data: { userId } },
        })

        if (data?.startConversation?.id) {
            router.push(
                `/${data.startConversation.participant.username}/messages/${data.startConversation.id}`
            )
        }
    }

    return {
        handleStartConversation,
        isLoadingStartConversation: loading,
    }
}