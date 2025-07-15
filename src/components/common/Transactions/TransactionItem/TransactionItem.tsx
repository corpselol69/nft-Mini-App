import { FC } from "react"

import styles from "./TransactionItem.module.scss"
import clsx from "classnames"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import Icon from "@/components/common/Icon/Icon"
import { Transaction } from "@/types/transaction"
import { TRANSACTION_GROUP_CONFIG } from "../const"
import formatAmount from "@/helpers/formatAmount"
import { Loader } from "../../Loader/Loader"

type Props = {
  transaction: Transaction
  onClick?: () => void
  isLast?: boolean
}

export const TransactionItem: FC<Props> = ({
  transaction,
  onClick,

  isLast = false,
}) => {
  const config = TRANSACTION_GROUP_CONFIG[transaction.tx_type]
  const formattedTime = transaction.created_at
    ? new Date(transaction.created_at).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""

  const isClickable = Boolean(onClick)

  const classNameForAmount = styles[config.colorClass]

  return (
    <div
      className={clsx(
        styles.item,
        isClickable && styles.clickable,
        transaction.state === "failed" && styles.failed,
        isLast && styles.noBorder
      )}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {transaction.state === "pending" && <Loader />}
      <div className={styles.info}>
        <div
          className={clsx(styles.description, {
            [styles.negative]: transaction.state === "failed",
          })}
        >
          {transaction.direction === "in" ? "Пополнение баланса" : "Вывод"}
        </div>
        <div className={styles.time}>{formattedTime}</div>
      </div>

      <div
        className={clsx(styles.amount, transaction, {
          [classNameForAmount]: transaction.state !== "failed",
          [styles.negative]: transaction.state === "failed",
        })}
      >
        {config.sign}
        {formatAmount(transaction.amount)}
        <div>
          <Icon
            src={tonIcon}
            className={clsx({
              [styles.success]:
                ["deposit", "sell", "bonus"].includes(transaction.tx_type) &&
                transaction.state !== "failed",
              [styles.error]: transaction.state === "failed",
            })}
          />
        </div>
      </div>
    </div>
  )
}
