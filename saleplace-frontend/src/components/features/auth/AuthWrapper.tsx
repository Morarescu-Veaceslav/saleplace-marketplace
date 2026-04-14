import { PropsWithChildren } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/common/Card";

interface AuthWrapperProps {
    heading: string
    description?: string,
}

export function AuthWrapper({
    children,
    heading,
    description
}: PropsWithChildren<AuthWrapperProps>) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold">
                        {heading}
                    </CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}