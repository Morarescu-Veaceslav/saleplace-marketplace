import { useChangePasswordMutation } from "@/graphql/generated/output"
import { useCurrent } from "@/hooks/useCurrent"
import { changePasswordSchema, type TypeChangePasswordSchema } from "@/schemas/user/change-password.schema"
import { parseApolloMessage } from "@/utils/gqlError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { ChangePasswordFormSkeleton } from "./ChangePasswordSkeleton"
import { FormWrapper } from "@/components/ui/elements/FormWrapper"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/common/Form"
import { Input } from "@/components/ui/common/Input"
import { Separator } from "@/components/ui/common/Separator"
import { Button } from "@/components/ui/common/Button"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export function ChangePasswordForm() {
    const { isLoadingProfile } = useCurrent()
    const [showPasswords, setShowPasswords] = useState(false)
    const t = useTranslations('dashboard.settings.account.password')
    const form = useForm<TypeChangePasswordSchema>({
        resolver: zodResolver(changePasswordSchema),
        values: {
            oldPassword: "",
            newPassword: ""
        }
    })

    const [update, { loading: isLoadingChangePassword }] = useChangePasswordMutation({
        onCompleted() {
            toast.success(t('successMessage'))
            form.reset()
        },
        onError(error) {
            toast.error(t(parseApolloMessage(error).code || 'errorMessage'))
        }
    })

    const { isValid, isDirty } = form.formState

    function onSubmit(data: TypeChangePasswordSchema) {
        update({ variables: { data } })
    }


    if (isLoadingProfile) return <ChangePasswordFormSkeleton />

    return (
        <FormWrapper heading={t('heading')}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3'>
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem className="px-5">
                                <FormLabel>{t("oldPasswordLabel")}</FormLabel>

                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            placeholder={t("oldPasswordPlaceholder")}
                                            type={showPasswords ? "text" : "password"}
                                            disabled={isLoadingChangePassword}
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

                                <FormDescription>{t("oldPasswordDescription")}</FormDescription>
                            </FormItem>
                        )}
                    />
                    <Separator />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem className="px-5">
                                <FormLabel>{t("newPasswordLabel")}</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder={t("newPasswordPlaceholder")}
                                        type={showPasswords ? "text" : "password"}
                                        disabled={isLoadingChangePassword}
                                    />
                                </FormControl>
                                <FormDescription>{t("newPasswordDescription")}</FormDescription>
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-end p-5 pb-1'>
                        <Button disabled={!isValid || !isDirty || isLoadingChangePassword}>{t('submitButton')}</Button>
                    </div>
                </form>
            </Form>

        </FormWrapper>
    )
}