import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { TransactionGetAllUserUseCase } from '../transaction/get-all-user-transactions'

export function makeGetAllUserTransactionUseCase() {
  const transactionRepository = new PrismaTransactionsRepository()
  const useCase = new TransactionGetAllUserUseCase(transactionRepository)

  return useCase
}
