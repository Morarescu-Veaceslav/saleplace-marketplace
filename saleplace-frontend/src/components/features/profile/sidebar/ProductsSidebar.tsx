'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm, useWatch } from "react-hook-form"
import { useEffect } from "react"

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl
} from "@/components/ui/common/Form"

import { Input } from "@/components/ui/common/Input"
import { Category, CategoryFilter } from "../../category/CategoryFilter"
import { useAllCategoryQuery } from "@/graphql/generated/output"
import { useTranslations } from "next-intl"

type FiltersForm = {
    search?: string
    minPrice?: number
    maxPrice?: number
    categoryId?: string
}

export function ProductSidebar() {

    const t = useTranslations('sidebar')
    const router = useRouter()
    const searchParams = useSearchParams()

    const { data } = useAllCategoryQuery()
    const pathname = usePathname()
    const categories = normalizeCategories(data?.allCategory ?? [])

    const form = useForm<FiltersForm>({
        defaultValues: {
            search: searchParams.get("search") ?? "",
            minPrice: searchParams.get("minPrice")
                ? Number(searchParams.get("minPrice"))
                : undefined,
            maxPrice: searchParams.get("maxPrice")
                ? Number(searchParams.get("maxPrice"))
                : undefined,
            categoryId: searchParams.get("categoryId") ?? undefined,
        }
    })

    const updateFilters = (values: FiltersForm) => {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(values).forEach(([key, value]) => {
            if (!value && value !== 0) {
                params.delete(key)
            } else {
                params.set(key, String(value))
            }
        })

        params.set("page", "1")

        router.push(`${pathname}?${params.toString()}`)
    }
    const values = useWatch({
        control: form.control
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            updateFilters(values)
        }, 500)

        return () => clearTimeout(timeout)
    }, [JSON.stringify(values)])

    return (
        <div className="p-4 space-y-6">

            <Form {...form}>

                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('search')}</FormLabel>
                            <FormControl>
                                <Input placeholder={t('searchPlaceholder')} {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('category')}</FormLabel>

                            <FormControl>
                                <CategoryFilter
                                    categories={categories}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>

                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="minPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('minPrice')}</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    step="0.01"
                                    placeholder="0"
                                    value={field.value ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value
                                        field.onChange(val ? Number(val) : undefined)
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="maxPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('maxPrice')}</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    step="0.01"
                                    placeholder="1000"
                                    value={field.value ?? ""}
                                    onChange={(e) => {
                                        const val = e.target.value
                                        field.onChange(val ? Number(val) : undefined)
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

            </Form>
        </div>
    )
}

export function normalizeCategories(data: any[]): Category[] {
    return data.map(cat => ({
        id: cat.id,
        name: cat.name,
        children: (cat.children ?? [])
            .filter(Boolean)
            .map((child: any) => ({
                id: child.id,
                name: child.name,
                children: []
            }))
    }))
}