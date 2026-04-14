import { Skeleton } from "@/components/ui/common/Skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/common/Table";

export function TransactionSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <TableHead key={i}>
                            <Skeleton className="h-4 w-20" />
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>

            <TableBody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {Array.from({ length: 6 }).map((_, cellIndex) => (
                            <TableCell key={cellIndex}>
                                <Skeleton className="h-4 w-full" />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}