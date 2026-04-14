'use client'

import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/common/Table";
import { TransactionListItem } from "@/graphql/generated/output";
import { useTranslations } from "next-intl";
import { TransactionRow } from "./TransactionRow";
import { TransactionSkeleton } from "./TransactionSkeleton";

interface Props {
    transactions: TransactionListItem[]
    loading?: boolean
}
export function TransactionTable({ transactions, loading }: Props) {

    const t = useTranslations('dashboard.settings.transactions')

    if (loading) {
        return <TransactionSkeleton rows={10} />
    }

    if (!transactions.length) {
        return (
            <p className="text-start text-muted-foreground py-8">
                {t('notFound')}
            </p>
        )
    }

    return (
        <Table>
            <TableCaption>{t('caption')}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>{t('columns.date')}</TableHead>
                    <TableHead>{t('columns.product')}</TableHead>
                    <TableHead>{t('columns.counterparty')}</TableHead>
                    <TableHead>{t('columns.role')}</TableHead>
                    <TableHead>{t('columns.status')}</TableHead>
                    <TableHead className="text-right">{t('columns.amount')}</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {transactions.map(tx => (
                    <TransactionRow key={tx.id} tx={tx} />
                ))}
            </TableBody>
        </Table>
    )
}


