import { Button } from "@/components/ui/common/Button";
import { ConfirmModal } from "@/components/ui/elements/ConfirmModal";
import { useRemoveProfileAvatarMutation } from "@/graphql/generated/output";
import { parseApolloMessage } from "@/utils/gqlError";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";


export function RemoveAvatarForm() {

    const t = useTranslations('dashboard.settings.profile.avatar')

    const [remove, { loading: isLoadingDeleteAvatar }] = useRemoveProfileAvatarMutation({
        update(cache, { data }) {
            if (!data?.removeProfileAvatar) return;

            const updatedUser = data.removeProfileAvatar;
            cache.modify({
                id: cache.identify({
                    __typename: 'UserModel',
                    id: updatedUser.id,
                }),
                fields: {
                    avatar() {
                        return updatedUser.avatar
                    },
                    avatarType() {
                        return updatedUser.avatarType
                    },
                },
            });
        },
        onCompleted() {
            toast.success(t('success.successRemoveMessage'))
        },

        onError(error) {
            toast.error(t(`errors.${parseApolloMessage(error).code}`))
        }
    })

    return (
        <ConfirmModal
            heading={t('confirmModal.heading')}
            message={t('confirmModal.message')}
            onConfirm={() => remove()}
        >
            <Button
                size='icon-sm'
                disabled={isLoadingDeleteAvatar}
                className="
        absolute top-1 right-1
        rounded-full bg-background/80 p-1
        text-muted-foreground
        hover:text-destructive
        hover:bg-destructive/10
        transition
        disabled:opacity-50
      "
                aria-label="Remove avatar"
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </ConfirmModal>

    )
}