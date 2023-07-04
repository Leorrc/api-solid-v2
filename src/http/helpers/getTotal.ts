import { Decimal } from '@prisma/client/runtime'
import currencyFormatter from './currencyFormatter'
import { Transaction } from '@prisma/client'

export default function getTotal(userId: string, transactions: Transaction[]) {
  const summary = transactions.reduce((acc, transaction) => {
    const accDecimal = new Decimal(acc)
    if (account.id === transaction.destinationAccountId) {
      return accDecimal.plus(transaction.amount)
    }
    return accDecimal.minus(transaction.amount)
  }, new Decimal(0))
  return currencyFormatter('pt-BR', 'BRL', totalValue)
}

const summary = transactions.reduce(
  (acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposit += transaction.amount
      acc.total += transaction.amount
    } else {
      acc.withdraw += transaction.amount
      acc.total -= transaction.amount
    }

    return acc
  },
  {
    deposit: 0,
    withdraw: 0,
    total: 0,
  },
)
