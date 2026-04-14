'use client'

import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { dashboardRoutes } from "./dashboard.routes";
import { SidebarItem } from "@/components/layout/sidebar/SidebarItem";
import { DashboardSidebarSkeleton } from "./DashboardSkeleton";


export function DashboardNav() {
    const t = useTranslations('layout.header.sidebar.dashboardNav')
    const { isAuthenticated, isInitialized } = useAuth();


    if (!isInitialized) {
        return <DashboardSidebarSkeleton />
    }

    const visibleRoutes = dashboardRoutes
        .filter(route => {
            if (route.access === 'auth') return isAuthenticated;
            if (route.access === 'public') return true;
            return false;
        })
        .map(route => ({
            ...route,
            label: t(route.key), // traducem label-ul
        }));

    return (
        <ul className="space-y-1">
            {visibleRoutes.map(route => (
                <li key={route.key}>
                    <SidebarItem route={route} />
                </li>
            ))}
        </ul>
    );
}
