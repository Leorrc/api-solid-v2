import { beforeEach, describe, expect, it } from 'vitest'
import { TransactionNotFound } from '../errors/transaction-not-found'
import { InMemoryTransactionRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { TransactionDeleteUseCase } from './delete-transaction'
import { Prisma } from '@prisma/client'

let transactionRepository: InMemoryTransactionRepository
let sut: TransactionDeleteUseCase

describe('Transaction be able to delete transaction', async () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    sut = new TransactionDeleteUseCase(transactionRepository)
  })

  it('should be able to delete transaction', async () => {
    const createdTransaction = await transactionRepository.create({
      title: 'Freela',
      amount: new Prisma.Decimal(5000),
      category: 'Site',
      type: 'Deposit',
      user_id: 'user-01',
    })

    await sut.execute({ transactionId: createdTransaction.id })

    await expect(() =>
      transactionRepository.findById(createdTransaction.id),
    ).rejects.toBeInstanceOf(TransactionNotFound)
  })
})
