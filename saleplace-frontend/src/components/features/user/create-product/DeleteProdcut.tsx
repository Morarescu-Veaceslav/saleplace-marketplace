import { Button } from "@/components/ui/common/Button"
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal"
import { useDeleteProductMutation } from "@/graphql/generated/output"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    productId: string
}

export function DeleteProductButton({ productId }: Props) {
    const t = useTranslations('dashboard.product.deleteProduct')
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [deleteProduct, { loading }] = useDeleteProductMutation({
        variables: {
            data: { productId }
        },
        update(cache) {
            cache.modify({
                id: cache.identify({
                    __typename: "ProductModel",
                    id: productId
                }),
                fields: {
                    status: () => "DELETED"
                }
            })
        },
        onCompleted() {
            toast.success(t('successMessage'))
            router.push('/dashboard/create-product?step=1')
        },
        onError(error) {
            toast.error(error.message)
        }
    })

    const handleClick = () => {
        setOpen(true)
    }

    const handleConfirm = async () => {
        await deleteProduct()
    }

    return (
        <>
            <Button
                variant="destructive"
                onClick={handleClick}
                disabled={loading}
                type='button'
            >
                {t('submitButton')}
            </Button>

            <ConfirmModal
                open={open}
                onOpenChange={setOpen}
                heading={t('confirmModal')}
                message={t('message')}
                onConfirm={handleConfirm}
            />

        </>
    )
}