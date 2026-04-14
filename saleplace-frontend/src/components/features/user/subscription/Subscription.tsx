'use client'

import { Heading } from "@/components/ui/elements/Heading"
import { GetSubscriptionQuery, useGetSubscriptionQuery } from "@/graphql/generated/output"
import { useTranslations } from "next-intl"
import { SubscriptionCard } from "./SubscriptionCard"
import { SubscriptionCardSkeleton } from "./SubscriptionSkeleton"

type Subscription = GetSubscriptionQuery['getSubscription'][number]

export function Subscription() {
    const t = useTranslations('dashboard.settings.subscription')
    const { data, loading: isLoading } = useGetSubscriptionQuery()
    const subscriptions = data?.getSubscription ?? []

    return (
        <div className="w-full lg:px-10">
            <Heading
                title={t('header.heading')}
                description={t('header.description')}
            />

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    <SubscriptionCardSkeleton />
                </div>
            ) : subscriptions.length === 0 ? (
                <p className="mt-5 text-center text-sm text-muted-foreground">
                    {t('empty')}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    {subscriptions.map((sub: Subscription) => {

                        return (
                            <SubscriptionCard key={sub.id} subscription={sub} />
                        )
                    })}
                </div>
            )}
        </div>
    )
}