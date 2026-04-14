'use client'

import { Heading } from "@/components/ui/elements/Heading"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { TransactionTable } from "./TransactionTable"
import { AppPagination } from "@/components/ui/elements/Pagination"
import { useTransactionsListQuery } from "@/graphql/generated/output"

export function Transactions() {

    const [page, setPage] = useState(1)
    const take = 10
    const skip = (page - 1) * take

    const t = useTranslations('dashboard.settings.transactions')

    const { data, loading } = useTransactionsListQuery({
        variables: {
            pagination: {
                take,
                skip
            }

        },
        fetchPolicy: 'cache-and-network',
    })

    const transactions = data?.transactionsList
    const items = transactions?.items ?? []
    const total = transactions?.pagination.total ?? 0
    const totalPages = Math.ceil(total / take)

    return (
        <div className="w-full lg:px-10">
            <Heading title={t('header.heading')} description={t('header.description')} />

            <TransactionTable
                transactions={items}
                loading={loading}
            />

            <AppPagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>

    )
}