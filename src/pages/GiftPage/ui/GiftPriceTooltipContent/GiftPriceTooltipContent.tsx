import React, { ReactNode } from "react"
import styles from "./GiftPriceTooltipContent.module.scss"

type PriceTooltipContentProps = {
  price: ReactNode
}

export const GiftPriceTooltipContent: React.FC<PriceTooltipContentProps> = ({
  price,
}) => (
  <>
    <div className={styles.tooltipWrapper}>
      <div className={styles.tooltipLabel}>Базовая цена</div>
      <div className={styles.tooltipValue}>{price} TON</div>
    </div>
    <div className={styles.tooltipWrapper}>
      <div className={styles.tooltipLabel}>Цена с комиссией</div>
      <div className={styles.tooltipValue}>{price} TON</div>
    </div>
    <div className={styles.tooltipWrapper}>
      <div className={styles.tooltipLabel}>Цена продажи</div>
      <div className={styles.tooltipValue}>{price} TON</div>
    </div>
  </>
)
