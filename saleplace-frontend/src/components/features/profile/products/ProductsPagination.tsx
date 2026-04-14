
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/common/Pagination"
import { useRouter, useSearchParams } from "next/navigation"

type Props = {
    page: number
    totalPages: number
}

export function ProductsPagination({ page, totalPages }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const goToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", String(newPage))

        router.push(`/?${params.toString()}`)
    }

    return (
        <Pagination className="mt-6">
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => goToPage(page - 1)}
                        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                <PaginationItem>
                    <span className="px-3 text-sm">
                        {page} / {totalPages}
                    </span>
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext
                        onClick={() => goToPage(page + 1)}
                        className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}