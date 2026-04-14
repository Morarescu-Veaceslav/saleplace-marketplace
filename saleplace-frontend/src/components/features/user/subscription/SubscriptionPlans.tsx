import { Button } from "@/components/ui/common/Button"
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal"
import { useSubscriptionMutation } from "@/graphql/generated/output"
import { useAuth } from "@/hooks/useAuth"
import { parseApolloMessage } from "@/utils/gqlError"
import { Loader } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "sonner"

export function SubscsriptionPlan({ id }: { id: string }) {

    const t = useTranslations('dashboard.settings.plans')
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    const [confirmData, setConfirmData] = useState<{
        message: string
        url: string
    } | null>(null)

    const [update, { loading }] = useSubscriptionMutation({

        onCompleted(data) {
            const url = data?.subscription?.url
            const warning = data?.subscription?.warning

            if (warning?.code === 'SUBSCRIPTION_UNUSED_PRODUCTS') {
                setConfirmData({
                    message: t('confirmModal.unusedProducts', {
                        remaining: warning.params.remaining,
                    }),
                    url,
                })
                return
            }

            window.open(url, "_blank", "noopener,noreferrer")
        },
        onError(error) {
            toast.error(t(parseApolloMessage(error).code))
        },
    })

    const handleSubscribe = useCallback(() => {
        if (!isAuthenticated) {
            router.push('/auth')
            return
        }

        update({
            variables: { planId: id },
        })
    }, [isAuthenticated, router, update, id])


    return (
        <>
            <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={handleSubscribe}
                disabled={loading}
            >
                {loading ? <Loader className="animate-spin" /> : t('subscribe')}
            </Button>

            {confirmData && (
                <ConfirmModal
                    heading={t('confirmModal.heading')}
                    message={confirmData.message}
                    open={true}
                    onOpenChange={(open) => {
                        if (!open) setConfirmData(null)
                    }}
                    onConfirm={() => {
                        window.open(confirmData.url, "_blank", "noopener,noreferrer")
                    }}
                />
            )}
        </>
    )
}