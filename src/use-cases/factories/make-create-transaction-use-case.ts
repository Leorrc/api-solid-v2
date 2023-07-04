import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { CreateTransactionUseCase } from '../transaction/create-transaction'

export function makeCreateTransactionUseCase() {
  const transactionRepository = new PrismaTransactionsRepository()
  const useCase = new CreateTransactionUseCase(transactionRepository)

  return useCase
}
