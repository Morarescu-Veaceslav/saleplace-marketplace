import { Separator } from "@/components/ui/common/Separator";
import { Skeleton } from "@/components/ui/common/Skeleton";


export function NotificationItemSkeleton() {
    return (
        <div
            className="
        flex items-start gap-3 p-2 rounded-md
      "
        >
            <div className="relative shrink-0">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full" />
            </div>

            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-3 w-[40%]" />
            </div>
        </div>
    )
}

export function NotificationListSkeleton() {
    return (
        <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Separator className="my-3" />
            <ul className="space-y-2">
                <ul className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} style={{ animationDelay: `${i * 80}ms` }}>
                            <NotificationItemSkeleton />
                        </li>
                    ))}
                </ul>
            </ul>
            <Skeleton className="h-8 w-full rounded-md" />
        </div>
    )
}