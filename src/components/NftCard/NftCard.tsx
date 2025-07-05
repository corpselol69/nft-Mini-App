import React from "react"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import addIcon from "@/static/icons/shopping_cart.svg"
import styles from "./NftCard.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "../common/Icon/Icon"

type TProps = {
  title: string
  id: number
  price: number
  url: string
  onClick: () => void
  addToCart: () => void
}

export const NftCard: React.FC<TProps> = ({
  title,
  id,
  price,
  url,
  onClick,
  addToCart,
}) => {
  return (
    <div className={styles.root}>
      <div
        className={styles.pic}
        style={{ backgroundImage: `url(${url})` }}
        onClick={onClick}
      />
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <div className={styles.title}>{title}</div>
          <div className={styles.id}>#{id}</div>
        </div>
        <div className={styles.actions}>
          <Button color="accent" style={{ flex: 1 }}>
            {price}
            <Icon src={tonIcon} className={styles.tonIcon} />
          </Button>
          <Button type="secondary" onClick={addToCart}>
            <img src={addIcon} alt="Add to cart" />
          </Button>
        </div>
      </div>
    </div>
  )
}
