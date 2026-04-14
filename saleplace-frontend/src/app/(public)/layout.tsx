'use client'

import { Header } from "@/components/layout/header/Header";
import type { PropsWithChildren } from "react";

export default function ProductsLayout({ children }: PropsWithChildren<unknown>) {

    return <div className="flex h-full w-full flex-col">
        <div className="felx-1">
            <div className="fixed inset-y-0 z-50 h-18.75 w-full">
                <Header />
            </div>
            {children}
        </div>
    </div>
}