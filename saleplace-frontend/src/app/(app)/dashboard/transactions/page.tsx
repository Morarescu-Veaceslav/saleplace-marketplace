
import { Transactions } from "@/components/features/user/transaction/Transactions"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"


export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('dashboard.settings.transactions.header')

    return {
        title: t('heading'),
        description: t('description'),
        robots: {
            index: false,
            follow: false
        }

    }
}

export default function TransactionPage() {
    return (
        <Transactions />
    )
}