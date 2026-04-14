'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { useGetSubscriptionQuery } from '@/graphql/generated/output'
import { useTranslations } from 'next-intl'

export default function PaymentSuccessPage() {

    const t = useTranslations('payment.success.details')
    const router = useRouter()

    const { data } = useGetSubscriptionQuery({
        pollInterval: 2000,
    })

    const subscription = data?.getSubscription?.[0]

    useEffect(() => {
        if (subscription?.status === 'ACTIVE') {
            router.replace('/dashboard/subscription')
        }
    }, [data, router])


    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
            <Loader className="animate-spin" />
            <p className="text-muted-foreground">
                {t('message')}
            </p>
        </div>
    )
}