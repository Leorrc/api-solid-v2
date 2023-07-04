import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateTransactionUseCase } from '@/use-cases/factories/make-create-transaction-use-case'
import { Decimal } from '@prisma/client/runtime/library'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTransactionBodySchema = z.object({
    title: z.string(),
    amount: z.number(),
    category: z.string(),
    type: z.string(),
  })

  const { title, amount, category, type } = createTransactionBodySchema.parse(
    request.body,
  )

  const createTransactionUseCase = makeCreateTransactionUseCase()

  await createTransactionUseCase.execute({
    title,
    amount: new Decimal(amount),
    category,
    type,
    userId: request.user.sub,
  })

  return reply.status(201).send()
}
