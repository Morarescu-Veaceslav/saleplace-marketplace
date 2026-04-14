'use client'

import { usePathname } from "next/navigation";
import { Route } from "../../features/profile/sidebar/profile.types";
import { useSidebar } from "@/hooks/useSidebar";
import { Hint } from "@/components/ui/elements/Hint";
import { Button } from "@/components/ui/common/Button";
import { cn } from "@/utils/tw-merge";
import Link from "next/link";
import { GetTotalUnreadCount } from "@/components/features/profile/chat/GetTotalUnreadCount";

interface SidebarItemProps {
    route: Route
}

export function SidebarItem({ route }: SidebarItemProps) {
    const pathname = usePathname()
    const { isCollapsed } = useSidebar()

    const isActive = route.exact
        ? pathname === route.href
        : pathname === route.href || pathname.startsWith(route.href + '/')

    const showUnread = route.key === "messages"

    if (isCollapsed) {
        return (
            <Hint label={route.label} side="right" asChild>
                <Link href={route.href}>
                    <Button
                        className={cn(
                            'h-11 w-full justify-center hover:bg-accent',
                            isActive && 'bg-accent'
                        )}
                        variant="link"
                    >
                        <route.icon className="size-5" />
                    </Button>
                </Link>
            </Hint>
        )
    }

    return (
        <Link href={route.href}>
            <Button
                variant="ghost"
                className={cn(
                    'h-11 w-full justify-start gap-x-4 px-4 hover:bg-accent',
                    isActive && 'bg-accent'
                )}
            >
                <route.icon className="size-5" />
                {!isCollapsed && <span>{route.label} </span>}
                {showUnread && <GetTotalUnreadCount />}
            </Button>
        </Link>
    )
}