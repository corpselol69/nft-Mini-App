import { NftData } from "@/types/nft"

export interface NftGridProps {
  items: NftData[]
  isMarket: boolean
  onCardClick?: (id: string) => void
  onMainAction?: (nft: NftData) => void
  onCartClick?: (nft: NftData) => void
  isInCart?: (id: string) => boolean
}
