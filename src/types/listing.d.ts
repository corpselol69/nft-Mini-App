import { Gift } from "./gift"

export interface ListingCreate {
  gift_id: string
  price: number | string
}

export interface ListingUpdate {
  price: number | string
}

export type ListingState =
  | "canceled"
  | "active"
  | "sold"
  | "unavailable"
  | "locked"

export interface ListingRead {
  id: string
  gift_id: string
  price: string
  state: ListingState
  created_at: string
  locked_by_order_id: string | null
  locked_until: string | null
}

export interface ListingGiftRead {
  id: string
  gift_id: string
  price: string
  state: ListingState
  created_at: string
  locked_by_order_id: string | null
  locked_until: string | null
  gift: Gift
}
