'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/common/Alert"
import { Button } from "@/components/ui/common/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/common/Form"
import { Input } from "@/components/ui/common/Input"
import { useResetPasswordMutation } from "@/graphql/generated/output"
import { resetPasswordSchema, type TypeResetPasswordSchema } from "@/schemas/auth/reset-password.schema"
import { parseApolloMessage } from "@/utils/gqlError"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleCheck } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { AuthWrapper } from "../AuthWrapper"
import { useState } from "react"
import Link from "next/link"


export function ResetPasswordForm() {

    const t = useTranslations('auth.resetPassword')

    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<TypeResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: ''
        }
    })

    const [resetPassword, { loading: isLoadingReset }] = useResetPasswordMutation({

        onCompleted() {
            setIsSuccess(true)
        },

        onError(error) {
            toast.error(t(`${parseApolloMessage(error).code}`))
        }
    })

    const { isValid } = form.formState

    function onSubmit(data: TypeResetPasswordSchema) {
        resetPassword({ variables: { data } })
    }


    return <AuthWrapper
        heading={t('heading')}
        description={t('description')}
    >

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {isSuccess
                    ?
                    (
                        <Alert>
                            <CircleCheck className="size-4" />
                            <AlertTitle>{t('successAlertTitle')}</AlertTitle>
                            <AlertDescription>{t('successAlertDescription')}</AlertDescription>
                        </Alert>
                    )
                    :
                    (
                        <>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('emailLabel')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder='email@example.com'
                                                {...field}
                                                disabled={isLoadingReset} />
                                        </FormControl>
                                        <FormDescription>{t('emailDescription')}</FormDescription>
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                <Button
                    variant='default'
                    className="my-2 w-full"
                    disabled={!isValid || isLoadingReset || isSuccess}
                >
                    {t('submitButton')}
                </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
                <Link
                    href="/auth"
                    className="font-medium text-primary underline hover:opacity-80"
                >
                    {t('backButtonLabel')}
                </Link>
            </p>
        </Form>
    </AuthWrapper >
}