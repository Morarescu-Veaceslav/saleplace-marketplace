'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/common/DropdownMenu"
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal"
import { UserAvatar } from "@/components/ui/elements/UserAvatar"
import { useBlockUserMutation, useDeleteConversationMutation } from "@/graphql/generated/output"
import { parseApolloMessage } from "@/utils/gqlError"
import { ApolloCache, Reference, StoreObject } from "@apollo/client"
import { MoreVertical } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

type ModalAction = {
    heading: string
    message: string
    onConfirm: () => Promise<void>
} | null

export function ConversationItem({ conversation }: { conversation: any }) {
    const t = useTranslations('profile.chat.cahtMenu')
    const { id, participant, lastMessage, unreadCount } = conversation
    const [modalAction, setModalAction] = useState<ModalAction | null>(null)

    const [deleteConversation] = useDeleteConversationMutation({
        update(cache, _, { variables }) {
            const conversationId = variables?.conversationId;
            if (!conversationId) return;
            removeConversationFromCache(cache, { conversationId });
        },
        onError(error) {
            toast.error(t(`conversation.${parseApolloMessage(error).code}`))
        }
    });

    const [blockUser] = useBlockUserMutation({
        update(cache, { data }) {
            const newBlockedUser = data?.blockUser;
            if (!newBlockedUser) return;

            removeConversationFromCache(cache, {
                participantId: newBlockedUser.id,
            });

            cache.modify({
                fields: {
                    getBlockUser(existing = { items: [], total: 0 }, { toReference }) {
                        return {
                            ...existing,
                            items: [
                                toReference({
                                    __typename: "BlockUser",
                                    ...newBlockedUser,
                                }),
                                ...existing.items,
                            ],
                            total: existing.total + 1,
                        };
                    },
                },
            });
        },
        onError(error) {
            toast.error(t(`blockUser.${parseApolloMessage(error).code}`));
        },
    });

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setModalAction({
            heading: t('conversation.heading'),
            message: t('conversation.message'),
            onConfirm: async () => {
                await deleteConversation({ variables: { conversationId: id } })
            },
        })
    }

    const handleBlock = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setModalAction({
            heading: t('blockUser.heading'),
            message: t('blockUser.message'),
            onConfirm: async () => {
                await blockUser({
                    variables: { blockedId: participant.id }
                })
            }
        })
    }

    return (
        <>
            <Link
                href={`messages/${id}`}
                className="flex items-center gap-3 p-3 hover:bg-accent rounded-sm"
            >
                <UserAvatar user={participant} />

                <div className="flex flex-1 items-center gap-2 min-w-0">

                    <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">
                            {participant.username}
                        </div>

                        <div className="text-xs text-muted-foreground truncate">
                            {lastMessage?.content}
                        </div>
                    </div>

                    {unreadCount > '0' && (
                        <span className="text-xs bg-destructive text-white px-2 py-1 rounded-full shrink-0">
                            {unreadCount}
                        </span>
                    )}

                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            onClick={(e) => e.preventDefault()}
                            className="p-1 "
                        >
                            <MoreVertical size={16} />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={(e) => handleDelete(e)}>
                            {t('conversation.deleteChat')}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={(e) => handleBlock(e)}>
                            {t('blockUser.block')}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Link >

            <ConfirmModal
                open={!!modalAction}
                onOpenChange={(open) => !open && setModalAction(null)}
                heading={modalAction?.heading || ''}
                message={modalAction?.message || ''}
                onConfirm={async () => {
                    if (!modalAction) return
                    await modalAction.onConfirm()
                    setModalAction(null)
                }}
            />
        </>
    )
}

export function removeConversationFromCache(
    cache: ApolloCache<any>,
    options: { conversationId?: string; participantId?: string }
) {
    const { conversationId, participantId } = options;

    if (!conversationId && !participantId) return;

    cache.modify({
        fields: {
            getConversations(existing = [], { readField }) {
                return existing.filter((convRef: Reference) => {

                    if (conversationId) {
                        const id = readField('id', convRef) as string | undefined;
                        if (id === conversationId) return false;
                    }

                    if (participantId) {
                        const participantRef = readField('participant', convRef) as StoreObject | undefined;
                        if (participantRef) {
                            const participantIdFromCache = readField('id', participantRef) as string | undefined;
                            if (participantIdFromCache === participantId) return false; 
                        }
                    }

                    return true;
                });
            },
        },
    });
}