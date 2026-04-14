'use client'

import { useFindMyFollowingsQuery } from "@/graphql/generated/output"
import { FollowingCard } from "./FollowingCard"
import { FollowCardSkeleton } from "./FollowingSkeleton"
import { useTranslations } from "next-intl"
import { Heading } from "@/components/ui/elements/Heading"
import { useState } from "react"
import { AppPagination } from "@/components/ui/elements/Pagination"

export function FollowingList() {

    const t = useTranslations('dashboard.settings.following')

    const [page, setPage] = useState(1)
    const take = 12
    const skip = (page - 1) * take

    const { data, loading: isLoadingFollowings } = useFindMyFollowingsQuery({
        variables: {
            pagination: { take, skip }
        }
    })

    const followings = data?.findMyFollowings
    const users = followings?.items ?? []
    const total = followings?.total ?? 0
    const totalPages = Math.ceil(total / take)

    return (
        <div className="w-full px-4 sm:px-6 lg:px-10">
            <Heading
                title={t('header.heading')}
                description={t('header.description')}
            />

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {isLoadingFollowings ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <FollowCardSkeleton key={i} />
                    ))
                ) : !users.length ? (
                    <p className="col-span-full text-start text-sm text-muted-foreground">
                        {t('empty')}
                    </p>
                ) : (
                    users.map((user: any) => (
                        <FollowingCard key={user.id} user={user} />
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex justify-start">
                    <AppPagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            )}
        </div>
    )
}
