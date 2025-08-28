import React from "react"
import styles from "./ValueRow.module.scss"
import cn from "classnames"

import { ValueRowProps } from "./ValueRow.d"

import tonIcon from "@/static/icons/icn-S_ton.svg"
import Icon from "@/components/common/Icon/Icon"

export const ValueRow: React.FC<ValueRowProps> = ({
  label,
  hint,
  value,
  className,
}) => {
  return (
    <div className={cn(styles.row, className)}>
      <div className={styles.left}>
        <span className={styles.label}>{label}</span>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>

      <div className={styles.right}>
        <span className={styles.value}>{value}</span>
        <Icon src={tonIcon} className={styles.tonBalanceIcon} />
      </div>
    </div>
  )
}
