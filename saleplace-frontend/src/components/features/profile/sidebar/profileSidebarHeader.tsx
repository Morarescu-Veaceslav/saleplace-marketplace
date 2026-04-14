'use client'

import { UserAvatar } from '@/components/ui/elements/UserAvatar'
import { format } from 'date-fns'
import { PublicProfile } from './profile.types'
import { cn } from '@/utils/tw-merge'
import { useFollowUserMutation, useStartConversationMutation, useUnfollowUserMutation } from '@/graphql/generated/output'
import { Button } from '@/components/ui/common/Button'
import { useCurrent } from '@/hooks/useCurrent'
import { useAuth } from '@/hooks/useAuth'
import { MessageCircle, UserCheck, UserPlus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { parseApolloMessage } from '@/utils/gqlError'
import { FollowButton } from '@/hooks/follow/FollowButton'


type Props = {
    profile: PublicProfile
    isCollapsed: boolean
}

export function ProfileSidebarHeader({ profile, isCollapsed }: Props) {

    const t = useTranslations('layout.header.sidebar.profileNav')
    const router = useRouter()
    const { user } = useCurrent()
    const { isAuthenticated } = useAuth()

    const [startConversation, { loading: isLoadingStartConversation }] = useStartConversationMutation({
        update(cache, { data }) {
            const newConv = data?.startConversation;
            if (!newConv) return;

            cache.modify({
                fields: {
                    getConversations(existing = [], { readField, toReference }) {
                        const exists = existing.some(
                            (ref: any) => readField('id', ref) === newConv.id
                        );

                        if (exists) return existing;
                        const newRef = toReference(newConv, true);

                        return [newRef, ...existing];
                    },
                },
            });
        },
        onError(error) {
            toast.error(t(`startConversation.${parseApolloMessage(error).code}`));
        }
    })

    const handleStartConversation = async () => {
        const { data } = await startConversation({
            variables: { data: { userId: profile.id } },
        });

        if (data?.startConversation?.id) {
            router.push(
                `/${data.startConversation.participant.username}/messages/${data.startConversation.id}`
            );
        }
    };

    const isMe = user?.id === profile.id;

    return (
        <div className="transition-all duration-300 ease-in-out px-3 py-4">
            <div className="flex items-center gap-3">
                <UserAvatar size={isCollapsed ? 'sm' : 'md'} user={profile} />

                <div className="relative flex-1 overflow-hidden h-full flex flex-col justify-center">
                    <p
                        className={cn(
                            'truncate text-sm font-semibold leading-tight transition-all duration-300 ease-in-out origin-left',
                            isCollapsed ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                        )}
                    >
                        @{profile.username}
                    </p>

                    <p
                        className={cn(
                            'text-xs text-muted-foreground transition-all duration-300 ease-in-out origin-left',
                            isCollapsed ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                        )}
                    >
                        Joined {format(new Date(profile.createdAt), 'MMM yyyy')}
                    </p>
                </div>
            </div>

            {!isMe && isAuthenticated && (
                <div
                    className={cn(
                        "mt-3 flex gap-2",
                        isCollapsed ? "flex-col items-center" : "flex-row"
                    )}
                >
                    <FollowButton
                        userId={profile.id}
                        isFollowing={profile.isFollowedByCurrentUser!}
                        isCollapsed={isCollapsed}
                        className={cn(
                            isCollapsed ? "w-10 h-10 p-0" : "flex-1"
                        )}
                        size="xs"
                    />

                    <Button
                        size="xs"
                        variant="outline"
                        disabled={isLoadingStartConversation}
                        className={cn(
                            isCollapsed ? "w-10 h-10 p-0" : "flex-1"
                        )}
                        onClick={handleStartConversation}
                    >
                        {isCollapsed ? (
                            <MessageCircle size={16} />
                        ) : (
                            t('buttonMessage')
                        )}
                    </Button>
                </div>
            )}

        </div>

    )
}

