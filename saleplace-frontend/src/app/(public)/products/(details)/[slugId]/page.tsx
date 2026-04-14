import { ProductDetails } from "@/components/features/product/ProductDetails"
import { GetOneDocument } from "@/graphql/generated/output"
import { client } from "@/libs/apollo-client"

export default async function ProductPage({
    params,
}: {
    params: Promise<
        { slugId: string }
    >
}) {
    const paramsId = await params
    const id = paramsId.slugId.slice(0, 36)

    const data = await client.query({
        query: GetOneDocument,
        variables: { id },
        fetchPolicy: "no-cache"
    })

    return <ProductDetails product={data.data.getOne} />
}