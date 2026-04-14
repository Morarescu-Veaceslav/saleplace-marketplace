'use client'

import { TableCell, TableRow } from "@/components/ui/common/Table";
import { TransactionListItem } from "@/graphql/generated/output";
import { formatCurrency } from "@/utils/convert-price";
import { getStatusColor } from "@/utils/get-status-color";
import { format } from "date-fns";
import { Activity, Badge } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";


export function TransactionRow({ tx }: { tx: TransactionListItem }) {
    const t = useTranslations('dashboard.settings.transactions.status')
    const locale = useLocale()
    return (
        <TableRow className="text-start">
            <TableCell>
                {format(new Date(tx.createdAt), 'MMM dd, yyyy')}
            </TableCell>

            <TableCell>{tx.productTitle}</TableCell>

            <TableCell>{tx.counterpartyUsername}</TableCell>

            <TableCell>
                <div className="flex items-center gap-2">
                    <Badge />
                    {tx.viewerRole}
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Activity className={getStatusColor(tx.status)} />
                    {t(tx.status)}
                </div>
            </TableCell>

            <TableCell className="text-right font-medium">
                {formatCurrency(tx.amount, locale, "EUR")}
            </TableCell>
        </TableRow>
    )
}
