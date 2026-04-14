
import { FormWrapper } from "@/components/ui/elements/FormWrapper"
import { useChangeProfileAvatarMutation } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { cn } from "@/utils/tw-merge"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { PresetAvatarSettingsSkeleton } from "./ProfileAvatarSkeleton"

const PRESETS = [
    'avatar_1',
    'avatar_2',
    'avatar_3',
    'avatar_4',
    'avatar_5',
] as const

export function PresetAvatarSelector() {

    const t = useTranslations('dashboard.settings.profile.avatar')
    const { user, isLoadingProfile } = useCurrent()

    const [changeAvatar, { loading }] =
        useChangeProfileAvatarMutation({

            update(cache, { data }) {
                if (!data?.changeProfileAvatar) return;
                const updatedUser = data.changeProfileAvatar;
                cache.modify({
                    id: cache.identify({
                        __typename: 'UserModel',
                        id: updatedUser.id,
                    }),
                    fields: {
                        avatar() {
                            return updatedUser.avatar;
                        },
                        avatarType() {
                            return updatedUser.avatarType;
                        },
                    },
                });
            },
            onCompleted: () => {
                toast.success(t('success.successUpdateMessage'))
            },
        })

    if (!user || isLoadingProfile) return <PresetAvatarSettingsSkeleton />

    const activePreset =
        user.avatarType === 'PRESET' ? user.avatar : null


    return (
        <FormWrapper heading={t('presetAvatar.heading')} >
            <p className="text-sm text-muted-foreground">
                {t('presetAvatar.description')}
            </p>
            <div className="grid gap-4 place-items-center my-5 grid-cols-[repeat(auto-fit,minmax(80px,1fr))]">
                {PRESETS.map((preset) => {
                    const isActive = activePreset === preset
                    return (
                        <button
                            key={preset}
                            disabled={loading}
                            onClick={() =>
                                changeAvatar({
                                    variables: ({ data: { preset } }),
                                })
                            }
                            className={cn(
                                'group cursor-pointer relative flex h-20 w-20 items-center justify-center rounded-full border transition-all duration-200',
                                'hover:scale-105 hover:shadow-md',
                                'focus:outline-none focus:ring-2 focus:ring-primary/30'
                            )}
                        >
                            <img
                                src={`/images/${preset}.png`}
                                alt={preset}
                                className={cn(
                                    'h-16 w-16 rounded-full object-cover transition',
                                    !isActive && 'group-hover:opacity-90'
                                )}
                            />
                        </button>
                    )
                })}
            </div>
        </FormWrapper>
    )
}

