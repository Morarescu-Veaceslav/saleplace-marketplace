'use client'

import { Button } from "@/components/ui/common/Button"
import { useCancelSubscriptionMutation } from "@/graphql/generated/output"
import { parseApolloMessage } from "@/utils/gqlError"
import { gql } from "@apollo/client"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function CancelSubscription() {

    const t = useTranslations('dashboard.settings.subscription')

    const [cancelSubscription, { loading: isLoadin }] = useCancelSubscriptionMutation({

        update(cache, { data }) {
            if (!data?.cancelSubscription) return

            cache.writeFragment({
                id: cache.identify({
                    __typename: 'GetSubscriptionResponse',
                    id: data.cancelSubscription.id,
                }),
                fragment: gql`
                fragment UpdateSubscriptionStatus on GetSubscriptionResponse {
                status
            }
                `,
                data: {
                    status: data.cancelSubscription.status,
                },
            })
        },
        onCompleted() {
            toast.success(t('successStatus'))
        },
        onError(error) {
            toast.error(t(parseApolloMessage(error).code))
        }
    })
    return (
        <Button
            disabled={isLoadin}
            variant="link"
            size="sm"
            className="text-muted-foreground hover:text-destructive hover:underline font-medium"
            onClick={() => cancelSubscription()}>
            {t('cancel')}
        </Button>
    )
}
