import { makeGetOnlyTransactionUseCase } from '@/use-cases/factories/make-get-only-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOnlyTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getOnlyTransactionParamsSchema = z.object({
    transactionId: z.string(),
  })

  const { transactionId } = getOnlyTransactionParamsSchema.parse(request.params)

  const getOnlyTransactionUseCase = makeGetOnlyTransactionUseCase()

  const { transaction } = await getOnlyTransactionUseCase.execute({
    transactionId,
  })

  return reply.status(200).send({ transaction })
}
