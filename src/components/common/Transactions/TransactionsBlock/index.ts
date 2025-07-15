import { Transaction } from "../../../../types/transaction"
export type TransactionType = "buy" | "sell" | "deposit" | "bonus" | "withdraw"

export interface TransactionGroup {
  date: string
  transactions: Transaction[]
}

export interface TransactionHistoryProps {
  onTransactionClick?: (transaction: Transaction) => void
}
