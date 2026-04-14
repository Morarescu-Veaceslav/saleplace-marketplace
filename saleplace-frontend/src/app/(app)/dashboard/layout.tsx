
import { DashboardNav } from "@/components/features/dashboard/DashboardNav";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Sidebar>
                <DashboardNav />
            </Sidebar>

            {children}
        </>
    )
}