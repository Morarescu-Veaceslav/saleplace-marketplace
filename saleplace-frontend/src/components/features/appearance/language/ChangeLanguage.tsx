'use client'


import { Button } from "@/components/ui/common/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/common/DropdownMenu";
import { useAuth } from "@/hooks/useAuth";
import { setLanguageAction } from "@/libs/i18n/actions";
import { Language, languages } from "@/libs/i18n/config";
import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { toast } from "sonner";
import { ChangeLanguageSkeleton } from "./ChangeLanguageSkeleton";

const LANGUAGES_LABELS: Record<Language, string> = {
    ru: 'RU',
    en: 'EN',
}

export function ChangeLanguage() {
    const { isInitialized } = useAuth()
    const t = useTranslations('dashboard.settings.appearance.language')
    const locale = useLocale() as Language
    const [isPending, startTransition] = useTransition()

    function changeLanguage(language: Language) {
        if (language === locale) return

        startTransition(async () => {
            await setLanguageAction(language)
            toast.success(t('successMessage'))
        })
    }

    if (!isInitialized) return <ChangeLanguageSkeleton />

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:opacity-70 text-xs font-semibold"
                    aria-label={t('changeLanguage')}
                >
                    {LANGUAGES_LABELS[locale]}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {languages.map((code) => (
                    <DropdownMenuItem
                        key={code}
                        disabled={isPending || code === locale}
                        onClick={() => changeLanguage(code)}
                    >
                        {LANGUAGES_LABELS[code]}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


