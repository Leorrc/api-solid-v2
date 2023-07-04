import { Prisma, Transaction } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { Reduce, TransactionRepository } from '../transactions-repository'
import { TransactionNotFound } from '@/use-cases/errors/transaction-not-found'

export class InMemoryTransactionRepository implements TransactionRepository {
  public items: Transaction[] = []
  summaryAmount(userId: string): Promise<Reduce[]> {
    throw new Error('Method not implemented.')
  }

  async findById(transactionId: string) {
    const transaction = this.items.find((item) => item.id === transactionId)

    if (!transaction) {
      return null
    }

    return transaction
  }

  async findManyByUserId(userId: string) {
    const transactionMany = this.items.filter((item) => item.user_id === userId)

    if (transactionMany.length === 0) {
      throw new TransactionNotFound()
    }

    return transactionMany
  }

  async create(data: Prisma.TransactionUncheckedCreateInput) {
    const transaction = {
      id: randomUUID(),
      title: data.title,
      amount: 5000,
      category: data.category,
      type: data.type,
      created_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(transaction)

    return transaction
  }

  async delete(transactionId: string) {
    this.items = this.items.filter(
      (transaction) => transaction.id !== transactionId,
    )
  }
}
