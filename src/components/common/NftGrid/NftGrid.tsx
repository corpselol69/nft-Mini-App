import React from "react"
import styles from "./NftGrid.module.scss"
import { NftCard } from "../NftCard/NftCard"
import { NftGridProps } from "./NftGrid.d"

export const NftGrid: React.FC<NftGridProps> = ({
  items,
  isMarket,
  onCardClick,
  onMainAction,
  onCartClick,
  isInCart,
}) => {
  return (
    <div className={styles.grid}>
      {items.map(nft => (
        <NftCard
          key={nft.id}
          data={nft}
          isMarket={isMarket}
          onClick={() => onCardClick?.(nft.id)}
          onMainAction={() => onMainAction?.(nft)}
          onCartClick={() => onCartClick?.(nft.listing_id || "")}
          isInCart={isInCart?.(nft.listing_id || "")}
        />
      ))}
    </div>
  )
}
