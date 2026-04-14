import { UserProductsList } from "@/components/features/product/UserProductsList"

export default async function UserProducts({
    params,
}: {
    params: Promise<{ username: string }>
}) {
    const { username } = await params
    return <UserProductsList username={username} />
}
