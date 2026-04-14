"use client"


import { cn } from "@/utils/tw-merge"
import { Separator as SeparatorPrimitive } from "radix-ui"
import type { ComponentProps } from "react"

function Separator({
    className,
    orientation = "horizontal",
    decorative = true,
    ...props
}: ComponentProps<typeof SeparatorPrimitive.Root>) {
    return (
        <SeparatorPrimitive.Root
            data-slot="separator"
            decorative={decorative}
            orientation={orientation}
            className={cn(
                "bg-border border shrink-0 " +
                "data-horizontal:h-[0.5px] data-horizontal:w-full " +
                "data-vertical:w-[0.5px] data-vertical:self-stretch",
                className
            )}
            {...props}
        />
    )
}

export { Separator }
