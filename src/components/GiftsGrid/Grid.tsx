import React from "react"
import styles from "./GiftsGrid.module.scss"
import { ItemCard } from "./ItemCard/ItemCard"
import { IGiftCard } from "./types"
import { mockGiftCards } from "./const"

type TProps = {
  onGiftCategoryClick: (nft: IGiftCard) => void
}

export const Grid: React.FC<TProps> = ({ onGiftCategoryClick }) => {
  return (
    <div className={styles.grid}>
      {mockGiftCards.map(nft => (
        <ItemCard
          key={nft.id}
          onClick={() => onGiftCategoryClick(nft)}
          item={nft}
        />
      ))}
    </div>
  )
}
