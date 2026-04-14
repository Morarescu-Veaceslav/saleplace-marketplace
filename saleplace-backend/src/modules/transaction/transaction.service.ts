import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { TransactionListItem } from './model/transaction.model';
import { TransactionsPaginationInput } from './input/transaction-pagination';
import { TransactionsListResponse } from './model/transaction-list';

@Injectable()
export class TransactionService {

    constructor(private readonly prismaService: PrismaService) { }

    async getTransactions(
        userId: string,
        pagination: TransactionsPaginationInput = {},
    ): Promise<TransactionsListResponse> {

        const take = pagination.take ?? 12
        const skip = pagination.skip ?? 0

        const [items, total] = await this.prismaService.$transaction([
            this.prismaService.transaction.findMany({
                take,
                skip,
                where: {
                    OR: [
                        { order: { sellerId: userId } },
                        { order: { buyerId: userId } },
                    ],
                },
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    amount: true,
                    currency: true,
                    status: true,
                    createdAt: true,
                    order: {
                        select: {
                            id: true,
                            product: { select: { title: true } },
                            buyer: { select: { id: true, username: true } },
                            seller: { select: { id: true, username: true } },
                        },
                    },
                },
            }),

            this.prismaService.transaction.count({
                where: {
                    OR: [
                        { order: { sellerId: userId } },
                        { order: { buyerId: userId } },
                    ],
                },
            }),
        ])

        return {
            items: items.map(tx => {
                const isSeller = tx.order.seller.id === userId

                return {
                    id: tx.id,
                    orderId: tx.order.id,
                    productTitle: tx.order.product.title,
                    amount: tx.amount.toNumber(),
                    currency: tx.currency,
                    status: tx.status,
                    createdAt: tx.createdAt,
                    viewerRole: isSeller ? 'SELLER' : 'BUYER',
                    counterpartyId: isSeller
                        ? tx.order.buyer.id
                        : tx.order.seller.id,
                    counterpartyUsername: isSeller
                        ? tx.order.buyer.username
                        : tx.order.seller.username,
                }
            }),
            pagination: {
                total,
                take,
                skip,
            },
        }
    }

}
