export interface Transaction {
  id: string
  tx_hash: string | null
  direction: "in" | "out"
  state: "pending" | "ok" | "failed"
  tx_type: TransactionType
  amount: string
  payload: string | null
  block_time: string | null
  created_at: string
}

export interface OutgoingCreatePayload {
  amount: number | string
  to_address: string
  tx_type?: TransactionType
}

export type TransactionType =
  | "sale"
  | "purchase"
  | "deposit"
  | "bonus"
  | "withdraw"
