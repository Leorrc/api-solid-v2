import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTransactionRepository } from '@/repositories/in-memory/in-memory-transactions-repository'
import { TransactionNotFound } from '../errors/transaction-not-found'
import { TransactionGetAllUserUseCase } from './get-all-user-transactions'
import { Prisma } from '@prisma/client'

let transactionRepository: InMemoryTransactionRepository
let sut: TransactionGetAllUserUseCase

describe('User be able to get all transactions', async () => {
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionRepository()
    sut = new TransactionGetAllUserUseCase(transactionRepository)
  })

  it('should be able to get all transaction', async () => {
    for (let index = 0; index < 10; index += 1) {
      await transactionRepository.create({
        title: 'Freela',
        amount: new Prisma.Decimal(5000),
        category: 'Site',
        type: 'Deposit',
        user_id: 'user-01',
      })
    }

    const { transaction } = await sut.execute({ userId: 'user-01' })

    expect(transaction).toHaveLength(10)
  })

  it('should not be able to get all transaction', async () => {
    await expect(() =>
      transactionRepository.findManyByUserId('non-existing-id'),
    ).rejects.toBeInstanceOf(TransactionNotFound)
  })
})
