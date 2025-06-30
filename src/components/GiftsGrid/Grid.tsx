import React from "react"
import styles from "./GiftsGrid.module.scss"
import { ItemCard } from "./ItemCard/ItemCard"

// Пример данных для карточек
const mockNfts = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
]

type TProps = {
  //FIXME: добавить нормальные типы
  onElementClick: (nft: any) => void
}

export const Grid: React.FC<TProps> = ({ onElementClick }) => {
  return (
    <div className={styles.grid}>
      {mockNfts.map(nft => (
        <ItemCard onClick={() => onElementClick(nft)} />
      ))}
    </div>
  )
}
