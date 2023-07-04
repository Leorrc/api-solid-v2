import { Prisma, Transaction } from '@prisma/client'

export interface Reduce {
  deposit: number
  withdraw: number
  total: number
}

export interface TransactionRepository {
  create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>
  delete(transactionId: string): Promise<void>
  findManyByUserId(
    userId: string,
    searchValue: string,
    filter: string,
  ): Promise<Transaction[]>
  findById(title: string): Promise<Transaction | null>
  summaryAmount(userId: string): Promise<Reduce[]>
}
