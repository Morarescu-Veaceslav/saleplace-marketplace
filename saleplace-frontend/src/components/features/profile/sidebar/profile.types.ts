import { LucideIcon } from "lucide-react"

export type RouteAccess = 'public' | 'auth' | 'owner'

export interface Route {
    key: string
    label: string
    href: string
    icon: LucideIcon
    exact?: boolean
    access: RouteAccess
}

export interface PublicProfile {
    id: string
    username: string
    createdAt: string
    avatarUrl?: string | null
    avatarType?: string | null
    isFollowedByCurrentUser?: boolean | null
}