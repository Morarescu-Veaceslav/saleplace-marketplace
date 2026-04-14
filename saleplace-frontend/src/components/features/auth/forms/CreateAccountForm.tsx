'use client'

import { useForm } from "react-hook-form";
import { createAccountSchema, type TypeCreateAccountSchema } from "@/schemas/auth/create-account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/common/Form";
import { Input } from "@/components/ui/common/Input";
import { Button } from "@/components/ui/common/Button";
import { useCreateUserMutation } from "@/graphql/generated/output";
import { toast } from "sonner";
import { parseApolloMessage } from "@/utils/gqlError";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/common/Alert";
import { CircleCheck, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";


export function CreateAccountForm() {

    const [isSuccess, setIsSuccess] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const t = useTranslations('auth.register')

    const form = useForm<TypeCreateAccountSchema>({

        resolver: zodResolver(createAccountSchema),
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    })

    const [create, { loading: isLoadingCreate }] = useCreateUserMutation({

        onCompleted() {
            setIsSuccess(true)
        },

        onError(error) {
            toast.error(t(`${parseApolloMessage(error).code}`))
        }
    })

    const { isValid } = form.formState

    function onSubmit(data: TypeCreateAccountSchema) {
        create({ variables: { data } })
    }

    return isSuccess
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('userNameLabel')}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='john'
                                        {...field}
                                        disabled={isLoadingCreate} />
                                </FormControl>
                                <FormDescription>{t('userNameDescription')}</FormDescription>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('emailLabel')}</FormLabel>
                                <FormControl>
                                    <Input placeholder='email@example.com'
                                        {...field}
                                        disabled={isLoadingCreate} />
                                </FormControl>
                                <FormDescription>{t('emailDescription')}</FormDescription>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>

                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={isShow ? "text" : "password"}
                                            placeholder="********"
                                            disabled={isLoadingCreate}
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

                    <Button variant='default' className="my-2 w-full" disabled={!isValid || isLoadingCreate}>{t('submitButton')}</Button>
                </form>
            </Form>
        )
}