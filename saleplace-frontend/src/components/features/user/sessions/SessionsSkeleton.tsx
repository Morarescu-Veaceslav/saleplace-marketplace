import { Skeleton } from "@/components/ui/common/Skeleton";

export function ToggleCardSkeleton() {
    return (
        <div className="flex items-center gap-x-4 rounded-lg border p-4">

            <Skeleton className="h-13 w-13 rounded-full shrink-0" />

            <div className="flex flex-col gap-y-3 flex-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
            </div>

            <Skeleton className="h-8 w-24 rounded-md shrink-0" />
            <Skeleton className="h-8 w-24 rounded-md shrink-0" />
        </div>
    )
}

export function SessionItemSkeleton() {
    return (
        <div className="flex items-center gap-x-4 rounded-lg border p-4">
          
            <Skeleton className="h-13 w-13 rounded-full shrink-0" />

            <div className="flex flex-col gap-y-3 flex-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
            </div>

            <Skeleton className="h-8 w-24 rounded-md shrink-0" />
        </div>
    )
}