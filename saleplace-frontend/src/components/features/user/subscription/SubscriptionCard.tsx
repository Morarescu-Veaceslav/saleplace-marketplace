'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/common/Card"
import { GetSubscriptionQuery } from "@/graphql/generated/output"
import { useLocale, useTranslations } from "next-intl"
import { format } from "date-fns"
import { CancelSubscription } from "./CancelSubscription"
import Link from "next/link"
import { Badge } from "lucide-react"
import { cn } from "@/utils/tw-merge"
import { formatCurrency } from "@/utils/convert-price"
import { PLAN_STYLES } from "@/libs/constants/subscription.constant"


type Subscription = GetSubscriptionQuery['getSubscription'][number]

interface Props {
    subscription: Subscription
}

export function SubscriptionCard({ subscription }: Props) {

    const t = useTranslations('dashboard.settings.subscription')

    const locale = useLocale()
    const { plan, interval, status, productUser, currentPeriodStart, currentPeriodEnd } = subscription

    const planStyle =
        PLAN_STYLES[plan.name as keyof typeof PLAN_STYLES] ??
        PLAN_STYLES.BASIC
    return (

        <Card
            className={cn(
                "transition hover:shadow-xl border-2 rounded-xl",
                planStyle.card
            )}
        >
            <CardHeader className="flex flex-col items-center space-y-2 text-center p-6">
                <Badge className={cn("px-3 py-1 rounded-full text-sm font-semibold", planStyle.badge)}>
                    {plan.name}
                </Badge>

                <CardTitle className="text-3xl font-bold">
                    {formatCurrency(plan.price, locale, 'EUR')}
                </CardTitle>

                <CardDescription className="text-sm text-muted-foreground">
                    {interval === 'month' ? t('intervalMonth') : t('intervalYear')}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-3 text-sm sm:text-base p-6">
                <p>
                    <strong>{t('start')}:</strong>{" "}
                    {format(new Date(currentPeriodStart), 'MMM dd, yyyy')}
                </p>
                <p>
                    <strong>{t('end')}:</strong>{" "}
                    {format(new Date(currentPeriodEnd), 'MMM dd, yyyy')}
                </p>
                <p>
                    <strong>{t('usersLimit')}:</strong>{" "}
                    {productUser} / {plan.limit}
                </p>
                <p>
                    <strong>{t('status')}:</strong>{" "}
                    <span className="text-muted-foreground">{status}</span>
                </p>
            </CardContent>

            <CardFooter className="w-full px-6 pt-2">
                {status === 'ACTIVE' ? (
                    <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-2 text-xs">
                        <CancelSubscription />
                        <Link
                            href="/plans"
                            className="text-muted-foreground hover:text-foreground hover:underline underline-offset-4 font-medium"
                        >
                            {t('changePlan')}
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row w-full items-center justify-between gap-2 text-xs">
                        <span className="text-destructive font-medium">
                            {t('statusCanceled')}
                        </span>

                        <Link
                            href="/plans"
                            className="text-muted-foreground hover:text-foreground hover:underline underline-offset-4 font-medium"
                        >
                            {t('changePlan')}
                        </Link>
                    </div>
                )}
            </CardFooter>
        </Card>

    )
}