import { SidebarSkeleton } from "@/components/layout/sidebar/SidebarSkeleton";
import { Skeleton } from "@/components/ui/common/Skeleton";


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


export function DashboardSidebarNavSkeleton() {
    return (
        <ul className="space-y-1 my-3">
            {Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>
                    <SidebarItemSkeleton />
                </li>
            ))}
        </ul>
    )
}
export function DashboardSidebarSkeleton() {
    return (
        <SidebarSkeleton
            nav={<DashboardSidebarNavSkeleton />}
            footer={<SidebarFooterSkeleton />}
        />
    )
}