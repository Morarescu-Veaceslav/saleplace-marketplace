'use client'

import { Heading } from "@/components/ui/elements/Heading";
import { useGetBlockUserQuery } from "@/graphql/generated/output";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BlokedUserCardSkeleton } from "./BlockedUserCardSkeleton";
import { AppPagination } from "@/components/ui/elements/Pagination";
import { BlockedUsersCard } from "./BlockedUsersCard";
export function BlockedUsers() {

    const t = useTranslations('profile.blockedUsers')
    const [page, setPage] = useState(1)
    const take = 12
    const skip = (page - 1) * take

    const { data, loading: isLoadingBlockedUsers } = useGetBlockUserQuery({
        variables: {
            pagination: { take, skip }
        }
    })

    const followings = data?.getBlockUser
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
                {isLoadingBlockedUsers ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <BlokedUserCardSkeleton key={i} />
                    ))
                ) : !users.length ? (
                    <p className="col-span-full text-start text-sm text-muted-foreground">
                        {t('empty')}
                    </p>
                ) : (
                    users.map((user: any) => (
                        <BlockedUsersCard key={user.id} user={user} />
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
