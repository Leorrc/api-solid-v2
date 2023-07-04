import { TransactionRepository } from '@/repositories/transactions-repository'
import { Transaction } from '@prisma/client'

interface TransactionGetAllUserUseCaseRequest {
  userId: string
  searchValue: string
  filter: string
}

interface TransactionGetAllUserUseCaseResponse {
  transaction: Transaction[]
}

export class TransactionGetAllUserUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private transactionRepository: TransactionRepository) { }

  async execute({
    userId,
    searchValue,
    filter,
  }: TransactionGetAllUserUseCaseRequest): Promise<TransactionGetAllUserUseCaseResponse> {
    const transaction = await this.transactionRepository.findManyByUserId(
      userId,
      searchValue,
      filter,
    )

    return { transaction }
  }
}
