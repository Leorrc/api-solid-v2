import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

describe('Delete transactions (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a transaction', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const transaction = await prisma.transaction.create({
      data: {
        title: 'Freela',
        amount: new Prisma.Decimal(5000),
        category: 'Site',
        type: 'Deposit',
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .delete(`/transactions/delete/${transaction.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
