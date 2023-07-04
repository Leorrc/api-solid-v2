import { makeGetAllUserTransactionUseCase } from '@/use-cases/factories/make-get-all-user-transaction-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAllUserTransaction(
  request: FastifyRequest<any, any, any, any, any>,
  reply: FastifyReply,
) {
  const getAllUserTransactionUseCase = makeGetAllUserTransactionUseCase()

  const searchValue =
    ((request.query as Record<string, any>).searchValue as string) || ''

  const filter = ((request.query as Record<string, any>).filter as string) || ''

  const { transaction } = await getAllUserTransactionUseCase.execute({
    userId: request.user.sub,
    searchValue,
    filter,
  })
  if (transaction.length === 0) {
    return reply.status(404).send({ message: 'Nenhum resultado encontrado.' })
  }

  return reply.status(200).send(transaction)
}
