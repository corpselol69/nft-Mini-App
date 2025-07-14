import { NftData } from "@/types/nft"

export interface NftCardProps {
  data: NftData
  isMarket: boolean
  onClick?: () => void
  onMainAction?: () => void // Купить / Продавать
  onCartClick?: () => void // Добавить в корзину
  isInCart?: boolean // Показывать ли иконку "уже в корзине"
}
