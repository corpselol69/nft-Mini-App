import { NftListItem } from "@/types/market"
export interface NftGridProps {
  items: NftListItem[]
  isMarket: boolean
  onCardClick?: (id: string) => void
  onMainAction?: (nft: NftListItem) => void
  onCartClick?: (nft: NftListItem) => void
  isInCart?: (id: string) => boolean
}
