import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/common/Card"
import { Skeleton } from "@/components/ui/common/Skeleton"

export function SubscriptionCardSkeleton() {
    return (
        <Card className="border-2 rounded-xl">
            <CardHeader className="flex flex-col items-center space-y-3 text-center p-6">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-9 w-48" />
                <Skeleton className="h-4 w-20" />
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-3 text-sm sm:text-base p-6">
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-32" />
            </CardContent>

            <CardFooter className="w-full px-6 pt-2">
                <Skeleton className="h-9 w-full rounded-md" />
            </CardFooter>
        </Card>
    )
}