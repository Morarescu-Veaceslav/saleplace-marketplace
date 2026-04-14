import { useUnfollowUserMutation } from "@/graphql/generated/output"
import { parseApolloMessage } from "@/utils/gqlError"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

export function useUnfollowUser() {

    const t = useTranslations('dashboard.settings.unfollowing')
    
    const [unfollow, { loading }] = useUnfollowUserMutation({
        onCompleted() {
            toast.success(t('success'))
        },
        onError(error) {
            toast.error(t(parseApolloMessage(error).code || 'UNKNOWN_ERROR'))
        }
    })

    const handleUnfollow = async (targetUserId: string) => {
        await unfollow({
            variables: {
                data: { targetUserId },
            },
            update(cache) {

                cache.evict({
                    id: cache.identify({
                        __typename: 'FollowingUser',
                        id: targetUserId,
                    }),
                })

                cache.gc()
            },
        })
    }

    return {
        unfollow: handleUnfollow,
        isLoading: loading,
    }
}