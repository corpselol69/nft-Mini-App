import React from "react"
import styles from "./GiftImageWithText.module.scss"

type Props = {
  imgSrc: string
  name: string
  id: string | number
}

export const GiftImageWithText: React.FC<Props> = ({ imgSrc, name, id }) => {
  return (
    <div className={styles.detailGiftSheetImageWrapper}>
      <img src={imgSrc} width={210} height={210} alt={name} />
      <div className={styles.detailGiftSheetImageText}>
        <span className={styles.detailGiftSheetName}>{name}</span>
        <span className={styles.detailGiftSheetSubName}>#{id}</span>
      </div>
    </div>
  )
}
