import { Transaction } from '@prisma/client'
import currencyFormatter from './currencyFormatter'

export default function transactionsFormatter(transactions: any[]) {
  const newList = transactionCurrencyFormatter(transactions)
  return transactionCurrencyFormatter(newList)
}

function transactionCurrencyFormatter(transactions: any[]) {
  const newList = transactions.map((transaction: Transaction) => {
    return {
      ...transaction,
      value: currencyFormatter('pt-BR', 'BRL', transaction.amount),
    }
  })
  return newList
}
