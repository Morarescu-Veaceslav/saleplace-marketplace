import { Card, CardContent } from "@/components/ui/common/Card";
import { UserAvatar } from "@/components/ui/elements/UserAvatar";
import { BlockUser, useUnblockUserMutation } from "@/graphql/generated/output";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { format } from 'date-fns'
import { Button } from "@/components/ui/common/Button";

export function BlockedUsersCard({ user }: { user: BlockUser }) {

    const t = useTranslations('profile.blockedUsers')

    const [unblockUser, { loading: isLoading }] = useUnblockUserMutation({
        optimisticResponse: {
            unblockUser: true,
        },

        update(cache, _, { variables }) {

            const blockedId = variables?.blockedId;
            if (!blockedId) return;

            cache.modify({
                fields: {
                    getBlockUser(existing, { readField }) {
                        if (!existing) return existing;

                        return {
                            ...existing,
                            items: existing.items.filter(
                                (ref: any) => readField("id", ref) !== blockedId
                            ),
                            total: existing.total - 1,
                        };
                    },
                },
            });

            cache.evict({ id: `BlockUser:${blockedId}` });
            cache.gc();
        },
    });
    return (
        <Card className="transition hover:bg-muted/40">
            <CardContent className="flex flex-col items-center gap-4 p-4 xl:items-center">
                <UserAvatar size="xl" user={user} />

                <div className="min-w-0 space-y-1 text-center">
                    <Link
                        href={`/${user.username}`}
                        className="block truncate font-medium hover:underline"
                    >
                        {user.displayName}
                    </Link>

                    <p className="truncate text-sm text-muted-foreground">
                        @{user.username}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {t('blockedSince', {
                            date: format(new Date(user.createdAt), 'MMM yyyy'),
                        })}
                    </p>
                </div>

                <Button variant="outline" size="sm" disabled={isLoading} onClick={() => unblockUser({ variables: { blockedId: user.id }, refetchQueries: ["GetConversations"], })}>
                    {t('actions.unblock')}
                </Button>
            </CardContent>
        </Card>
    )
}