import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "../common/Pagination"

type AppPaginationProps = {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
}

export function AppPagination({
    page,
    totalPages,
    onPageChange,
}: AppPaginationProps) {
    if (totalPages <= 1) return null

    return (
        <div className="mt-8 flex justify-center">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => onPageChange(Math.max(page - 1, 1))}
                            aria-disabled={page === 1}
                        />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <PaginationItem key={p}>
                            <PaginationLink
                                isActive={p === page}
                                onClick={() => onPageChange(p)}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
                            aria-disabled={page === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}