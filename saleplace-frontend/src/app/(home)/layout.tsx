'use client'

import { ProductSidebar } from "@/components/features/profile/sidebar/ProductsSidebar";
import { ProfileNav } from "@/components/features/profile/sidebar/ProfileSidebar";
import { Header } from "@/components/layout/header/Header";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/utils/tw-merge";

import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {

    const { isCollapsed } = useSidebar()
    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed inset-y-0 z-50 h-18.75 w-full">
                <Header />
            </div>

            <Sidebar footer={false} header={false}>
                <ProductSidebar />
            </Sidebar>
            <main className={cn(`flex mt-18.75 p-8`, isCollapsed ? 'ml-16' : 'lg:ml-64')}>
                {children}
            </main>
        </div>
    );
}