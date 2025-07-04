import React, { ReactNode } from "react"
import styles from "./PriceTooltip.module.scss"
import { QuestionMarkIcon } from "@/components/StickersGrid/ui/NftDetailsTable/QuestionMarkIcon"
import { Tooltip } from "@/components/common/Tooltip/Tooltip"

type PriceTooltipProps = {
  price: ReactNode
}

export const PriceTooltip: React.FC<PriceTooltipProps> = ({ price }) => (
  <Tooltip
    content={
      <>
        <div className={styles.tooltipWrapper}>
          <div className={styles.tooltipLabel}>Базовая цена</div>
          <div className={styles.tooltipValue}>{price} TON</div>
        </div>
        <div className={styles.tooltipWrapper}>
          <div className={styles.tooltipLabel}>Комиссия</div>
          <div className={styles.tooltipValue}>{price} TON</div>
        </div>
        <div className={styles.tooltipWrapper}>
          <div className={styles.tooltipLabel}>Роялти</div>
          <div className={styles.tooltipValue}>{price} TON</div>
        </div>
      </>
    }
  >
    <QuestionMarkIcon />
  </Tooltip>
)
