import { Gift } from "@/types/gift"
import type { MarketItemRead, NftListItem } from "@/types/market"

const toNumber = (v: unknown) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

export const fromMarket = (it: MarketItemRead): NftListItem => ({
  id: it.gift.id,
  listing_id: it.id,
  title: it.gift.model.title,
  number: String(it.gift.number),
  price: toNumber(it.price),
  rarity: it.gift.model.base_rarity,
  preview: it.gift.preview_url,
  background: it.gift.background_url,
  source: "market",
})

export const fromProfile = (g: Gift): NftListItem => ({
  id: g.id,
  number: String(g.number),
  title: g.model.title,
  price: toNumber(g.price),
  rarity: g.model.base_rarity,
  locked: g.locked,
  preview: g.preview_url,
  background: g.background_url,
  source: "profile",
})
