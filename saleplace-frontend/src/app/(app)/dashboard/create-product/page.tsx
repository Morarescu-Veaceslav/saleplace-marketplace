
import { CreateProductStep1 } from "@/components/features/user/create-product/CreateProductStep1"
import { CreateProductStep2 } from "@/components/features/user/create-product/CreateProductStep2"
import { CreateProductStep3 } from "@/components/features/user/create-product/CreateProductStep3"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { redirect } from "next/navigation"

export async function generateMetadata({ searchParams }: {
    searchParams: Promise<{
        step?: string
    }>
}): Promise<Metadata> {

    const params = await searchParams;
    const step = params.step ?? "1"

    const t = await getTranslations(`dashboard.product.step${step}.header`)

    return {
        title: t('heading'),
        description: t('description'),
        robots: {
            index: false,
            follow: false
        }
    }
}

export default async function CreateProductPage({
    searchParams
}: {
    searchParams: Promise<{
        step?: string
        productId?: string
    }>
}) {

    const params = await searchParams
    const step = params.step ?? "1";
    const productId = params.productId;

    if ((step === "2" || step === "3") && !productId) {
        return redirect("/dashboard/create-product")
    }

    if (step === "1") {
        return <CreateProductStep1 />;
    }

    if (step === "2") {
        return <CreateProductStep2 productId={productId!} />;
    }

    if (step === "3") {
        return <CreateProductStep3 productId={productId!} />;
    }

    return null;
}