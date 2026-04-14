import { FindProfileQuery } from "@/graphql/generated/output";
import { cva, type VariantProps } from "class-variance-authority";
import { Avatar, AvatarFallback, AvatarImage } from "../common/Avatar";
import { cn } from "@/utils/tw-merge";
import { getMediaSource } from "@/utils/get-media-source";
import { Skeleton } from "../common/Skeleton";
import { useCurrent } from "@/hooks/useCurrent";


const avatarSize = cva('', {
    variants: {
        size: {
            sm: 'size-7',
            md: 'size-11',
            default: 'size-9',
            lg: 'size-14',
            xl: 'size-25'
        },
        defaultVariants: {
            size: 'default'
        }
    }
})

interface UserAvatarProps extends VariantProps<typeof avatarSize> {
    user: {
        username: string
        avatar?: string | null
        avatarType?: string | null
        isOnline?: boolean | null
    }
}

export function UserAvatar({ size, user }: UserAvatarProps) {

    const src = (() => {
        if (!user.avatar) return undefined

        if (user.avatar.startsWith('blob:') || user.avatar.startsWith('data:')) {
            return user.avatar
        }

        if (user.avatarType === 'PRESET') {
            return `/images/${user.avatar}.png`
        }

        return getMediaSource(user.avatar)
    })()

    return <div className="relative">
        <Avatar
            className={cn(
                avatarSize({ size }),
                `ring-2 ring-border
                 hover:ring-primary/60
                 hover:shadow-[0_0_0_4px_hsl(var(--primary)/0.25)]
                 transition-all duration-200
                `
            )}
        >
            <AvatarImage src={src} />
            <AvatarFallback
                className={cn(size === 'xl' && 'text-3xl')}
            >
                {user.username?.[0] ?? 'U'}
            </AvatarFallback>
        </Avatar>
        {user.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
        )}
    </div >
}
function ChangeAvatarFormSkeleton() {
    return (
        <Skeleton className='h-52 w-full' />
    )
}