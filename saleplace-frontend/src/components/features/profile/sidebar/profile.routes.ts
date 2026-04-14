import {
    User,
    FileText,
    Settings,
    ListOrdered,
    MessagesSquare,
    SubscriptIcon,
    Folder,
    Users2,
    Blocks,
} from 'lucide-react'
import { Route } from './profile.types'

export const profileRoutes: Route[] = [
    {
        key: 'overview',
        label: 'Overview',
        href: '',
        icon: User,
        access: 'public',
        exact: true
    },
    {
        key: 'posts',
        label: 'Posts',
        href: 'posts',
        icon: FileText,
        access: 'public',
        exact: true
    },
    {
        key: 'orders',
        label: 'Orders',
        href: 'orders',
        icon: ListOrdered,
        access: 'owner',
        exact: true
    },
    {
        key: 'messages',
        label: 'Messages',
        href: 'messages',
        icon: MessagesSquare,
        access: 'auth',
        exact: false,
    },
    {
        key: 'blocked',
        label: 'Blocked',
        href: 'blocked',
        icon: Blocks,
        access: 'auth',
        exact: true
    },
    {
        key: 'followers',
        label: 'Follow',
        href: 'followers',
        icon: Users2,
        access: 'public',
        exact: true
    },
    {
        key: 'invoice',
        label: 'Invoice',
        href: 'invoice',
        icon: Folder,
        access: 'owner',
        exact: true
    },
    {
        key: 'settings',
        label: 'Account Settings',
        href: '/dashboard/settings',
        icon: Settings,
        access: 'owner',
        exact: true
    },
]