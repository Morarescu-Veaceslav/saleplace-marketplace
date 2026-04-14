'use client'

import { UserAvatar } from "@/components/ui/elements/UserAvatar"
import { NotificationType } from "@/graphql/generated/output"
import { notificationConfig } from "@/utils/get-notification-icon"
import { cn } from "@/utils/tw-merge"
import { Bell } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { DeleteNotification } from "./DeleteNotification"
export function NotificationItem({
    notification,
}: {
    notification: {
        id: string
        type: NotificationType,
        isRead: boolean
        createdAt: string
        actor?: {
            username: string
            avatar?: string | null
        } | null
    }
}) {
    const t = useTranslations('layout.header.headerMenu.profileMenu.notification')
    const config = notificationConfig[notification.type]
    const Icon = config?.icon ?? Bell
    const iconColor = config?.color ?? 'text-muted-foreground'

    return (

        <div
            className={`
        flex items-start gap-3 p-2 my-1 rounded-md transition
        ${!notification.isRead ? 'bg-muted font-semibold' : 'bg-transparent'}
        hover:bg-muted/80
      `}
        >
            <div className="relative shrink-0">
                <UserAvatar
                    size="sm"
                    user={notification.actor ?? { username: 'someone' }}
                />
                <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full border bg-background">
                    <Icon className={cn('size-3', iconColor)} />
                </span>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-start gap-3 flex-1 min-w-0">
                <div className="min-w-0">
                    <p className="text-sm wrap-break-word">
                        {t(notification.type, {
                            username: notification.actor?.username ?? "someone",
                        })}
                    </p>

                    <span className="text-xs text-muted-foreground">
                        {new Date(notification.createdAt).toLocaleString()}
                    </span>
                </div>

                <div className="self-start">
                    <DeleteNotification notificationId={notification.id} />
                </div>
            </div>
        </div>
    )
}
