import { ProfileNav } from "@/components/features/profile/sidebar/ProfileSidebar";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";

import { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Sidebar>
                <ProfileNav />
            </Sidebar>
        </>
    );
}