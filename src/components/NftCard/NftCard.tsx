import React from "react"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import addIcon from "@/static/icons/icn-add_shopping_cart.svg"
import removeIcon from "@/static/icons/icn-red-cart.svg"

import styles from "./NftCard.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "../common/Icon/Icon"
import { t } from "i18next"

import { NftCardProps } from "./NftCard.d"

export const NftCard: React.FC<NftCardProps> = ({
  data,
  isMarket,
  onClick,
  onMainAction,
  onCartClick,
  isInCart,
}) => {
  const { title, id, price, url, status } = data

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
          {isMarket ? (
            <>
              <Button
                color="accent"
                style={{ flex: 1 }}
                onClick={onMainAction}
                className={
                  isInCart ? styles.priceButtonCompact : styles.priceButton
                }
              >
                {price}
                <Icon src={tonIcon} className={styles.tonIcon} />
              </Button>
              <Button
                type="secondary"
                onClick={onCartClick}
                className={isInCart ? styles.cartButtonWide : styles.cartButton}
              >
                <img src={isInCart ? removeIcon : addIcon} alt="Add to cart" />
              </Button>
            </>
          ) : status === "sell" ? (
            <Button type="card-price" style={{ flex: 1 }} onClick={onClick}>
              {t("buttons.sell")}
            </Button>
          ) : status === "on sale" ? (
            <Button type="card-price" style={{ flex: 1 }} onClick={onClick}>
              <div className={styles.onSale}>
                {t("for_sale")}
                <div className={styles.price}>
                  {price}
                  <Icon src={tonIcon} className={styles.tonIcon} />
                </div>
              </div>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
