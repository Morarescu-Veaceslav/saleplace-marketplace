import { Skeleton } from "@/components/ui/common/Skeleton";

export function ProductCardSkeleton() {
    return (
        <div className="border rounded-xl overflow-hidden animate-pulse">
            <Skeleton className="h-48 " />
            <div className="p-3 space-y-2">
                <Skeleton className="h-4   w-3/4" />
                <Skeleton className="h-3   w-1/2" />
                <Skeleton className="h-4  w-1/3 mt-2" />
            </div>
        </div>
    )
}

export function ProductsSkeletonGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    )
}