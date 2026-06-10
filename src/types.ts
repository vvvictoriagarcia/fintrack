export type Category =
  | 'Food & Dining'
  | 'Transport'
  | 'Housing'
  | 'Entertainment'
  | 'Health'
  | 'Shopping'
  | 'Savings'
  | 'Income'
  | 'Other'

export type TransactionType = 'expense' | 'income'

export interface Transaction {
  id: string
  description: string
  amount: number
  type: TransactionType
  category: Category
  date: string
}
