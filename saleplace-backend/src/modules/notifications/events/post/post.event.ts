export const POST_CREATE_EVENT = 'post.published' as const;

export interface PostCreatedEventPayload {
    postId: string;
    authorId: string;
}