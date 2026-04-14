'use client'

import { Button } from "@/components/ui/common/Button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/common/Form"
import { Input } from "@/components/ui/common/Input"
import { useNewPasswordMutation } from "@/graphql/generated/output"
import { newPasswordSchema, type TypeNewPasswordSchema } from "@/schemas/auth/new-password.schema"
import { parseApolloMessage } from "@/utils/gqlError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { AuthWrapper } from "../AuthWrapper"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function NewPasswordForm() {

    const t = useTranslations('auth.newPassword')
    const [showPasswords, setShowPasswords] = useState(false)
    const router = useRouter()

    const params = useParams<{ token: string }>()

    const form = useForm<TypeNewPasswordSchema>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: '',
            passwordRepeat: ''
        }
    })

    const [newPassword, { loading: isLoadingNewPassword }] = useNewPasswordMutation({
        onCompleted() {
            toast.success(t('successMessage'))
            router.push('/auth')
        },

        onError(error) {
            toast.error(t(`${parseApolloMessage(error).code}`))
        },
    })

    const { isValid } = form.formState

    function onSubmit(data: TypeNewPasswordSchema) {
        newPassword({ variables: { data: { ...data, token: params.token } } })
    }

    return <AuthWrapper
        heading={t('heading')}
        description={t('description')}
    >
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("passwordLabel")}</FormLabel>

                            <FormControl>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        type={showPasswords ? "text" : "password"}
                                        placeholder="********"
                                        disabled={isLoadingNewPassword}
                                        className="pr-10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPasswords((v) => !v)}
                                        className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPasswords ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </FormControl>

                            <FormDescription>{t("passwordDescription")}</FormDescription>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="passwordRepeat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("passwordRepeatLabel")}</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type={showPasswords ? "text" : "password"}
                                    placeholder="********"
                                    disabled={isLoadingNewPassword}
                                />
                            </FormControl>
                            <FormDescription>{t("passwordRepeatDescription")}</FormDescription>
                        </FormItem>
                    )}
                />

                <Button
                    variant='default'
                    className="my-2 w-full"
                    disabled={!isValid || isLoadingNewPassword}
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