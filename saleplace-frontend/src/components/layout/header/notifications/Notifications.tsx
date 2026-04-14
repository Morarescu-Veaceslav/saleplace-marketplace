'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/common/Popover"
import {
    FindNotificationsByUserDocument,
    FindNotificationsByUserQuery,
    FindUnreadNotificationsCountDocument,
    FindUnreadNotificationsCountQuery,
    useFindUnreadNotificationsCountQuery,
    useMarkAllNotificationsAsReadMutation,
    useNotificationCreatedSubscription
} from "@/graphql/generated/output"
import { useAuth } from "@/hooks/useAuth"
import { Bell } from "lucide-react"
import { NotificationsList } from "./NotificationsList"
import { useCurrent } from "@/hooks/useCurrent"
import { useState } from "react"
import { Button } from "@/components/ui/common/Button"

type NotificationItem =
    FindNotificationsByUserQuery['findNotificationsByUser']['items'][number]
export function Notifications() {

    const { isAuthenticated, isInitialized } = useAuth()
    const [open, setOpen] = useState(false)
    const { user, } = useCurrent()

    const { data } = useFindUnreadNotificationsCountQuery({
        skip: !isAuthenticated
    })

    const [markAllAsRead] = useMarkAllNotificationsAsReadMutation({
        update(cache) {

            cache.writeQuery<FindUnreadNotificationsCountQuery>({
                query: FindUnreadNotificationsCountDocument,
                data: {
                    findUnreadNotificationCount: 0,
                },
            })

            const existing = cache.readQuery<FindNotificationsByUserQuery>({
                query: FindNotificationsByUserDocument,
            })

            if (!existing?.findNotificationsByUser) return

            cache.modify({
                fields: {
                    findNotificationsByUser(existing) {
                        if (!existing) return existing

                        return {
                            ...existing,
                            items: existing.items.map((n: NotificationItem) => ({
                                ...n,
                                isRead: true,
                            })),
                        }
                    },
                },
            })
        },
    })

    const count = data?.findUnreadNotificationCount ?? 0

    useNotificationCreatedSubscription({
        variables: { userId: user!.id },

        onData({ client, data }) {
            const newNotification = data.data?.notificationCreated
            if (!newNotification) return

            client.cache.modify({
                fields: {
                    findNotificationsByUser(existing = []) {
                        return [newNotification, ...existing]
                    },
                    findUnreadNotificationCount(count = 0) {
                        return count + 1
                    },
                },
            })
        },
    })

    if (!isInitialized || !isAuthenticated) return null

    return (
        <Popover
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) {
                    markAllAsRead();
                }
            }}
        >
            <PopoverTrigger asChild>
                <Button
                    className="relative text-muted-foreground hover:opacity-70"
                    variant="ghost"
                    size="icon">
                    {count > 0 && (
                        <span className="absolute -top-1 right-0.5 rounded-full bg-red-500 px-1 text-[10px] text-white">
                            {count > 9 ? '9+' : count}
                        </span>
                    )}
                    <Bell className="size-5" />
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className='max-h-80 overflow-y-auto'>
                <NotificationsList />
            </PopoverContent>
        </Popover>
    )
}
