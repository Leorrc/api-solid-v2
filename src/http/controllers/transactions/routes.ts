import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { deleteTransaction } from './delete'
import { getAllUserTransaction } from './get-all-user-transaction'
import { getOnlyTransaction } from './get-only-transaction'
import { summary } from './summary'

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/transactions/:userId', create)
  app.delete('/transactions/delete/:transactionId', deleteTransaction)

  app.get(
    '/transactions/get-all-user-transaction/:userId',
    getAllUserTransaction,
  )
  app.get(
    '/transactions/get-only-transaction/:transactionId',
    getOnlyTransaction,
  )
  app.get('/transactions/summary', summary)
}
