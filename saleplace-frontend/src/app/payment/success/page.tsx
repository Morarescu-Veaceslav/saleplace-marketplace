import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import PaymentSuccessPage from "./SuccessPage"


export async function generateMetadata(): Promise<Metadata> {
    const translation = await getTranslations('payment.success')

    return {
        title: translation('heading'),
        robots: {
            index: false,
            follow: false
        }
    }
}
export default function SuccessPage() {
    return (
        <PaymentSuccessPage />
    )
}