'use client'

import { useSidebar } from "@/hooks/useSidebar"
import { cn } from "@/utils/tw-merge"
import { SidebarFooter } from "./SidebarFooter"

export function Sidebar({
    header,
    children,
    footer,
}: {
    header?: React.ReactNode
    children: React.ReactNode
    footer?: React.ReactNode
}) {

    const { isCollapsed } = useSidebar()

    return <aside
        className={cn(
            'fixed left-0 top-18.75 z-40 h-[calc(100vh-4.6875rem)]',
            'bg-card border-r border-border',
            'transition-[width] duration-200 ease-in-out',
            isCollapsed ? 'w-16' : 'w-64'
        )}
    >
        <div className="flex h-full flex-col">
            {header}
            <div className="p-2">
                {children}
            </div>
            {footer ?? <SidebarFooter />}
        </div>

    </aside>

}
