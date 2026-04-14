'use client'

import { useGetAllProductsQuery } from "@/graphql/generated/output"
import { ProductCard } from "./ProductCard"
import { ProductsPagination } from "./ProductsPagination"

export function ProductsList({ searchParams = {} }: { searchParams?: Record<string, string | string[] | undefined> }) {


    const getParam = (param: string | string[] | undefined) =>
        Array.isArray(param) ? param[0] : param

    const filter = {
        page: Number(getParam(searchParams.page) ?? 1),
        limit: 9,
        categoryId: getParam(searchParams.categoryId),
        minPrice: getParam(searchParams.minPrice)
            ? Number(getParam(searchParams.minPrice))
            : undefined,
        maxPrice: getParam(searchParams.maxPrice)
            ? Number(getParam(searchParams.maxPrice))
            : undefined,
        sortBy: getParam(searchParams.sortBy),
        search: getParam(searchParams.search),
    }

    const { data, loading } = useGetAllProductsQuery({
        variables: { filters: filter }
    })

        console.log(data)

    //if (loading) return <ProductsSkeletonGrid />

    return (
        <>


            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.filters.items.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <ProductsPagination
                    page={data?.filters?.meta?.page!}
                    totalPages={data?.filters.meta.totalPages!}
                />

            </div>
        </>
    )
}