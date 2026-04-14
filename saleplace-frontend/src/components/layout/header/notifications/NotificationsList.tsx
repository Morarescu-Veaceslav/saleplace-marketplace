'use client'

import { Separator } from "@/components/ui/common/Separator"
import { useFindNotificationsByUserQuery } from "@/graphql/generated/output"
import { useTranslations } from "next-intl"
import { NotificationItem } from "./NotificationItem"
import { Button } from "@/components/ui/common/Button"
import { NotificationListSkeleton } from "./NotificationSkeleton"

export function NotificationsList() {

    const t = useTranslations('layout.header.headerMenu.profileMenu.notification')

    const TAKE = 5

    const {
        data,
        loading: isLoadingNotification,
        fetchMore,
    } = useFindNotificationsByUserQuery({
        variables: {
            pagination: {
                take: TAKE,
                skip: 0,
            },
        },
    })

    const notifications = data?.findNotificationsByUser.items ?? []
    const total = data?.findNotificationsByUser.total ?? 0

    const hasMore = notifications.length < total

    const loadMore = () => {
        fetchMore({
            variables: {
                pagination: {
                    take: TAKE,
                    skip: notifications.length,
                },
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev

                return {
                    findNotificationsByUser: {
                        __typename: prev.findNotificationsByUser.__typename,
                        total: fetchMoreResult.findNotificationsByUser.total,
                        items: [
                            ...prev.findNotificationsByUser.items,
                            ...fetchMoreResult.findNotificationsByUser.items,
                        ],
                    },
                }
            },
        })
    }

    if (isLoadingNotification) {
        return <NotificationListSkeleton />
    }

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold">
                {t('heading')}
            </h3>

            <Separator className="my-3" />

            {notifications.length > 0 ? (
                <>
                    <ul className="space-y-2">
                        {notifications.map(notification => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                            />
                        ))}
                    </ul>

                    {hasMore && (
                        <Button
                            variant="ghost"
                            size="default"
                            onClick={loadMore}
                            className="w-full text-xs text-muted-foreground hover:text-foreground"
                        >
                            {t('loadMore')}
                        </Button>
                    )}
                </>
            ) : (
                <div className="py-6 text-center text-sm text-muted-foreground">
                    {t('empty')}
                </div>
            )}
        </div>
    )
}
