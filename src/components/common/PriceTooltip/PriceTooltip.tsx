import React, { ReactNode } from "react"
import styles from "./PriceTooltip.module.scss"
import { Tooltip } from "@/components/common/Tooltip/Tooltip"
import questionMarkIcon from "@/static/icons/question_mark.svg"
import Icon from "../Icon/Icon"

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
    <Icon src={questionMarkIcon} className={styles.questionMarkIcon} />
  </Tooltip>
)
