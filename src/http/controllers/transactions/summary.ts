import { makeSummaryUseCase } from '@/use-cases/factories/make-summary'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function summary(request: FastifyRequest, reply: FastifyReply) {
  const summaryUseCase = makeSummaryUseCase()

  const { summary } = await summaryUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ summary })
}
