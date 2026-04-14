'use client'

import { useParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'
import { usePublicProfileQuery } from '@/graphql/generated/output'
import { ProfileNavUI } from './ProfileNavUI'
import { ProfileSidebarHeader } from './profileSidebarHeader'
import { useSidebar } from '@/hooks/useSidebar'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { Separator } from '@/components/ui/common/Separator'
import { ProfileSidebarSkeleton } from './ProfileSkeleton'

export function ProfileNav() {

    const { isCollapsed } = useSidebar()
    const params = useParams<{ username: string }>()
    const username = params.username
    const { isAuthenticated, isInitialized } = useAuth()
    const { user } = useCurrent()

    const { data, loading } = usePublicProfileQuery({
        variables: { username },
    })

    if (!isInitialized || loading || !data?.publicProfile) {
        return <ProfileSidebarSkeleton />
    }

    const isOwner = user?.id === data.publicProfile.id

    return (
        <>
            <Sidebar>
                <ProfileSidebarHeader
                    profile={data.publicProfile!}
                    isCollapsed={isCollapsed}
                />
                <Separator />
                <ProfileNavUI
                    username={username}
                    isAuthenticated={isAuthenticated}
                    isOwner={isOwner}
                />

            </Sidebar>
        </>
    )
}

