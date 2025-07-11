export interface Transaction {
  id: string
  tx_hash: string | null
  direction: "in" | "out"
  state: "pending" | "ok" | "failed"
  tx_type: string
  amount: string
  payload: string | null
  block_time: string | null
}

export interface OutgoingCreatePayload {
  amount: number | string
  to_address: string
  tx_type?: string // default: "withdraw"
}
