
import { ChatProvider } from "@/components/features/profile/chat/ChatProvider"
import { ProfileNav } from "@/components/features/profile/sidebar/ProfileSidebar"
import { Sidebar } from "@/components/layout/sidebar/Sidebar"
import React from "react"


export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <>
            <Sidebar>
                <ProfileNav />
            </Sidebar>

            {children}
        </>
    )
}
