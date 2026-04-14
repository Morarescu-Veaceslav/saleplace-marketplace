import { Settings, Users, CreditCard, BarChart, Plus } from 'lucide-react'
import { Route } from '../profile/sidebar/profile.types'


export const dashboardRoutes: Route[] = [
    {
        key: 'settings',
        label: 'dashboardNav.settings',
        href: '/dashboard/settings',
        icon: Settings,
        access: 'auth',
        exact: true,
    },
    {
        key: 'create-product',
        label: 'dashboardNav.create-product',
        href: '/dashboard/create-product',
        icon: Plus,
        access: 'auth',
        exact: true,
    },
    {
        key: 'following',
        label: 'dashboardNav.following',
        href: '/dashboard/following',
        icon: Users,
        access: 'auth',
        exact: true,
    },
    {
        key: 'subscription',
        label: 'dashboardNav.subscription',
        href: '/dashboard/subscription',
        icon: CreditCard,
        access: 'auth',
        exact: true,
    },
    {
        key: 'transactions',
        label: 'dashboardNav.transactions',
        href: '/dashboard/transactions',
        icon: BarChart,
        access: 'auth',
        exact: true,
    },
]
