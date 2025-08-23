import { NftListItem } from "@/types/market"

export interface NftCardProps {
  data: NftListItem
  isMarket: boolean
  onClick?: () => void
  onMainAction?: () => void // Купить / Продавать
  onCartClick?: () => void // Добавить в корзину
  isInCart?: boolean // Показывать ли иконку "уже в корзине"
}
