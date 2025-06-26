import React from "react"
import tonIcon from "../../../assets/icons/icn-S_ton.svg"
import addIcon from "../../../assets/icons/icn-add_shopping_cart.svg"
import styles from "./NftCard.module.scss"
import { Button } from "../Button/Button"

type TProps = {
  onClick: () => void
}

export const NftCard: React.FC<TProps> = ({ onClick }) => {
  return (
    <div className={styles.root} onClick={onClick}>
      <div
        className={styles.pic}
        style={{ backgroundImage: `url('img'), url('img1')` }}
      />
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <div className={styles.title}>Bored Stickers</div>
          <div className={styles.subtitle}>#0001</div>
        </div>
        <div className={styles.actions}>
          <Button color="accent" style={{ flex: 1 }}>
            95
            <img className={styles.tonIcon} src={tonIcon} alt="TON" />
          </Button>
          <Button type="secondary">
            <img src={addIcon} alt="Add to cart" />
          </Button>
        </div>
      </div>
    </div>
  )
}
