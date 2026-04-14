import { ProductsList } from "@/components/features/profile/products/ProductsList";

export default async function HomePage({ searchParams }: any) {

    const params = await searchParams

    return <ProductsList searchParams={params} />
}

