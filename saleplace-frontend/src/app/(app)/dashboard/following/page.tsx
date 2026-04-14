
import { FollowingList } from "@/components/features/user/following/FollowingList"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('dashboard.settings.following.header')

    return {
        title: t('heading'),
        description: t('description'),
        robots: {
            index: false,
            follow: false
        }

    }
}

export default function FollowingPage() {
    return <FollowingList />
}