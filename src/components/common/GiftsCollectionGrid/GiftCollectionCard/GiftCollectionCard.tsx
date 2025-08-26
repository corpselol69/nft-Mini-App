import React from "react"
import styles from "./GiftCollectionCard.module.scss"
import { Button } from "@/components/common/Button/Button"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import Icon from "@/components/common/Icon/Icon"
import { NavLink } from "react-router-dom"
import { MarketCollectionRead } from "@/types/market"
import formatAmount from "@/helpers/formatAmount"
import { NftPreview } from "../../NftPreview/NftPreview"

type TProps = {
  item: MarketCollectionRead
  link: string
}

export const GiftCollectionCard: React.FC<TProps> = ({ item }) => {
  return (
    <NavLink to={`/market/gifts/${item.model_id}`} className={styles.root}>
      <NftPreview preview_url={item.preview_url} background_url="" />

      <div className={styles.content}>
        <div className={styles.textBlock}>
          <div className={styles.title}>{item.model_title}</div>
        </div>
        <div className={styles.actions}>
          <Button type="secondary">
            от {formatAmount(item.price_min)}
            <Icon src={tonIcon} color="active" style={{ width: "16px" }} />
          </Button>
        </div>
      </div>
    </NavLink>
  )
}
