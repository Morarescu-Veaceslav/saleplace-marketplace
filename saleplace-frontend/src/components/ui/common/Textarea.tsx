import { cn } from "@/utils/tw-merge"
import type { ComponentProps } from "react"


function Textarea({ className, ...props }: ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "w-full rounded-sm border px-3 py-2 text-sm transition-shadow outline-none resize-none",
                "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
                "placeholder:text-gray-400",
                "hover:border-(--brand-hover)",
                "focus:border-(--brand) focus:ring-1 focus:ring-(--brand) focus:ring-offset-0",
                "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/50",
                "disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50",
                "min-h-24",
                className
            )}
            {...props}
        />
    )
}

export { Textarea }
