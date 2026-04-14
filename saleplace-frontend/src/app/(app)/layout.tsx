'use client'

import { Header } from "@/components/layout/header/Header";
import { LayoutContainer } from "@/components/layout/LayoutContainer";
import { useResponsiveSidebar } from "@/hooks/useResponsiveSidebar";
import type { PropsWithChildren } from "react";
import { AuthBootstrap } from "../../schemas/auth/AuthBootstrap";
import { ChatProvider } from "@/components/features/profile/chat/ChatProvider";


export default function SiteLayout({ children }: PropsWithChildren<unknown>) {

    useResponsiveSidebar()

    return <div className="flex h-full w-full flex-col">
        <div className="felx-1">
            <div className="fixed inset-y-0 z-50 h-18.75 w-full">
                <Header />
            </div>
            <LayoutContainer>
                {children}
            </LayoutContainer>
            <AuthBootstrap />
            <ChatProvider />
        </div>
    </div>
}