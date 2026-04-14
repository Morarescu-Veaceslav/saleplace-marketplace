'use client'

import { Button } from "@/components/ui/common/Button"
import { useState } from "react"

export type Category = {
    id: string
    name: string
    children?: Category[]
}

type Props = {
    categories: Category[]
    value?: string
    onChange?: (value: string) => void
}

export function CategoryFilter({ categories, value, onChange }: Props) {
    const [openParent, setOpenParent] = useState<string | null>(null)

    const toggleParent = (id: string) => {
        setOpenParent(prev => (prev === id ? null : id))
    }

    return (
        <div className="space-y-4">

            {categories.map(parent => {
                const isOpen = openParent === parent.id

                return (
                    <div key={parent.id}>

                        <Button
                            type="button"
                            variant='ghost'
                            onClick={() => toggleParent(parent.id)}
                            className="w-full flex justify-between items-center font-semibold"
                        >
                            {parent.name}
                            <span>{isOpen ? "−" : "+"}</span>
                        </Button>

                        {isOpen && (
                            <div className="ml-3 mt-2 space-y-1">
                                {parent.children?.map(child => {
                                    const isSelected = value === child.id

                                    return (
                                        <Button
                                            key={child.id}
                                            variant='ghost'
                                            type="button"
                                            onClick={() => onChange?.(child.id)}
                                            className={`block text-sm ${isSelected
                                                ? "text-blue-600 font-medium"
                                                : "text-muted-foreground hover:text-black"
                                                }`}
                                        >
                                            {child.name}
                                        </Button>
                                    )
                                })}
                            </div>
                        )}

                    </div>
                )
            })}

        </div>
    )
}