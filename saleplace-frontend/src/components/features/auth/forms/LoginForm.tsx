'use client'

import { useLoginUserMutation } from "@/graphql/generated/output"
import { loginSchema, type TypeLoginSchema } from "@/schemas/auth/login.schema"
import { parseApolloMessage } from "@/utils/gqlError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/common/Form"
import { Button } from "@/components/ui/common/Button"
import { Input } from "@/components/ui/common/Input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/common/InputOTP"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { restartApollo, wsClient } from "@/libs/apollo-client"
export function LoginForm() {

    const router = useRouter()
    const [isShow, setIsShow] = useState(false)
    const t = useTranslations('auth.login')

    const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)

    const form = useForm<TypeLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: '',
            password: ''
        }
    })

    const [login, { loading: isLoadingLogin }] = useLoginUserMutation({

        async onCompleted(data) {

            const { user, message } = data.loginUser;

            if (user) {
                await restartApollo()
                toast.success(t('successMessage'));
                router.push('/dashboard/settings');
                return;
            }

            if (message) {
                setIsShowTwoFactor(true);
                form.setValue("pin", "");
                form.trigger();
                return;
            }

            toast.error(t('LOGIN_ERROR'));
        },
        onError(error) {
            toast.error(t(`${parseApolloMessage(error).code}`))
        }
    })

    const { isValid } = form.formState

    function onSubmit(data: TypeLoginSchema) {
        login({
            variables: {
                data: {
                    login: data.login,
                    password: data.password,
                    pin: data.pin ? data.pin : null
                }
            }
        })
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {isShowTwoFactor
                ?
                (
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
                )
                :
                (
                    <>
                        <FormField
                            control={form.control}
                            name='login'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('loginLabel')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder='email@example.com'
                                            {...field}
                                            disabled={isLoadingLogin} />
                                    </FormControl>
                                    <FormDescription>{t('loginDescription')}</FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel>{t("passwordLabel")}</FormLabel>
                                        <Link href="/recovery" className="text-sm text-primary hover:underline">
                                            {t("forgotPassword")}
                                        </Link>
                                    </div>

                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                {...field}
                                                type={isShow ? "text" : "password"}
                                                placeholder="********"
                                                disabled={isLoadingLogin}
                                                className="pr-10"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => setIsShow((prev) => !prev)}
                                                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                                            >
                                                {isShow ? (
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
                    </>
                )}
            <Button variant='default' className="my-2 w-full" disabled={!isValid || isLoadingLogin}>{t('submitButton')}</Button>
        </form>
    </Form>
}