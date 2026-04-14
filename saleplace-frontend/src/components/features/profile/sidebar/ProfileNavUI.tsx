
import { useTranslations } from 'next-intl'
import { SidebarItem } from '../../../layout/sidebar/SidebarItem'
import { profileRoutes } from './profile.routes'
export function ProfileNavUI({
    username,
    isAuthenticated,
    isOwner,
}: {
    username: string
    isAuthenticated: boolean
    isOwner: boolean
}) {
    const t = useTranslations('layout.header.sidebar.profileNav')
    const basePath = `/${username}`

    const visibleRoutes = profileRoutes
        .filter(route => {
            if (route.access === 'public') return true
            if (route.access === 'auth') return isAuthenticated
            if (route.access === 'owner') return isOwner
            return false
        })
        .map(route => ({
            ...route,
            href: `${basePath}${route.href ? `/${route.href}` : ''}`,
            label: t(route.key)
        }))

    return (
        <ul className="space-y-1 my-3 truncate">
            {visibleRoutes.map((route, index) => (
                <li key={index}>
                    <SidebarItem route={route} />
                </li>
            ))}
        </ul>
    )
}
