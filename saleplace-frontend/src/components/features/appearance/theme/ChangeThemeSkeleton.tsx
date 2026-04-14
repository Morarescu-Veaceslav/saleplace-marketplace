import { Skeleton } from "@/components/ui/common/Skeleton";

export function ChangeThemeSkeleton() {
    return (
        <div className="ml-auto flex items-center gap-x-3">
            <Skeleton className="h-7 w-7 rounded-md" />
        </div>
    )
}