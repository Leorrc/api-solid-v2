import { TransactionRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface TransactionGetOnlyUseCaseRequest {
  transactionId: string
}

interface TransactionGetOnlyUseCaseResponse {
  transaction: Transaction | null
}

export class TransactionGetOnlyUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private transactionRepository: TransactionRepository) { }

  async execute({
    transactionId,
  }: TransactionGetOnlyUseCaseRequest): Promise<TransactionGetOnlyUseCaseResponse> {
    const transaction = await this.transactionRepository.findById(transactionId)

    return {
      transaction,
    }
  }
}
