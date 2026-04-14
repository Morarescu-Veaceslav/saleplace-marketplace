'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/common/DropdownMenu"
import { UserAvatar } from "@/components/ui/elements/UserAvatar"
import { useLogoutUserMutation } from "@/graphql/generated/output"
import { useAuth } from "@/hooks/useAuth"
import { useCurrent } from "@/hooks/useCurrent"
import { parseApolloMessage } from "@/utils/gqlError"
import { LayoutDashboardIcon, LogInIcon, User } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Notifications } from "./notifications/Notifications"
import { restartWebsocket } from "@/libs/apollo-client"

export function ProfileMenu() {

    const t = useTranslations('layout.header.headerMenu.profileMenu')
    const router = useRouter()
    const { user } = useCurrent()
    const { exit } = useAuth()

    const [logout] = useLogoutUserMutation({
        async onCompleted() {
            await restartWebsocket();
            exit()
            toast.success(t('successMessage'))
            router.push('/auth')
        },

        onError(error) {
            exit()
            toast.error(t(`${parseApolloMessage(error).code}`))
        }
    })

    if (!user) return null

    return (
        <>
            <Notifications />
            <DropdownMenu >
                <DropdownMenuTrigger className="outline-none focus:outline-none">
                    <UserAvatar size='default' user={user} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-57.5">
                    <div className="flex items-center gap-x-3 p-2 ">
                        <UserAvatar user={user} />
                        <h2 className='font-medium text-foreground'>{user.username}</h2>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={`/${user.username}`}>
                            <User className="mr-2 size-4" />
                            {t('profile')}
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href='/dashboard/settings'>
                            <LayoutDashboardIcon className="mr-2 size-4" />
                            {t('dashboard')}
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logout()}>
                        <LogInIcon className="mr-2 size-4" />
                        {t('logout')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}