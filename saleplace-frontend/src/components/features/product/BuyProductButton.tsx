'use client'

import { Button } from "@/components/ui/common/Button"
import { useByProductMutation } from "@/graphql/generated/output"
import { parseApolloMessage } from "@/utils/gqlError"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

type Props = {
    productId: string,
    disabled: string
}

export function BuyProductButton({ productId, disabled }: Props) {

    const t = useTranslations('dashboard.product.byProdudct')

    const [buyProduct, { loading }] = useByProductMutation()

    const handleBuy = async () => {
        try {
            const { data } = await buyProduct({
                variables: {
                    productId,
                },
            })

            if (data?.byProduct?.checkoutUrl) {
                window.open(
                    data.byProduct.checkoutUrl,
                    "_blank",
                    "noopener,noreferrer"
                )
            }
        } catch (error) {
            toast.error(t(parseApolloMessage(error).code))
        }
    }

    return (
        <Button
            onClick={handleBuy}
            disabled={loading || disabled !== "ACTIVE"}
            className="w-full"
        >
            {loading ? t('redirecting') : t('buy')}
        </Button>
    )
}