import {
  Reduce,
  TransactionRepository,
} from '@/repositories/transactions-repository'

interface SummaryUseCaseRequest {
  userId: string
}

interface SummaryUseCaseResponse {
  summary: Reduce
}

export class SummaryUserUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private transactionRepository: TransactionRepository) { }

  async execute({
    userId,
  }: SummaryUseCaseRequest): Promise<SummaryUseCaseResponse> {
    const summary = await this.transactionRepository.summaryAmount(userId)

    return { summary }
  }
}
