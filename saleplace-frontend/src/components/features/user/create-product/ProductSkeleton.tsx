import { Skeleton } from "@/components/ui/common/Skeleton";

export function CreateProductStep1Skeleton() {
    return (
        <div className="space-y-6 w-full">
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-24 w-full" />
            </div>

            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-40" />
            </div>
        </div>
    )
}

export function CreateProductStep2Skeleton() {
    return (
        <div className="space-y-4 w-full">
            <Skeleton className="h-4 w-32" />

            <Skeleton className="h-40 w-full rounded-xl" />

            <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-20" />
                ))}
            </div>
        </div>
    )
}

export function CreateProductStep3Skeleton() {
    return (
        <div className="space-y-6 w-full">

            <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
            </div>

            <div className="border rounded-xl p-4 space-y-3">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>

            <Skeleton className="h-12 w-full rounded-xl" />
        </div>
    )
}