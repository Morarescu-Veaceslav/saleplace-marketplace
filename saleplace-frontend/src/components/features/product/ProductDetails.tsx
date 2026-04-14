'use client'

import { Button } from "@/components/ui/common/Button"
import { UserAvatar } from "@/components/ui/elements/UserAvatar"
import { ProductModel, ProductStatus, useGetOneQuery } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { useStartConversationHandler } from "@/hooks/useStartConversationHandler"
import { formatCurrency } from "@/utils/convert-price"
import { ChevronRight, MessageCircle } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"

type Props = {
    product: ProductModel
}

import { useState } from "react"
import { BuyProductButton } from "./BuyProductButton"
import { useAuth } from "@/hooks/useAuth"
import { CreateReviewForm } from "../review/CreateReviewForm"
import { DeleteReviewButton } from "../review/DeleteReviewButton"
import { EditReviewForm } from "../review/EditReviewForm"
import { useRouter } from "next/navigation"

const STATUS_LABELS: Record<string, string> = {
    DRAFT: "Draft",
    ACTIVE: "Active",
    SOLD: "Sold",
    ARCHIVED: "Archived",
}

export function ProductDetails({ product }: Props) {

    const t = useTranslations('dashboard.product.productDetails')
    const locale = useLocale()
    const router = useRouter()
    const [editingReviewId, setEditingReviewId] = useState<string | null>(null)
    const { data } = useGetOneQuery({
        variables: { id: product.id },
    })

    const productData = data?.getOne ?? product

    const [activeImage, setActiveImage] = useState(
        product.images?.[0]?.url
    )
    const { user, isLoadingProfile } = useCurrent()
    const { isAuthenticated } = useAuth()
    const isOwnProduct = user?.id === product.user.id

    const { handleStartConversation, isLoadingStartConversation } =
        useStartConversationHandler()

    const canInteract = isAuthenticated && !isLoadingProfile && !isOwnProduct
    const isDeleted = data?.getOne?.status === ProductStatus.Deleted
    return (
        <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-4">
                    <div className="rounded-xl overflow-hidden border">
                        {activeImage && (
                            <img
                                src={activeImage}
                                alt={product.title}
                                className="w-full h-125 object-cover"
                            />
                        )}
                    </div>

                    <div className="flex gap-2">
                        {productData.images?.map((img) => (
                            <img
                                key={img.id}
                                src={img.url!}
                                onClick={() => setActiveImage(img.url!)}
                                className={`w-20 h-20 object-cover rounded-md border cursor-pointer ${activeImage === img.url
                                    ? "ring-2 ring-black"
                                    : ""
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="lg:sticky lg:top-20 space-y-6">

                    <h1 className="text-3xl font-bold">
                        {productData.title}
                    </h1>

                    {productData.averageRating !== 0 &&
                        (<div className="flex items-center gap-2 text-sm">
                            <span className="text-yellow-500">
                                {"⭐".repeat(
                                    Math.round(productData.averageRating)
                                )}
                            </span>
                            <span className="font-medium">
                                {productData.averageRating.toFixed(1)}
                            </span>
                            <span className="text-gray-500">
                                ({productData.reviewsCount})
                            </span>
                        </div>)
                    }


                    <div className="flex items-center gap-3">
                        <Link
                            href={`/${productData.user.username}`}
                            className="flex items-center gap-3 hover:opacity-80 transition"
                        >
                            <UserAvatar user={productData.user} size="lg" />

                            <div>
                                <p className="font-medium">
                                    {productData.user.displayName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    @{productData.user.username}
                                </p>
                            </div>
                        </Link>
                    </div>

                    <p className="text-3xl font-semibold">
                        {formatCurrency(product.price, locale, 'EUR')}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <span className="font-medium">{t('categoty')}</span>
                            <span>{productData.category?.name}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="font-medium">{t('status')}</span>
                            <span>
                                {STATUS_LABELS[productData.status] ?? productData.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="font-medium">{t('posted')}</span>
                            <span>
                                {new Date(productData.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="font-medium">{t('views')}</span>
                            <span>{productData.views}</span>
                        </div>
                    </div>

                    {canInteract && (
                        <>
                            <BuyProductButton
                                productId={productData.id}
                                disabled={productData.status}
                            />
                            <Button
                                onClick={() => handleStartConversation(productData.user.id)}
                                disabled={isLoadingStartConversation}
                                className="w-full flex items-center justify-between"
                                variant="secondary"
                            >
                                <div className="flex items-center gap-2">
                                    <MessageCircle size={16} />
                                    <span>{t('startChat')}</span>
                                </div>

                                <ChevronRight size={16} />
                            </Button>
                        </>
                    )}

                    {isAuthenticated && isOwnProduct &&
                        (
                            <>
                                <Button
                                    className="w-full"
                                    variant='outline'
                                    disabled={isDeleted}
                                    onClick={() =>
                                        router.push(`/dashboard/create-product?step=3&productId=${productData.id}`)
                                    }
                                >
                                    {t('editButton')}
                                </Button>
                            </>
                        )}

                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-2">
                    {t('description')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    {productData.description}
                </p>
            </div>

            <div className="mt-10 space-y-6">
                <h2 className="text-xl font-semibold">
                    {t('reviews')} ({productData.reviews?.length ?? 0})
                </h2>

                {productData.reviews?.length ? (
                    productData.reviews.map((review) => {
                        const isEditing = editingReviewId === review.id
                        const isOwn = review.user.id === user?.id

                        return (
                            <div
                                key={review.id}
                                className="border rounded-xl p-4 bg-white shadow-sm space-y-3"
                            >
                                {isEditing ? (
                                    <EditReviewForm
                                        review={review}
                                        onCancel={() => setEditingReviewId(null)}
                                        onSuccess={() => setEditingReviewId(null)}
                                    />
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <UserAvatar user={review.user} size="sm" />
                                                <div>
                                                    <p className="font-medium text-sm">
                                                        {review.user.displayName}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {isOwn && (
                                                <div className="flex gap-3 text-sm">
                                                    <Button
                                                        onClick={() => setEditingReviewId(review.id)}
                                                        size='xs'
                                                        variant='outline'
                                                    >
                                                        {t('editButton')}
                                                    </Button>

                                                    <DeleteReviewButton
                                                        reviewId={review.id}
                                                        productId={product.id}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-yellow-500 text-sm">
                                            {"⭐".repeat(Math.round(review.rating ?? 0))}
                                        </div>

                                        {review.comment && (
                                            <p className="text-sm text-gray-700">
                                                {review.comment}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        )
                    })
                ) : (
                    <p className="text-sm text-gray-500">
                        {t('noReview')}
                    </p>
                )}

                {canInteract && (
                    <div className="pt-6 border-t">
                        <CreateReviewForm productId={product.id} />
                    </div>
                )}
            </div>
        </div >
    )
}