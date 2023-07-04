import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { TransactionDeleteUseCase } from '../transaction/delete-transaction'

export function makeDeleteTransactionUseCase() {
  const transactionRepository = new PrismaTransactionsRepository()
  const useCase = new TransactionDeleteUseCase(transactionRepository)

  return useCase
}
