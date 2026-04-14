import { Button } from "@/components/ui/common/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/common/Form"
import { Input } from "@/components/ui/common/Input"
import { Separator } from "@/components/ui/common/Separator"
import { FormWrapper } from "@/components/ui/elements/FormWrapper"
import { useChangeEmailMutation } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { client } from "@/libs/apollo-client"
import { changeEmailSchema, type TypeChangeEmailSchema } from "@/schemas/user/change-email.schema"
import { parseApolloMessage } from "@/utils/gqlError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ChangeEmailFormSkeleton } from "./ChangeEmailSkeleton"

export function ChangeEmailForm() {

    const t = useTranslations('dashboard.settings.account.email')

    const { user, isLoadingProfile } = useCurrent()

    const form = useForm<TypeChangeEmailSchema>({
        resolver: zodResolver(changeEmailSchema),
        defaultValues: {
            email: user?.email ?? '',
            password: ''
        }
    })


    const [update, { loading: isLoadingUpdate }] = useChangeEmailMutation({
        onCompleted(data) {
            if (!data?.changeEmail) return;
            client?.cache.modify({
                id: client.cache.identify({ __typename: 'UserModel', id: data.changeEmail.id }),
                fields: {
                    email() {
                        return data.changeEmail.email
                    }
                }
            })
            form.reset({
                email: data.changeEmail.email,
                password: ''
            })
            toast.success(t('successMessage'))
        },
        onError(error) {
            toast.error(t(parseApolloMessage(error).code))
        }
    })

    const { isValid, isDirty } = form.formState

    function onSubmit(data: TypeChangeEmailSchema) {
        update({ variables: { data } })
    }

    if (isLoadingProfile) return <ChangeEmailFormSkeleton />

    return (
        <FormWrapper heading={t('heading')}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className="px-5">
                                <FormLabel>{t('emailLabel')}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='email@example.com'
                                        disabled={isLoadingUpdate}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>{t('emailDescription')}</FormDescription>
                            </FormItem>
                        )}
                    />
                    <Separator />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem className="px-5">
                                <FormLabel>{t('passwordLabel')}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={t('enterCurrentPassword')}
                                        type='password'
                                        disabled={isLoadingUpdate}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>{t('passwordDescription')}</FormDescription>
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-end p-5 pb-1'>
                        <Button disabled={!isValid || !isDirty || isLoadingUpdate}>{t('submitButton')}</Button>
                    </div>
                </form>
            </Form>

        </FormWrapper>
    )
}
