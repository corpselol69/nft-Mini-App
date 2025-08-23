import React from "react"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import addIcon from "@/static/icons/icn-add_shopping_cart.svg"
import removeIcon from "@/static/icons/icn-red-cart.svg"

import styles from "./NftCard.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "../Icon/Icon"
import { t } from "i18next"

import { NftCardProps } from "./NftCard.d"
import SkeletonNode from "antd/es/skeleton/Node"
import { NftPreview } from "../NftPreview/NftPreview"

export const NftCard: React.FC<NftCardProps> = ({
  data,
  isMarket,
  onClick,
  onMainAction,
  onCartClick,
  isInCart,
}) => {
  return (
    <div className={styles.root} onClick={onClick}>
      {!data.preview ? (
        <SkeletonNode
          active
          className={styles.patternSvg}
          style={{ width: "100%", height: 163, borderRadius: 12 }}
        />
      ) : (
        <NftPreview
          preview_url={data.preview}
          background_url={data.background}
        />
      )}

      <div className={styles.content}>
        <div className={styles.textBlock}>
          <div className={styles.title}>{data.title}</div>
          <div className={styles.id}>#{data.number}</div>
        </div>
        <div className={styles.actions}>
          {isMarket ? (
            <>
              <Button
                color="accent"
                style={{ flex: 1 }}
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  onMainAction?.()
                }}
                className={
                  isInCart ? styles.priceButtonCompact : styles.priceButton
                }
              >
                {data.price}
                <Icon src={tonIcon} className={styles.tonIcon} />
              </Button>
              <Button
                type="secondary"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  onCartClick?.()
                }}
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
                  {data.price}
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
