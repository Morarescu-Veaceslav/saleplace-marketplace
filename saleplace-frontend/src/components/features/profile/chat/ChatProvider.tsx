"use client";

import { useChatChangeSubscription, useMarkConversationAsReadMutation } from "@/graphql/generated/output";
import { useCurrent } from "@/hooks/useCurrent";
import { useParams } from "next/navigation";

export function ChatProvider() {
    const [markConversationAsRead] = useMarkConversationAsReadMutation();
    const { user } = useCurrent()

    const params = useParams();
    const activeConversationId = params?.conversationId;

    useChatChangeSubscription({
        onData: ({ client, data }) => {
            const payload = data.data?.chatChange;
            if (!payload) return;

            const { lastMessage, conversationId, participant, unreadCount } = payload;

            const isActiveChat = conversationId === activeConversationId;
            const isMyMessage = lastMessage.sender?.id === user?.id;


            if (isActiveChat && !isMyMessage) {
                markConversationAsRead({
                    variables: {
                        conversationId: payload.conversationId,
                    },
                });
            }

            client.cache.modify({
                fields: {
                    getConversations(existing = [], { readField, toReference }) {
                        const existingConv = existing.find(
                            (ref: any) => readField("id", ref) === conversationId
                        );

                        if (existingConv) {
                            client.cache.modify({
                                id: existingConv.__ref,
                                fields: {
                                    lastMessage() {
                                        return toReference(lastMessage, true);
                                    },
                                    updatedAt() {
                                        return lastMessage.createdAt;
                                    },
                                    unreadCount(existing = 0) {

                                        if (isActiveChat) return 0;
                                        if (isMyMessage) return existing;

                                        return unreadCount;
                                    },
                                },
                            });
                            return existing;
                        }

                        if (!participant) return existing;

                        const participantRef = toReference({
                            __typename: "UserModel",
                            ...participant,
                        }, true);

                        const newConversation = {
                            __typename: "ConversationListItemModel",
                            id: conversationId,
                            participant: participantRef,
                            lastMessage: toReference(lastMessage, true),
                            unreadCount, 
                            updatedAt: lastMessage.createdAt,
                        };

                        return [toReference(newConversation, true), ...existing];
                    },
                },
            });
        }
    })

    return null;
}