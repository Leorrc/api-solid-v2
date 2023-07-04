import { makeDeleteTransactionUseCase } from '@/use-cases/factories/make-delete-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteTransactionBodySchema = z.object({
    transactionId: z.string().uuid(),
  })

  const { transactionId } = deleteTransactionBodySchema.parse(request.params)

  const deleteUseCase = makeDeleteTransactionUseCase()

  await deleteUseCase.execute({ transactionId })

  return reply.status(200).send()
}
