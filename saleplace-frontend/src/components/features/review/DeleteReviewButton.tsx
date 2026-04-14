'use client'

import { Button } from "@/components/ui/common/Button"
import { useDeleteReviewMutation } from "@/graphql/generated/output"
import { parseApolloMessage } from "@/utils/gqlError"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

type Props = {
    reviewId: string
    productId: string
}

export function DeleteReviewButton({ reviewId, productId }: Props) {

    const t = useTranslations('dashboard.product.deleteReview')

    const [deleteReview, { loading }] = useDeleteReviewMutation({
        update(cache) {
            cache.modify({
                id: cache.identify({
                    __typename: "ProductModel",
                    id: productId,
                }),
                fields: {
                    reviews(existingRefs = [], { readField }) {
                        return existingRefs.filter(
                            (ref: any) => readField("id", ref) !== reviewId
                        )
                    },
                    reviewsCount(count = 0) {
                        return Math.max(0, count - 1)
                    },
                },
            })
        }
    })

    const handleDelete = async () => {
        try {
            await deleteReview({
                variables: {
                    data: {
                        reviewId,
                    },
                },
            })
            toast.success(t('successMessage'))
        } catch (error) {
            toast.error(t(parseApolloMessage(error).code))
        }

    }

    return (
        <Button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            variant='destructive'
            size='xs'
        >
            {t('buttonDelete')}
        </Button>
    )
}