'use client'

import { useState } from "react"
import { AuthWrapper } from "../AuthWrapper"
import { LoginForm } from "./LoginForm"
import { CreateAccountForm } from "./CreateAccountForm"
import { useTranslations } from "next-intl"
import { cn } from "@/utils/tw-merge"
import { Button } from "@/components/ui/common/Button"

type AuthMode = 'login' | 'register'

export const AuthPage = () => {
    const [mode, setMode] = useState<AuthMode>('login')
    const t = useTranslations('auth.login')
    const registerT = useTranslations('auth.register')

    return (
        <AuthWrapper
            heading={mode === 'login' ? t('heading') : registerT('heading')}
            description={
                mode === 'login'
                    ? t('description')
                    : registerT('description')
            }
        >

            <div className="mb-6">
                <div
                    className={cn(
                        "grid grid-cols-2 w-full rounded-sm border bg-white dark:bg-gray-800",
                        "border-gray-300 dark:border-gray-600"
                    )}
                >
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setMode("login")}
                        className={cn(
                            "rounded-none px-3 py-2 text-sm transition",
                            mode === "login"
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground"
                        )}
                    >
                        {t("submitButton")}
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setMode("register")}
                        className={cn(
                            "rounded-none px-3 py-2 text-sm transition",
                            mode === "register"
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground"
                        )}
                    >
                        {registerT("submitButton")}
                    </Button>
                </div>
            </div>

            {mode === 'login' ? <LoginForm /> : <CreateAccountForm />}
        </AuthWrapper>
    )

}