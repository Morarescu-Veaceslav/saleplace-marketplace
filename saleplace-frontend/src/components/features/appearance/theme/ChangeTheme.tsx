'use client'

import { Button } from "@/components/ui/common/Button"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { ChangeThemeSkeleton } from "./ChangeThemeSkeleton"

export function ThemeToggle() {
    const { isInitialized } = useAuth()
    const { theme, setTheme } = useTheme()
    const t = useTranslations('dashboard.settings.appearance.theme')

    const isDark = theme === 'dark'

    function toggleTheme() {
        const nextTheme = isDark ? 'light' : 'dark'
        setTheme(nextTheme)
        toast.success(
            nextTheme === 'dark'
                ? t('darkEnabled')
                : t('lightEnabled')
        )
    }

    if (!isInitialized) return <ChangeThemeSkeleton />
    
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:opacity-70"
            onClick={toggleTheme}
            aria-label={t('toggleTheme')}
        >
            {isDark ? (
                <Sun className="size-5" />
            ) : (
                <Moon className="size-5" />
            )}
        </Button>
    )
}

