'use client'

import { useDeleteProductImagesMutation, useUpdateImagesPositionMutation } from "@/graphql/generated/output"
import { ImagesDnD } from "./ImagesDnD"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { parseApolloMessage } from "@/utils/gqlError"
import { useTranslations } from "next-intl"

type Props = {
    productId: string,
    images: {
        id: string
        url?: string | null
        position: number
    }[],
    disabled?: boolean
}

export function ProductImagesManager({ productId, images, disabled }: Props) {

    const t = useTranslations('dashboard.product.productImagesManager')
    const validImages = (images ?? []).filter(img => img.url)

    const items = (images ?? [])
        .filter(img => img.url)
        .map(img => ({
            id: img.id,
            src: img.url!,
        }))

    const [deleteProductImage] = useDeleteProductImagesMutation({
        onError(error) {
            toast.error(`deleteProduct.${t(parseApolloMessage(error).code)}`)
        }
    })
    const [updateImagesPositions] = useUpdateImagesPositionMutation({
        onError(error) {
            toast.error(`updateImagesPosition.${t(parseApolloMessage(error).code)}`)
        }
    })

    const handleDelete = async (index: number) => {
        const image = validImages[index]

        await deleteProductImage({
            variables: {
                data: {
                    productId,
                    imageIds: [image.id],
                },
            },

            update(cache) {
                cache.modify({
                    id: cache.identify({
                        __typename: "ProductModel",
                        id: productId,
                    }),

                    fields: {
                        images(
                            existingImagesRefs: readonly any[],
                            { readField }
                        ) {
                            return existingImagesRefs.filter(
                                ref => readField("id", ref) !== image.id
                            )
                        },
                    },
                })
            },
        })
    }

    const handleReorder = async (from: number, to: number) => {
        const updated = Array.from(validImages)

        const [moved] = updated.splice(from, 1)
        updated.splice(to, 0, moved)

        const imageIds = updated.map(img => img.id)

        await updateImagesPositions({
            variables: {
                data: {
                    productId,
                    imageIds,
                },
            },

            update(cache) {
                cache.modify({
                    id: cache.identify({
                        __typename: "ProductModel",
                        id: productId,
                    }),

                    fields: {
                        images(
                            existingImagesRefs: readonly any[],
                            { readField }
                        ) {
                            const refMap = new Map(
                                existingImagesRefs.map(ref => [
                                    readField("id", ref),
                                    ref,
                                ])
                            )

                            return imageIds.map(id => refMap.get(id))
                        },
                    },
                })
            }
        })
    }
    return (
        <ImagesDnD
            items={items}
            onDelete={handleDelete}
            onReorder={handleReorder}
            showMainBadge
            isDragDisabled={disabled}
        />
    )
}