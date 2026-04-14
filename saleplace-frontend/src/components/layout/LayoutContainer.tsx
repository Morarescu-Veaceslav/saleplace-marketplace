'use client'

import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/utils/tw-merge";
import { type PropsWithChildren } from "react";

export function LayoutContainer({ children }: PropsWithChildren<unknown>) {

    const { isCollapsed } = useSidebar()

    return <main className={cn(`flex mt-18.75 p-8`, isCollapsed ? 'ml-16' : 'lg:ml-64')}>{children}</main>
}