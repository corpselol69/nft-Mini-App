import React from "react"
import styles from "./PriceTooltip.module.scss"
import { Tooltip } from "@/components/common/Tooltip/Tooltip"
import questionMarkIcon from "@/static/icons/question_mark.svg"
import Icon from "../Icon/Icon"
import { PriceTooltipProps } from "./PriceTooltip.d"

const commission = 0.5
export const PriceTooltip: React.FC<PriceTooltipProps> = ({ price }) => {
  const commissionValue = (price * commission) / 100
  return (
    <Tooltip
      content={
        <>
          <div className={styles.tooltipWrapper}>
            <div className={styles.tooltipLabel}>Базовая цена</div>
            <div className={styles.tooltipValue}>{price} TON</div>
          </div>
          <div className={styles.tooltipWrapper}>
            <div className={styles.tooltipLabel}>Комиссия</div>
            <div className={styles.tooltipValue}>{commissionValue} TON</div>
          </div>
          {/* <div className={styles.tooltipWrapper}>   только для стикеров
          <div className={styles.tooltipLabel}>Роялти</div>
          <div className={styles.tooltipValue}>{price} TON</div>
        </div> */}
        </>
      }
    >
      <Icon src={questionMarkIcon} className={styles.questionMarkIcon} />
    </Tooltip>
  )
}
