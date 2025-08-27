import { ActivityItem } from "@/types/finance"
import { Transaction } from "../../../../types/transaction"

export interface TransactionGroup {
  date: string
  items: ActivityItem[]
}

export interface TransactionHistoryProps {
  onTransactionClick?: (transaction: Transaction) => void
}
