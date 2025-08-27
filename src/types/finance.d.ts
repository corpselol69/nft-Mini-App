import { Gift } from "./gift"
import { TransactionType } from "./transaction"
export interface BalanceRead {
  available: string
  pending_out: string
}

export interface DepositPayload {
  amount: number | string
}

export interface WithdrawalPayload {
  amount: number | string
  address: string
}

export interface DepositResponse {
  invoice_id: string
  address: string
  amount: string
  payload: string
  comment: string
}

export interface ActivityRead {
  items: ActivityItem[]
  next_offset: string | null
}

export interface ActivityItem {
  id: string
  direction: "in" | "out"
  state: "pending" | "ok" | "failed"
  tx_type: TransactionType
  amount: string
  gift: Gift
  time: string
  listing_id: string | null
  listing_preview: {
    id: string
    gift_id: string

    price: string
    state: string
    created_at: string
    locked_by_order_id: null
    locked_until: null
  }
}
