
import { Card, CardContent } from "@/components/ui/common/Card"
import { ProductModel } from "@/graphql/generated/output"
import { formatCurrency } from "@/utils/convert-price"
import { useLocale } from "next-intl"
import Link from "next/link"

type Props = {
    product: ProductModel
}

export function ProductCard({ product }: Props) {

    const image = product.images?.[0]?.url
    const productUrl = `/products/${product.id}-${product.slug}`
    const locale = useLocale()


    return (
        <Link href={productUrl} className="block group">
            <Card className="overflow-hidden hover:shadow-lg transition p-0">

                <div className="aspect-square bg-muted overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                            No image
                        </div>
                    )}
                </div>

                <CardContent className="p-3 space-y-1">
                    <h3 className="text-sm font-medium line-clamp-2">
                        {product.title}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                        {product.category?.name}
                    </p>

                    <p className="text-lg font-semibold">
                        {formatCurrency(product.price, locale, 'EUR')}
                    </p>

                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>@{product.user?.username}</span>
                        {"⭐".repeat(
                            Math.round(product.averageRating)
                        )}
                    </div>
                </CardContent>

            </Card>
        </Link>
    )
}

