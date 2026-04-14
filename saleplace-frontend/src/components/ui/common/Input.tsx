import { cn } from "@/utils/tw-merge"
import type { ComponentProps } from "react"



function Input({ className, type, ...props }: ComponentProps<"input">) {
    return (
        <input
            type={type}
            className={cn(
                "w-full rounded-sm border px-3 py-2 text-sm placeholder:text-gray-400 transition-shadow outline-none",
                "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                "hover:border-(--brand-hover)",
                "focus:border-(--brand) focus:ring-1 focus:ring-(--brand) focus:ring-offset-0",
                "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/50",
                "disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    )
}


export { Input }
