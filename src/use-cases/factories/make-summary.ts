import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository'
import { SummaryUserUseCase } from '../transaction/summary'

export function makeSummaryUseCase() {
  const transactionRepository = new PrismaTransactionsRepository()
  const useCase = new SummaryUserUseCase(transactionRepository)

  return useCase
}
