import { SidebarSkeleton } from "@/components/layout/sidebar/SidebarSkeleton";
import { Skeleton } from "@/components/ui/common/Skeleton";

export function ProfileSidebarHeaderSkeleton() {
    return (
        <div className="flex items-center gap-3 h-16 px-2 py-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="w-3/4 h-4 rounded-sm" />
                <Skeleton className="w-1/2 h-6 rounded-sm" />
            </div>
        </div>
    )
}

export function SidebarItemSkeleton() {
    return (
        <div className="flex items-center gap-3 h-11">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="flex-1 h-6 rounded-sm" />
        </div>
    )
}

export function SidebarFooterSkeleton() {
    return (
        <div className="flex items-center gap-3 h-11">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="flex-1 h-6 rounded-sm" />
        </div>
    )
}

export function ProfileSidebarNavSkeleton() {
    return (
        <ul className="space-y-1 my-3">
            {Array.from({ length: 8 }).map((_, i) => (
                <li key={i}>
                    <SidebarItemSkeleton />
                </li>
            ))}
        </ul>
    )
}

export function ProfileSidebarSkeleton() {
    return (
        <SidebarSkeleton
            header={<ProfileSidebarHeaderSkeleton />}
            nav={<ProfileSidebarNavSkeleton />}
            footer={<SidebarFooterSkeleton />}
        />
    )
}