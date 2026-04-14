'use client'

import { ConfirmModal } from "@/components/ui/elements/ConfirmModal"
import { UserAvatar } from "@/components/ui/elements/UserAvatar"
import { useDeleteMessageMutation, useEditMessageMutation } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { parseApolloMessage } from "@/utils/gqlError"
import { parseMessageTime } from "@/utils/parse-time"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"

interface MessageItemProps {
    message: any
}
export function MessageItem({ message }: MessageItemProps) {
    const t = useTranslations('profile.chat')
    const { user } = useCurrent()
    const isMe = message.sender.id === user?.id
    const [open, setOpen] = useState(false)
    const [editing, setEditing] = useState(false)
    const [value, setValue] = useState(message.content)

    const startEdit = () => {
        setEditing(true)
        setValue(message.content)
    }

    const [editMessage, { loading: isLoadingEdit }] = useEditMessageMutation({
        onError(error) {
            toast.error(t(`editMessage.${parseApolloMessage(error).code}`))
        }
    })

    const saveEdit = async () => {
        const trimmed = value.trim()

        if (!trimmed || trimmed === message.content) {
            setEditing(false)
            return
        }

        await editMessage({
            variables: {
                data: {
                    messageId: message.id,
                    newContent: value
                }

            }
        })

        setEditing(false)
    }

    const cancelEdit = () => {
        setValue(message.content)
        setEditing(false)
    }


    const [deleteMessage] = useDeleteMessageMutation({
        onError(error) {
            toast.error(t(`deleteMessage.${parseApolloMessage(error).code}`))
        }
    })

    const handleDelete = async () => {
        await deleteMessage({
            variables: { messageId: message.id },
        });
    };

    const date = parseMessageTime(message.updatedAt, message.createdAt);
    const isEdited = Boolean(message.updatedAt)
    return (
        <div className={`flex w-full py-1 ${isMe ? "justify-end" : "justify-start"}`}>

            <div className={`flex items-end gap-2 max-w-[65%] ${isMe ? "flex-row-reverse" : ""}`}>

                <UserAvatar user={message.sender} />

                <div className={`px-3 py-2 rounded-2xl text-sm bg-muted
                        ${isMe
                        ? "rounded-br-sm"
                        : "rounded-bl-sm"}
                        `}
                >
                    <div className="font-medium text-xs mb-1">
                        {message.sender.username}
                    </div>

                    {editing ? (
                        <div className="flex flex-col gap-1">

                            <input
                                className="w-full bg-transparent outline-none border rounded px-2 py-1"
                                value={value}
                                disabled={isLoadingEdit}
                                onChange={(e) => setValue(e.target.value)}
                                onBlur={saveEdit}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") saveEdit()
                                    if (e.key === "Escape") cancelEdit()
                                }}
                                autoFocus
                            />

                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                <button
                                    onClick={saveEdit}
                                    className="hover:underline text-primary cursor-pointer"
                                >
                                    {t('editMessage.submitButton')}
                                </button>

                                <button
                                    onClick={cancelEdit}
                                    className="hover:underline cursor-pointer"
                                >
                                    {t('editMessage.cancelButton')}
                                </button>

                                <span>{t('editMessage.introduction')}</span>
                            </div>

                        </div>
                    ) : (
                        <>
                            {message.deleted ? (
                                <div className="italic text-muted-foreground opacity-70">
                                    {t('deleteMessage.deletedMessage')}
                                </div>
                            ) : (
                                <div>{message.content}</div>
                            )}
                        </>
                    )}
                    <div className={`text-[10px] text-muted-foreground mt-1 ${isMe ? 'text-right' : 'text-start'}`}>

                        {date
                            ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                            : "--:--"}

                        {isEdited && <span className="ml-1 opacity-70"> {t('editMessage.editedMessage')}</span>}

                        {isMe && !editing && !message.deleted && (
                            <>
                                <button
                                    onClick={startEdit}
                                    className="ml-2 text-[10px] hover:underline cursor-pointer"
                                >
                                    {t('editMessage.editButton')}
                                </button>
                                <button
                                    onClick={() => setOpen(true)}
                                    className="ml-2 text-[10px] text-red-500 hover:underline cursor-pointer"
                                >
                                    {t('editMessage.deleteButton')}
                                </button>
                                <ConfirmModal
                                    open={open}
                                    onOpenChange={setOpen}
                                    heading={t('deleteMessage.heading')}
                                    message={t('deleteMessage.message')}
                                    onConfirm={async () => {
                                        await handleDelete();
                                        setOpen(false)
                                    }}
                                />

                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

