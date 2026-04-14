'use client'

import {
    GetMessagesDocument,
    useGetMessagesQuery,
    useMarkConversationAsReadMutation,
    useMessageChangeSubscription,
} from "@/graphql/generated/output"
import { MessageItem } from "./chat-message-item"
import { useParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import { Button } from "@/components/ui/common/Button"
import { MessageInput } from "./MessageInput"
import { useTranslations } from "next-intl"
import { ChatSkeleton } from "./ChatSkeleton"
import { useAuth } from "@/hooks/useAuth"

export function ChatWindow() {

    const {isAuthenticated} = useAuth()
    const t = useTranslations('profile.chat')
    const params = useParams<{ conversationId: string }>()
    const conversationId = params.conversationId
    const TAKE = 10

    const { data, loading, fetchMore } = useGetMessagesQuery({
        variables: { conversationId, pagination: { take: TAKE, skip: 0 } },
        fetchPolicy: "network-only",
    })

    useMessageChangeSubscription({
        skip: !isAuthenticated,
        variables: { conversationId },
        onData: ({ client, data }) => {
            const payload = data.data?.messageChange;
            if (!payload) return;

            switch (payload.type) {
                case 'CREATE': {
                    client.cache.updateQuery(
                        {
                            query: GetMessagesDocument,
                            variables: { conversationId, pagination: { take: TAKE, skip: 0 } }
                        },
                        (prev) => {
                            if (!prev) return prev;
                            if (prev.getMessages.messages.some((m: any) => m.id === payload.id)) return prev;


                            const messages = [payload, ...prev.getMessages.messages];
                            messages.sort(
                                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                            );

                            return {
                                ...prev,
                                getMessages: {
                                    ...prev.getMessages,
                                    messages,
                                    totalCount: prev.getMessages.totalCount + 1
                                }
                            };
                        }
                    );


                    break;
                }

                case 'UPDATE': {
                    const cacheId = client.cache.identify({ __typename: 'MessageModel', id: payload.id });
                    client.cache.modify({
                        id: cacheId,
                        fields: {
                            content() { return payload.content; },
                            updatedAt() { return payload.updatedAt; }
                        }
                    });
                    break;
                }

                case 'DELETE': {
                    const cacheId = client.cache.identify({ __typename: 'MessageModel', id: payload.id });
                    client.cache.modify({
                        id: cacheId,
                        fields: {
                            content() { return payload.content; },
                            updatedAt() { return payload.updatedAt; },
                            deleted() { return payload.deleted; }
                        }
                    });
                    break;
                }
            }
        }
    });


    const loadMore = useCallback(async () => {
        if (!data) return

        await fetchMore({
            variables: {
                pagination: {
                    take: 3,
                    skip: data.getMessages.messages.length
                }
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev

                return {
                    ...prev,
                    getMessages: {
                        ...prev.getMessages,
                        messages: [
                            ...prev.getMessages.messages,
                            ...fetchMoreResult.getMessages.messages,
                        ],
                        totalCount: fetchMoreResult.getMessages.totalCount,
                    },
                }
            }
        })

    }, [data, fetchMore])

    const [markConversationAsRead] = useMarkConversationAsReadMutation({
        update(cache) {
            cache.modify({
                id: cache.identify({
                    __typename: "ConversationListItemModel",
                    id: conversationId
                }),
                fields: {
                    unreadCount() {
                        return 0
                    }
                }
            })
        }
    })

    useEffect(() => {
        if (!conversationId) return

        markConversationAsRead({
            variables: { conversationId }
        })
    }, [conversationId])

    return (
        <>
            {loading ? (
                <ChatSkeleton />
            ) : (
                <div className="flex w-full gap-4">
                    <div className="flex flex-col h-[calc(100vh-200px)] w-full max-w-3xl border rounded-md overflow-hidden">

                        {data && data.getMessages.messages.length < data?.getMessages.totalCount && (
                            <div className="flex justify-center">
                                <Button variant="link" onClick={loadMore}>
                                    {t('loadMore')}
                                </Button>
                            </div>
                        )}

                        <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse gap-2">
                            {data?.getMessages.messages.map((message, index) => (
                                <MessageItem key={message.id} message={message} />
                            ))}
                        </div>

                        <div className="border-t p-2">
                            <MessageInput conversationId={conversationId} />
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}