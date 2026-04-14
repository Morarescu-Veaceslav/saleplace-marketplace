"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useGetUserProductsQuery } from "@/graphql/generated/output"
import { ProductCardSkeleton, ProductsSkeletonGrid } from "./ProductSkeleton"
import { Heading } from "@/components/ui/elements/Heading"
import { useLocale, useTranslations } from "next-intl"
import { toast } from "sonner"
import { parseApolloMessage } from "@/utils/gqlError"
import { Button } from "@/components/ui/common/Button"
import { formatCurrency } from "@/utils/convert-price"

type Props = {
    username: string
}

export function UserProductsList({ username }: Props) {

    const t = useTranslations('dashboard.product.userProduct')
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const locale = useLocale()

    const { data, loading, error, fetchMore } = useGetUserProductsQuery({
        variables: {
            username,
            take: 8,
        },
        notifyOnNetworkStatusChange: true,
        errorPolicy: "all"
    })

    const products = data?.getUserProducts?.items ?? []
    const nextCursor = data?.getUserProducts?.nextCursor
    const hasMore = data?.getUserProducts?.hasMore

    useEffect(() => {
        if (error) {
            toast.error(t(parseApolloMessage(error).code))
        }
    }, [error])

    const handleLoadMore = async () => {
        if (!hasMore || !nextCursor) return

        setIsLoadingMore(true)
        try {
             await fetchMore({
                variables: {
                    username,
                    take: 8,
                    cursor: nextCursor,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult?.getUserProducts) return prev

                    return {
                        ...prev,
                        getUserProducts: {
                            __typename: "ProductResponse",
                            items: [
                                ...(prev.getUserProducts?.items ?? []),
                                ...fetchMoreResult.getUserProducts.items,
                            ],
                            nextCursor: fetchMoreResult.getUserProducts.nextCursor,
                            hasMore: fetchMoreResult.getUserProducts.hasMore,
                        },
                    }
                },
            })

            setIsLoadingMore(false)
        } catch (error) {
            toast.error(t(parseApolloMessage(error).code))
        } finally {
            setIsLoadingMore(false)
        }

    }

    if (loading && !data) {
        return (
            <div className="w-full mx-auto px-4 py-10">
                <ProductsSkeletonGrid />
            </div>
        )
    }

    return (
        <div className="w-full mx-auto px-4 py-10 ">
            <Heading size='lg' title={t('header', { username })} description={t('description')} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/products/${product.id}-${product.slug}`}
                        className="group border rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
                    >

                        <div className="h-48 bg-gray-100 overflow-hidden">
                            {product.images ? (
                                <img
                                    src={product.images}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                    {t('noImage')}
                                </div>
                            )}
                        </div>

                        <div className="p-3 space-y-1">
                            <h3 className="font-medium text-sm line-clamp-2">
                                {product.title}
                            </h3>

                            <p className="text-xs text-gray-500">
                                {new Date(product.createdAt).toLocaleDateString()}
                            </p>

                            <p className="font-semibold">
                                {formatCurrency(product.price, locale, 'EUR')}
                            </p>
                        </div>
                    </Link>
                ))}

                {isLoadingMore &&
                    Array.from({ length: 8 }).map((_, i) => (
                        <ProductCardSkeleton key={`skeleton-${i}`} />
                    ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-10">
                    <Button
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="px-6 py-2"
                        variant='outline'
                    >
                        {isLoadingMore ? t('loading') : t('loadMore')}
                    </Button>
                </div>
            )}

            {!hasMore && products.length > 0 && (
                <p className="text-center text-gray-500 mt-10">
                    {t('noMoreProducts')}
                </p>
            )}
        </div>
    )
}