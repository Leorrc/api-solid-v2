import { expect, describe, it, beforeEach } from 'vitest'
import { CreateTransactionUseCase } from './create-transaction'
import { Prisma } from '@prisma/client'
import { InMemoryTransactionRepository } from '@/repositories/in-memory/in-memory-transactions-repository'

let transactionRepository: InMemoryTransactionRepository
let sut: CreateTransactionUseCase

describe('Create Transaction Use Case', () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    sut = new CreateTransactionUseCase(transactionRepository)
  })
  it('should be able to create transaction', async () => {
    const { transaction } = await sut.execute({
      title: 'Freelas',
      amount: new Prisma.Decimal(5000),
      category: 'WebSite',
      type: 'Deposit',
      userId: 'user-01',
    })

    expect(transaction.id).toEqual(expect.any(String))
  })
})
