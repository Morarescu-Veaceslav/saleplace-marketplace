import { BlockedUsers } from "@/components/features/profile/blocked/BlockedUsers";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('profile.blockedUsers.header')
    return {
        title: t('heading'),
        description: t('description'),
        robots: {
            index: false,
            follow: false
        }
    }
}

export default function Blocked() {
    return <BlockedUsers />
}