'use client'

import { Heading } from "@/components/ui/elements/Heading"
import { useFindMyFollowersQuery } from "@/graphql/generated/output"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useState } from "react"
import { FollowersCardSkeleton } from "./FollowersSkeleton"
import { AppPagination } from "@/components/ui/elements/Pagination"
import { FollowersCard } from "./FollowersCard"

export function Followers() {


    const t = useTranslations('profile.followers')
    const params = useParams<{ username: string }>()
    const username = params.username
    const [page, setPage] = useState(1)
    const take = 12
    const skip = (page - 1) * take

    const { data, loading: isLoadingFollowers } = useFindMyFollowersQuery({
        variables: {
            username: username,
            pagination: { take, skip }
        },
        
    })

    const followings = data?.findMyFollowers
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
                {isLoadingFollowers ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <FollowersCardSkeleton key={i} />
                    ))
                ) : !users.length ? (
                    <p className="col-span-full text-start text-sm text-muted-foreground">
                        {t('empty')}
                    </p>
                ) : (
                    users.map((user: any) => (
                        <FollowersCard key={user.id} user={user} />
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