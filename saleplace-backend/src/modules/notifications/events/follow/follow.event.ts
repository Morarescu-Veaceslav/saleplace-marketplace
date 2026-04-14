export const FOLLOW_EVENT = 'follow.created' as const;

export interface FollowEventPayload {
    followerId: string;
    followingId: string;
}