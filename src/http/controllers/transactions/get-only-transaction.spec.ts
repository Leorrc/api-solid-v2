import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('User get only transactions (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get a transaction', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const transaction = await prisma.transaction.create({
      data: {
        title: 'Freela',
        amount: Number(500),
        category: 'Site',
        type: 'Deposit',
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .get(`/transactions/get-only-transaction/${transaction.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
