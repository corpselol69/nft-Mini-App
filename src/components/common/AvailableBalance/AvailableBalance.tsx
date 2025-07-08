import React from "react"
import styles from "./AvailableBalance.module.scss"
import { AvailableBalanceProps } from "./AvailableBalance.d"

import tonIcon from "@/static/icons/icn-S_ton.svg"
import Icon from "@/components/common/Icon/Icon"
import { t } from "i18next"

export const AvailableBalance: React.FC<AvailableBalanceProps> = ({
  balance,
}) => {
  return (
    <div className={styles.availableBalanceWrapper}>
      <span className={styles.availableBalanceText}>
        {t("available_balance")}
      </span>
      <div className={styles.availableBalanceValue}>
        {balance} <Icon src={tonIcon} className={styles.tonBalanceIcon} />
      </div>
    </div>
  )
}
