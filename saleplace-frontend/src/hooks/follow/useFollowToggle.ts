import { useFollowUserMutation, useUnfollowUserMutation } from "@/graphql/generated/output";
import { parseApolloMessage } from "@/utils/gqlError";
import { ApolloCache } from "@apollo/client";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function useFollowToggle(profileId: string, isFollowingInitial: boolean) {

    const t = useTranslations('dashboard.settings')
    const [follow] = useFollowUserMutation({
        update(cache) {
            updateFollowStateInCache(cache, profileId, true);
        },
        onError(error) {
            toast.error(t(`following.${parseApolloMessage(error).code}`))
        }
    });


    const [unfollow] = useUnfollowUserMutation({
        update(cache) {
            updateFollowStateInCache(cache, profileId, false);
        },
        onError(error) {
            toast.error(t(`unfollowing.${parseApolloMessage(error).code}`))
        }
    });


    const handleToggle = () => {
        if (isFollowingInitial) {
            unfollow({
                variables: { data: { targetUserId: profileId } },
            });
        } else {
            follow({
                variables: { data: { targetUserId: profileId } },
            });
        }
    };

    return {
        isFollowing: isFollowingInitial,
        handleToggle,
    };
}
function updateFollowStateInCache(
    cache: ApolloCache<any>,
    userId: string,
    isFollowing: boolean
) {
    cache.modify({
        id: cache.identify({
            __typename: "PublicUserModel",
            id: userId,
        }),
        fields: {
            isFollowedByCurrentUser() {
                return isFollowing;
            },
        },
    });

    cache.modify({
        id: cache.identify({
            __typename: "FollowingUser",
            id: userId,
        }),
        fields: {
            isFollowedByCurrentUser() {
                return isFollowing;
            },
        },
    });
}
