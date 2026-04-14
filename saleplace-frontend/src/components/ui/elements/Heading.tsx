'use client'

import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/utils/tw-merge";
import { cva, type VariantProps } from "class-variance-authority";


const headingSize = cva('font-semibold text-foreground', {
    variants: {
        size: {
            sm: 'text-base sm:text-lg',
            md: 'text-lg sm:text-xl lg:text-2xl',
            default: 'text-xl sm:text-2xl lg:text-3xl',
            lg: 'text-2xl sm:text-3xl lg:text-4xl',
            xl: 'text-3xl sm:text-4xl lg:text-5xl',
        },
    },
    defaultVariants: {
        size: 'default',
    },
})

interface HeadingProps extends VariantProps<typeof headingSize> {
    title: string,
    description?: string
}
export function Heading({ size, title, description }: HeadingProps) {
    const { isCollapsed } = useSidebar()
    return (
        <div
            className={cn(
                'space-y-2 transition-all duration-200 ease-out',
                isCollapsed
                    ? 'opacity-90 -translate-x-1'
                    : 'opacity-100 translate-x-0'
            )}
        >
            <h1
                className={cn(
                    'font-semibold text-foreground transition-[font-size,transform] duration-200',
                    headingSize({ size })
                )}
            >
                {title}
            </h1>

            {description && (
                <p className="text-muted-foreground max-w-[65ch] transition-all duration-200">
                    {description}
                </p>
            )}
        </div>
    )
}