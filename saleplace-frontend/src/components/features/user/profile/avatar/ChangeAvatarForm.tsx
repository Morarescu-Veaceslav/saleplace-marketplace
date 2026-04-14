'use client'

import { Button } from "@/components/ui/common/Button"
import { Form, FormField } from "@/components/ui/common/Form"
import { FormWrapper } from "@/components/ui/elements/FormWrapper"
import { UserAvatar } from "@/components/ui/elements/UserAvatar"
import { useCurrent } from "@/hooks/useCurrent"
import { type TypeUploadeFileSchema, uploadeFileSchema } from "@/schemas/auth/upload-file.schema"
import { getMediaSource } from "@/utils/get-media-source"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { AvatarSettingsSkeleton } from "./ProfileAvatarSkeleton"
import { API_URL } from "@/libs/constants/url.constants"
import { fetchJson } from "@/utils/apiError"
import { RemoveAvatarForm } from "./RemoveAvatarForm"
import { client } from "@/libs/apollo-client"

export function ChangeAvatarForm() {

    const t = useTranslations('dashboard.settings.profile.avatar')
    const { user, isLoadingProfile } = useCurrent()
    const inputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)

    const form = useForm<TypeUploadeFileSchema>({
        resolver: zodResolver(uploadeFileSchema),
        values: {
            file: getMediaSource(user?.avatar)
        }
    })

    const file = useWatch({
        control: form.control,
        name: 'file',
    })
    const isFileSelected = file instanceof File
    
    const upload = async () => {

        if (!(file instanceof File)) return

        setIsUploading(true)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch(`${API_URL}/api/upload/avatar`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            })

            interface UserResponse {
                id: string;
                avatar: string;
                avatarType: string;
            }

            const updatedUser = await fetchJson<UserResponse>(res);
           
            client.cache.modify({
                id: client.cache.identify({ __typename: 'UserModel', id: updatedUser.id }),
                fields: {
                    avatar() { return updatedUser.avatar },
                    avatarType() { return updatedUser.avatarType },
                }
            });

            toast.success(t('success.successUpdateMessage'))

        } catch (error: any) {
            toast.error(t(`errors.${error.code ?? 'UNKNOWN'}`))
        } finally {
            setIsUploading(false)
        }
    }

    if (isLoadingProfile) return <AvatarSettingsSkeleton />

    return (
        <FormWrapper heading={t('heading')}>
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => {
                        const previewSrc = (() => {
                            if (field.value instanceof File) {

                                return URL.createObjectURL(field.value)
                            }

                            if (user?.avatarType === 'PRESET') {
                                return user.avatar
                            }

                            return getMediaSource(user?.avatar)
                        })()
                        return (
                            <div className="px-1 pb-5">
                                <div className="flex flex-col lg:flex-row items-center gap-6">

                                    <div className="relative">
                                        <UserAvatar
                                            user={{
                                                username: user?.username!,
                                                avatar: previewSrc,
                                                avatarType: file instanceof File ? 'CUSTOM' : user?.avatarType,
                                            }}
                                            size="xl"
                                        />
                                        {user?.avatarType === 'CUSTOM' && !isUploading && (
                                            <RemoveAvatarForm />
                                        )}
                                        {isUploading && (
                                            <div className="absolute inset-0 grid place-items-center rounded-full bg-black/40">
                                                <Loader className="animate-spin" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-center lg:items-start gap-3">

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                ref={inputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) =>
                                                    field.onChange(e.target.files?.[0] ?? null)
                                                }
                                            />

                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={() => inputRef.current?.click()}
                                            >
                                                {t('selectButton')}
                                            </Button>

                                            <Button
                                                type="button"
                                                disabled={!isFileSelected}
                                                onClick={upload}
                                            >
                                                {t('updateButton')}
                                            </Button>
                                        </div>

                                        <p className="text-sm text-muted-foreground text-center lg:text-left">
                                            {t('info')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        )
                    }}
                />
            </Form>
        </FormWrapper >
    )
}
