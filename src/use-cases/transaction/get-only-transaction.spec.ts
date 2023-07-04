import { InMemoryTransactionRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { TransactionGetOnlyUseCase } from './get-only-transaction'
import { TransactionNotFound } from '../errors/transaction-not-found'
import { Prisma } from '@prisma/client'

let transactionRepository: InMemoryTransactionRepository
let sut: TransactionGetOnlyUseCase

describe('User be able to get only Transactions', async () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    sut = new TransactionGetOnlyUseCase(transactionRepository)
  })

  it('should be able to get only Transaction', async () => {
    const createdTransaction = await transactionRepository.create({
      title: 'Freela',
      amount: new Prisma.Decimal(5000),
      category: 'Site',
      type: 'Deposit',
      user_id: 'user-01',
    })

    const { transaction } = await sut.execute({
      transactionId: createdTransaction.id,
    })

    expect(createdTransaction.id).toEqual(transaction?.id)
  })

  it('should not be able to get all Transaction', async () => {
    await expect(() =>
      transactionRepository.findById('non-existing-id'),
    ).rejects.toBeInstanceOf(TransactionNotFound)
  })
})
