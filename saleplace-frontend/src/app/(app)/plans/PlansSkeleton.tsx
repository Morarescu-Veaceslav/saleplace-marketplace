import { Card, CardContent, CardHeader } from "@/components/ui/common/Card"
import { Skeleton } from "@/components/ui/common/Skeleton"

export function PlanCardSkeleton() {
    return (
        <Card className="border-2 rounded-xl">
            <CardHeader className="flex flex-col items-center space-y-3 text-center p-6">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-4 w-20" />
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-4 p-6">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full rounded-md" />
            </CardContent>
        </Card>
    )
}