'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/common/Card"
import { Heading } from "@/components/ui/elements/Heading"
import { useSubscriptionPlansQuery } from "@/graphql/generated/output"
import { Badge } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { PlanCardSkeleton } from "./PlansSkeleton"
import { formatCurrency } from "@/utils/convert-price"
import { SubscsriptionPlan } from "@/components/features/user/subscription/SubscriptionPlans"
import { PLAN_STYLES } from "@/libs/constants/subscription.constant"

export function Plans() {
    const t = useTranslations('dashboard.settings.plans')
    const { data, loading } = useSubscriptionPlansQuery()
    const locale = useLocale()

    return (
        <div className="w-full lg:px-10">
            <div className="mb-10">
                <Heading
                    title={t('header')}
                    description={t('description')}
                />

                <p className="text-sm sm:text-base text-muted-foreground max-w-xl my-5">
                    {t('infoMessage')}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                {loading ?
                    (
                        Array.from({ length: 3 }).map((_, i) => (
                            <PlanCardSkeleton key={i} />
                        ))
                    )
                    :
                    (
                        data?.subscriptionPlans.map((plan) => {
                            const styles = PLAN_STYLES[plan.name as keyof typeof PLAN_STYLES]
                            return (
                                <Card
                                    key={plan.id}
                                    className={`
                                            transition
                                            hover:shadow-xl
                                            border-2
                                            rounded-xl
                                            ${styles.card}
                                     `}
                                >
                                    <CardHeader className="flex flex-col items-center space-y-2 text-center p-6">
                                        <Badge className={`capitalize px-3 py-1 rounded-full text-sm font-semibold ${styles.badge}`}>
                                            {plan.name}
                                        </Badge>

                                        <CardTitle className="text-3xl font-bold">
                                            {formatCurrency(plan.price, locale, 'EUR')}
                                        </CardTitle>

                                        <CardDescription className="text-sm text-muted-foreground">
                                            {t('perMonth')}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="flex flex-col items-center space-y-3 text-sm sm:text-base p-6">
                                        <p>
                                            <strong>{t('limit')}:</strong>{" "}
                                            {plan.productLimit === -1 ? t('unlimited') : plan.productLimit}
                                        </p>

                                        <p>
                                            <strong>{plan.name}</strong> {t('planLabel')}
                                        </p>

                                        <SubscsriptionPlan id={plan.id}/>
                                    </CardContent>
                                </Card>
                            )
                        })
                    )}

            </div>
        </div>
    )
}

