import { FC } from "react"

import styles from "./TransactionItem.module.scss"
import clsx from "classnames"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import Icon from "@/components/common/Icon/Icon"
import { TRANSACTION_GROUP_CONFIG } from "../const"
import formatAmount from "@/helpers/formatAmount"
import { Loader } from "../../Loader/Loader"
import { t } from "i18next"
import { ActivityItem } from "@/types/finance"
import { NftPreview } from "../../NftPreview/NftPreview"

type Props = {
  transaction: ActivityItem
  onClick?: () => void
  isLast?: boolean
}

export const TransactionItem: FC<Props> = ({
  transaction,
  onClick,

  isLast = false,
}) => {
  const safeConfig = TRANSACTION_GROUP_CONFIG[transaction.tx_type] ?? {
    sign: "",
    colorClass: "",
  }
  const formattedTime = transaction.time
    ? new Date(transaction.time).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""

  const isClickable = Boolean(onClick)
  const classNameForAmount =
    styles[safeConfig.colorClass as keyof typeof styles]

  const title =
    transaction.tx_type === "purchase"
      ? t("purchase", "Покупка NFT")
      : transaction.tx_type === "sale"
      ? t("sale", "Продажа NFT")
      : transaction.tx_type === "deposit"
      ? t("top_up_balance")
      : transaction.tx_type === "withdraw"
      ? t("withdrawal_of_funds")
      : transaction.tx_type === "bonus"
      ? t("bonus")
      : ""

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
      {transaction.listing_id && transaction.tx_type === "purchase" && (
        <NftPreview
          background_url={transaction.gift && transaction.gift.background_url}
          preview_url={transaction.gift && transaction.gift.preview_url}
          className={styles.preview}
        />
      )}
      <div className={styles.info}>
        <div
          className={clsx(styles.description, {
            [styles.negative]: transaction.state === "failed",
          })}
        >
          {title}
        </div>
        <div className={styles.time}>{formattedTime}</div>
      </div>

      <div
        className={clsx(styles.amount, transaction, {
          [classNameForAmount]: transaction.state !== "failed",
          [styles.negative]: transaction.state === "failed",
        })}
      >
        {safeConfig.sign}
        {formatAmount(transaction.amount)}

        <Icon
          src={tonIcon}
          className={clsx({
            [styles.success]:
              ["deposit", "sale", "bonus"].includes(transaction.tx_type) &&
              transaction.state !== "failed",
            [styles.error]: transaction.state === "failed",
          })}
        />
      </div>
    </div>
  )
}
