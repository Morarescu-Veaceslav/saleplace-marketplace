import { AuthPage } from "@/components/features/auth/forms/AuthPage"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('auth.login')
    return {
        title: t('heading')
    }
}

export default function LoginPage() {
    return (
        <AuthPage />
    )

}