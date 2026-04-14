import { Card, CardContent } from "@/components/ui/common/Card";
import { Skeleton } from "@/components/ui/common/Skeleton";


export function BlokedUserCardSkeleton() {
    return (
        <Card className="transition hover:bg-muted/40">
            <CardContent className="flex flex-col items-center gap-4 p-4">

                <Skeleton className="h-16 w-16 rounded-full" />

                <div className="w-full space-y-2 text-center">
                    <Skeleton className="mx-auto h-4 w-32" />
                    <Skeleton className="mx-auto h-3 w-24" />
                    <Skeleton className="mx-auto h-3 w-40" />
                </div>

                <Skeleton className="h-8 w-24 rounded-md" />
            </CardContent>
        </Card>
    )
}