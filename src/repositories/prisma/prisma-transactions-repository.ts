import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { TransactionRepository } from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionRepository {
  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = await prisma.transaction.create({
      data,
    })
    return transaction
  }

  async delete(transactionId: string) {
    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    })
  }

  async findManyByUserId(userId: string, searchValue: string, filter: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
        title: {
          contains: searchValue,
        },
        type: {
          contains: filter,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })
    console.log(transactions)
    return transactions
  }

  async findById(transactionId: string) {
    const transaction = await prisma.transaction.findUniqueOrThrow({
      where: {
        id: transactionId,
      },
    })

    return transaction
  }

  async summaryAmount(userId: string) {
    const transactions = await prisma.transaction.findMany({
      where: {
        user_id: userId,
      },
    }) // Obtém todas as transações

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'deposit') {
          acc.deposit += transaction.amount
          acc.total += transaction.amount
        } else {
          acc.withdraw += transaction.amount
          acc.total -= transaction.amount
        }

        return acc
      },
      {
        deposit: 0,
        withdraw: 0,
        total: 0,
      },
    )
    console.log([summary])
    return [summary]
  }
}
