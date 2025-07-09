import React from "react"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import addIcon from "@/static/icons/icn-add_shopping_cart.svg"
import styles from "./NftCard.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "../common/Icon/Icon"
import { useOutletContext } from "react-router-dom"
import { t } from "i18next"

type TProps = {
  title: string
  id: number
  price: number
  url: string
  status?: "sell" | "on sale"
  onClick: () => void
  addToCart: () => void
  onMainClick?: () => void
  onSecondaryClick?: () => void
}

export const NftCard: React.FC<TProps> = ({
  title,
  id,
  price,
  url,
  status,
  onClick,
  addToCart,

  onMainClick, // бывший onBuy
  onSecondaryClick,
}) => {
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

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
          {isMarket && (
            <>
              <Button color="accent" style={{ flex: 1 }} onClick={onMainClick}>
                {price}
                <Icon src={tonIcon} className={styles.tonIcon} />
              </Button>
              <Button type="secondary" onClick={addToCart}>
                <img src={addIcon} alt="Add to cart" />
              </Button>
            </>
          )}

          {!isMarket && status === "sell" && (
            <Button type="card-price" style={{ flex: 1 }} onClick={onClick}>
              {t("buttons.sell")}
            </Button>
          )}

          {!isMarket && status === "on sale" && (
            <Button type="card-price" style={{ flex: 1 }} onClick={onClick}>
              <div className={styles.onSale}>
                {t("for_sale")}
                <div className={styles.price}>
                  {price}
                  <Icon src={tonIcon} className={styles.tonIcon} />
                </div>
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
