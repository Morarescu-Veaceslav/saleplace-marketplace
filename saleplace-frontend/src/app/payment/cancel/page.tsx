import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import PaymentCancelPage from "./CancelPage"



export async function generateMetadata(): Promise<Metadata> {
    const translation = await getTranslations('payment.cancel')

    return {
        title: translation('heading'),
        robots: {
            index: false,
            follow: false
        }
    }
}
export default function CancelPage() {
    return (
        <PaymentCancelPage />
    )
}

