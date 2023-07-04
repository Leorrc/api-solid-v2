import { TransactionRepository } from '@/repositories/transactions-repository'
import { Prisma, Transaction } from '@prisma/client'

interface CreateTransactionUseCaseRequest {
  userId: string
  title: string
  amount: Prisma.Decimal
  category: string
  type: string
}

interface CreateTransactionUseCaseResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private transactionRepository: TransactionRepository) { }

  async execute({
    userId,
    title,
    amount,
    category,
    type,
  }: CreateTransactionUseCaseRequest): Promise<CreateTransactionUseCaseResponse> {
    const transaction = await this.transactionRepository.create({
      user_id: userId,
      title,
      amount: Number(amount),
      category,
      type,
    })

    return {
      transaction,
    }
  }
}
