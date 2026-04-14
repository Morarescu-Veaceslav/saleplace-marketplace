import { Skeleton } from "@/components/ui/common/Skeleton";

export function ChatUsersSkeleton() {
    return (
        <div className="flex items-center gap-3 h-16 px-2 py-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="w-3/4 h-4 rounded-sm" />
                <Skeleton className="w-1/2 h-4 rounded-sm" />
            </div>
            <Skeleton className="w-7 h-7 rounded-full" />
        </div>
    )
}

export function ChatSkeleton() {
    return (
        <div className="flex w-full gap-4">
            <div className="flex flex-col h-[calc(100vh-200px)] w-full max-w-3xl border rounded-md overflow-hidden">

                <div className="flex justify-center py-2">
                    <Skeleton className="h-6 w-24" />
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse gap-2">
                    {Array.from({ length: 8 }).map((_, idx) => {
                        const isMe = idx % 2 === 0; 

                        return (
                            <div
                                key={idx}
                                className={`flex w-full py-1 ${isMe ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`flex items-end gap-2 max-w-[65%] ${isMe ? "flex-row-reverse" : ""}`}
                                >
                                    <Skeleton className="h-10 w-10 rounded-full" />

                                    <div
                                        className={`px-3 py-2 rounded-2xl text-sm bg-muted
                                        ${isMe ? "rounded-br-sm" : "rounded-bl-sm"}`}
                                    >
                                
                                        <Skeleton className="h-3 w-20 mb-1 rounded" />
                                        <Skeleton className="h-5 rounded" />

                                        <div className={`text-[10px] text-muted-foreground mt-1 ${isMe ? 'text-right' : 'text-start'}`}>
                                            <Skeleton className="h-3 w-10 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="border-t p-2">
                    <Skeleton className="h-10 w-full rounded" />
                </div>
            </div>
        </div>
    )
}