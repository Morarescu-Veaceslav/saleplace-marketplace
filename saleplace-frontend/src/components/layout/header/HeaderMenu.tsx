'use client'

import { Button } from "@/components/ui/common/Button"
import { useAuth } from "@/hooks/useAuth"
import { useTranslations } from "next-intl"
import { ProfileMenu } from "./ProfileMenu"
import { HeaderSkeleton } from "./HeaderSkeleton"
import { useCurrent } from "@/hooks/useCurrent"
import { User } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeaderMenu() {
    const t = useTranslations('layout.header.headerMenu')
    const route = useRouter()
    const { isAuthenticated, isInitialized } = useAuth()
    const { user, isLoadingProfile } = useCurrent()

    if (!isInitialized || (isAuthenticated && isLoadingProfile)) {
        return <HeaderSkeleton />
    }

    if (isAuthenticated && user) {
        return (
            <div className="ml-auto flex items-center gap-x-3 transition-all duration-300">
                <ProfileMenu />
            </div>
        )
    }

    return (

        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:opacity-70"
            onClick={() => route.push('/auth')}
            aria-label={t('auth')}
        >
            <User className="size-5"/>
        </Button>

    )
}
