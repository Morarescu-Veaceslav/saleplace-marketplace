import { cn } from "@/utils/tw-merge"
import { ComponentProps } from "react"


function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted rounded-md animate-pulse", className)}
      {...props}
    />
  )
}

export { Skeleton }
