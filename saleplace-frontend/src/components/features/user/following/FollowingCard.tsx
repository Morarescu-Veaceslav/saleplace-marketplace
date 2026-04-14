'use client'

import { Button } from "@/components/ui/common/Button"
import { Card, CardContent } from "@/components/ui/common/Card"
import { UserAvatar } from "@/components/ui/elements/UserAvatar"
import Link from "next/link"
import { format } from 'date-fns'
import { useTranslations } from "next-intl"
import { FollowingUser } from "@/graphql/generated/output"
import { useUnfollowUser } from "@/hooks/mutations/useUnfollowUser"

export function FollowingCard({ user }: { user: FollowingUser }) {

    const t = useTranslations('dashboard.settings.following')
    const { unfollow, isLoading } = useUnfollowUser()

    return (

        <Card className="transition hover:bg-muted/40">
            <CardContent className="flex flex-col items-center gap-4 p-4 xl:items-center">
                <UserAvatar size="xl" user={user} />

                <div className="min-w-0 space-y-1 text-center">
                    <Link
                        href={`/${user.username}`}
                        className="block truncate font-medium hover:underline"
                    >
                        {user.displayName}
                    </Link>

                    <p className="truncate text-sm text-muted-foreground">
                        @{user.username}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {t('followingSince', {
                            date: format(new Date(user.createdAt), 'MMM yyyy'),
                        })}
                    </p>
                </div>

                <Button variant="outline" size="sm" disabled={isLoading} onClick={() => unfollow(user.id)}>
                    {t('actions.unfollow')}
                </Button> 
            </CardContent>
        </Card>
    )
}