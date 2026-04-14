"use client"

import { cn } from "@/utils/tw-merge"
import type { ComponentProps } from "react"


function Table({ className, ...props }: ComponentProps<"table">) {
    return (
        <div className="relative w-full overflow-x-auto rounded-xl border bg-background">
            <table
                className={cn("w-full caption-bottom text-sm", className)}
                {...props}
            />
        </div>
    )
}

function TableHeader({ className, ...props }: ComponentProps<"thead">) {
    return (
        <thead
            className={cn(
                "bg-muted/40 text-muted-foreground [&_tr]:border-b",
                className
            )}
            {...props}
        />
    )
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
    return (
        <tbody
            data-slot="table-body"
            className={cn("[&_tr:last-child]:border-0", className)}
            {...props}
        />
    )
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
            {...props}
        />
    )
}

function TableRow({ className, ...props }: ComponentProps<"tr">) {
    return (
        <tr
            className={cn(
                "border-b transition-colors odd:bg-muted/30 hover:bg-muted/60 data-[state=selected]:bg-muted",
                className
            )}
            {...props}
        />
    )
}

function TableHead({ className, ...props }: ComponentProps<"th">) {
    return (
        <th
            className={cn(
                "h-12 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide whitespace-nowrap",
                className
            )}
            {...props}
        />
    )
}

function TableCell({ className, ...props }: ComponentProps<"td">) {
    return (
        <td
            className={cn(
                "px-4 py-3 align-middle whitespace-nowrap",
                className
            )}
            {...props}
        />
    )
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
    return (
        <caption
            className={cn(
                "mt-4 p-3 text-sm text-muted-foreground text-start",
                className
            )}
            {...props}
        />
    )
}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
}
