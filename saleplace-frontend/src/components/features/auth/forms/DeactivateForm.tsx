'use client'

import { useDeactivateAccountMutation } from "@/graphql/generated/output"
import { useAuth } from "@/hooks/useAuth"
import { client } from "@/libs/apollo-client"
import { deactivateSchema, type TypeDeactivateSchema } from "@/schemas/auth/deactivate.schema"
import { parseApolloMessage } from "@/utils/gqlError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { AuthWrapper } from "../AuthWrapper"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/common/Form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/common/InputOTP"
import { Input } from "@/components/ui/common/Input"
import { Button } from "@/components/ui/common/Button"
import Link from "next/link"

export function DeactivateForm() {

    const t = useTranslations('auth.deactivate')

    const { exit } = useAuth()
    const router = useRouter()

    const [isShowConfirm, setIsShowConfirm] = useState(false)

    const form = useForm<TypeDeactivateSchema>({
        resolver: zodResolver(deactivateSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const [deactivate, { loading: isLoadingDeactivate }] = useDeactivateAccountMutation({
        onCompleted(data) {
            if (data.deactivateAccount.success) {
                client.clearStore();
                exit()
                toast.success(t('successMessage'))
                router.push('/')
            }
            if (data.deactivateAccount.message === 'VERIFICATION_REQUIRED') {
                toast.info(t('verificationCodeSent'))
                setIsShowConfirm(true)
            }
        },

        onError(error) {
            toast.error(t(parseApolloMessage(error).code))
        }
    })

    const { isValid } = form.formState

    function onSubmit(data: TypeDeactivateSchema) {
        console.log(data)
        deactivate({ variables: { data } })
    }

    return <AuthWrapper
        heading={t('heading')}
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3'>
                {isShowConfirm ? (
                    <FormField
                        control={form.control}
                        name='pin'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('pinLabel')}</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>{t('pinDescription')}</FormDescription>
                            </FormItem>
                        )}
                    />

                ) : (
                    <>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('emailLabel')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="email@example.com"
                                            disabled={isLoadingDeactivate}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>{t('emailDescription')}</FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('passwordLabel')}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="********"
                                            type='password'
                                            disabled={isLoadingDeactivate}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>{t('passwordDescription')}</FormDescription>
                                </FormItem>
                            )}
                        />
                    </>
                )}
                <Button className='mt-2 w-full' disabled={!isValid || isLoadingDeactivate}>{t('submitButton')}</Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
                <Link
                    href="dashboard/settings"
                    className="font-medium text-primary underline hover:opacity-80"
                >
                    {t('backButtonLabel')}
                </Link>
            </p>
        </Form>
    </AuthWrapper>
}