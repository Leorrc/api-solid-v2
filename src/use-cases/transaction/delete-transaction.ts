import { TransactionRepository } from '@/repositories/transactions-repository'

interface TransactionDeleteUseCaseRequest {
  transactionId: string
}

export class TransactionDeleteUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private snackRepository: TransactionRepository) { }

  async execute({ transactionId }: TransactionDeleteUseCaseRequest) {
    await this.snackRepository.delete(transactionId)
  }
}
