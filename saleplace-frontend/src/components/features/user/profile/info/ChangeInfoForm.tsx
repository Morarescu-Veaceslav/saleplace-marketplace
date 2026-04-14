'use client'

import { useCurrent } from "@/hooks/useCurrent"
import { changeInfoSchema, type TypeChangeInfoSchema } from "@/schemas/user/change-info.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { ChangeIngoFormSkeleton } from "./ChangeInfoSkeleton"
import { useChangeProfileInfoMutation } from "@/graphql/generated/output"
import { toast } from "sonner"
import { parseApolloMessage } from "@/utils/gqlError"
import { FormWrapper } from "@/components/ui/elements/FormWrapper"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/common/Form"
import { Input } from "@/components/ui/common/Input"
import { Separator } from "@/components/ui/common/Separator"
import { Button } from "@/components/ui/common/Button"
import { Textarea } from "@/components/ui/common/Textarea"


export function ChangeInfoForm() {

    const t = useTranslations('dashboard.settings.profile.info')
    const { user, isLoadingProfile } = useCurrent()

    const form = useForm<TypeChangeInfoSchema>({
        resolver: zodResolver(changeInfoSchema),
        values: {
            username: user?.username ?? '',
            displayName: user?.displayName ?? '',
            bio: user?.bio ?? ''
        }
    })

    const [update, { loading: isLoadingUpdate }] = useChangeProfileInfoMutation({

        update(cache, { data }) {
    
            if (!data?.changeProfileInfo) return
            const updateUser = data.changeProfileInfo
            cache.modify({
                id: cache.identify({
                    __typename: 'UserModel',
                    id: updateUser.id
                }),
                fields: {
                    username() {
                        return updateUser.username;
                    },
                    displayName() {
                        return updateUser.displayName;
                    },
                    bio() {
                        return updateUser.bio;
                    }
                }
            })
        },
        onCompleted() {
            toast(t('successMessage'))
        },
        onError(error) {
            toast.error(t(`${parseApolloMessage(error).code ?? 'UNKNOWN'}`))
        }
    })

    const { isDirty, isValid } = form.formState

    function onSubmit(data: TypeChangeInfoSchema) {
        update({ variables: { data } })
    }

    if (isLoadingProfile) return <ChangeIngoFormSkeleton />

    return <FormWrapper heading={t('heading')}>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className="px-5 pb-3">
                            <FormLabel>{t('userNameLabel')}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t('usernamePlaceholder')}
                                    disabled={isLoadingUpdate}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {t('usernameDescription')}
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name='displayName'
                    render={({ field }) => (
                        <FormItem className="p-5 pb-3">
                            <FormLabel>{t('displayNameLabel')}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t('displayNamePlaceholder')}
                                    disabled={isLoadingUpdate}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                {t('displayNameDescription')}
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Separator />
                <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                        <FormItem className="p-5 pb-3">
                            <FormLabel>{t('bioLabel')}</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder={t('bioPlaceholder')}
                                    disabled={isLoadingUpdate}
                                    {...field}

                                />
                            </FormControl>
                            <FormDescription>
                                {t('bioDescription')}
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Separator />
                <div className='flex justify-end p-5 pb-1'>
                    <Button disabled={!isValid || !isDirty || isLoadingUpdate}>{t("submitButton")}</Button>
                </div>
            </form>
        </Form>
    </FormWrapper>
}

