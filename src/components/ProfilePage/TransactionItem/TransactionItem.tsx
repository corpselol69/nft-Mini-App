import { FC } from "react"
import { Transaction } from "../types"
import { TRANSACTION_GROUP_CONFIG } from "../const"
import styles from "./TransactionItem.module.scss"
import clsx from "classnames"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import Icon from "@/components/common/Icon/Icon"

type Props = {
  transaction: Transaction
  onClick?: () => void
  className?: string
}

export const TransactionItem: FC<Props> = ({
  transaction,
  onClick,
  className,
}) => {
  const config = TRANSACTION_GROUP_CONFIG[transaction.type]
  const formattedTime = new Date(transaction.timestamp).toLocaleDateString(
    "ru-RU",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )

  const isClickable = Boolean(onClick)

  const classNameForAmount = styles[config.colorClass]

  return (
    <div
      className={clsx(
        styles.item,
        isClickable && styles.clickable,
        transaction.status === "failed" && styles.failed,
        className && className
      )}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className={styles.info}>
        <div
          className={clsx(styles.description, {
            [styles.negative]: transaction.status === "failed",
          })}
        >
          {transaction.description}
        </div>
        <div className={styles.time}>{formattedTime}</div>
      </div>

      <div
        className={clsx(styles.amount, transaction, {
          [classNameForAmount]: transaction.status !== "failed",
          [styles.negative]: transaction.status === "failed",
        })}
      >
        {config.sign}
        {Math.abs(transaction.amount)}
        <div>
          <Icon
            src={tonIcon}
            className={clsx({
              [styles.success]:
                ["topup", "sell", "bonus"].includes(transaction.type) &&
                transaction.status !== "failed",
              [styles.error]: transaction.status === "failed",
            })}
          />
        </div>
      </div>
    </div>
  )
}
