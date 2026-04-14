'use client'

import { Button } from "@/components/ui/common/Button"
import { Input } from "@/components/ui/common/Input"
import { SearchIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function Search() {

    const t = useTranslations('layout.header.search')

    const [searchTerm, setSearchTerm] = useState('')

    const router = useRouter()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (searchTerm.trim()) {
            router.push(`/products?searchTerm=${searchTerm}`)
        } else {
            router.push('/products')
        }
    }

    return (
        <div className="ml-auto hidden lg:block">
            <form onSubmit={onSubmit} className="relative flex items-center">
                <Input
                    placeholder={t('placeholder')}
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 lg:w-100"
                />
                <Button className="absolute right-0.5 h-9" type="submit">
                    <SearchIcon className="absolute size-4.5" />
                </Button>
            </form>
        </div>
    )
}