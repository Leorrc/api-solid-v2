import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { TransactionGetOnlyUseCase } from '../transaction/get-only-transaction'

export function makeGetOnlyTransactionUseCase() {
  const transactionRepository = new PrismaTransactionsRepository()
  const useCase = new TransactionGetOnlyUseCase(transactionRepository)

  return useCase
}
