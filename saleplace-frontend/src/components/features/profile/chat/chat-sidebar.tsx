'use client'

import { useGetConversationsQuery } from "@/graphql/generated/output";
import { ConversationItem } from "./conversation-item";
import { useTranslations } from "next-intl";
import { ChatUsersSkeleton } from "./ChatSkeleton";

export function ChatSidebar() {

    const t = useTranslations('profile.chat')
    const { data, loading } = useGetConversationsQuery()

    return (
        <div className="flex flex-col m-2">
            <div className="text-muted-foreground text-center m-3">
                {t('conversationList')}
            </div>

            {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                    <ChatUsersSkeleton key={i} />
                ))
            }

            {!loading &&
                data?.getConversations.map((conversation) => (

                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                    />
                ))
            }

        </div>
    )
}
