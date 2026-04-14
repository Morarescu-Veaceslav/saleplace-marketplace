'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/common/Select"
import { useAllCategoryQuery } from "@/graphql/generated/output"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

type Props = {
    value?: string
    onChange: (value: string) => void,
    defaultParentId?: string
    disabled?: boolean
}

export function CategorySelect({ value, onChange, defaultParentId, disabled }: Props) {


    useEffect(() => {
        if (defaultParentId) {
            setParentId(defaultParentId)
        }
    }, [defaultParentId])

    const t = useTranslations('dashboard.product.step1.category')
    const { data } = useAllCategoryQuery()

    const [parentId, setParentId] = useState(defaultParentId || "")

    const parentCategories = data?.allCategory ?? []

    if (!parentCategories.length) return null

    const selectedParent = parentCategories.find(p => p.id === parentId)


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Select
                value={parentId}
                disabled={disabled}
                onValueChange={(val) => {
                    setParentId(val)
                    onChange("")
                }}>
                <SelectTrigger className="w-full" size="md">
                    <SelectValue placeholder={t('placeholderParent')} />
                </SelectTrigger>

                <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    sideOffset={1}
                >
                    {parentCategories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                key={parentId}
                value={value}
                onValueChange={onChange}
                disabled={!selectedParent || disabled}
            >
                <SelectTrigger className="w-full" size="md">
                    <SelectValue placeholder={t('placeholderChild')} />
                </SelectTrigger>

                <SelectContent
                    position="popper"
                    side="bottom"
                    align="start"
                    sideOffset={1}

                >
                    {selectedParent?.children?.map((child: any) => (
                        <SelectItem key={child.id} value={child.id}>
                            {child.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}