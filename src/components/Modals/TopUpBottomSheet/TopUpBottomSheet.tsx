import { FC, useEffect, useState } from "react"
import accountBalanceWallet from "@/static/icons/account_balance_wallet.svg"

import styles from "./TopUpBottomSheet.module.scss"
import Icon from "@/components/common/Icon/Icon"
import { formatAddress } from "@/helpers/formatAddress"
import { Button } from "@/components/common/Button/Button"
import { BalanceUpInput } from "@/components/common/InputWithUnit/BalanceUpInput"

type Props = {
  withdrawValue: string
  onChange?: (v: string) => void
  handleWithdraw: (value: string) => void
  address: string
}

const MIN_TOP_UP_AMOUNT = 0.1
// переделать withdraw на top up, чтобы не путать с withdraw
export const TopUpBottomSheet: FC<Props> = ({
  handleWithdraw: onWithdraw,
  onChange: onChangeExternal,
  withdrawValue: initialWithdrawValue,

  address,
}) => {
  const [error, setError] = useState<string>()
  const [withdrawValue, setWithdrawValue] = useState(initialWithdrawValue || "")

  const handleChange = (value: string) => {
    setWithdrawValue(value)
    onChangeExternal?.(value)
  }

  const handleWithdraw = () => {
    onWithdraw(withdrawValue)
  }

  useEffect(() => {
    if (withdrawValue.trim() !== "") {
      const numValue = parseFloat(withdrawValue)
      if (isNaN(numValue) || numValue < MIN_TOP_UP_AMOUNT) {
        setError(`Введите сумму более ${MIN_TOP_UP_AMOUNT} TON`)
      } else {
        setError("")
      }
    } else {
      setError("")
    }
  }, [withdrawValue])

  return (
    <div className={styles.withdrawModalWrapper}>
      <div className={styles.withdrawWalletTextWrapper}>
        <span className={styles.withdrawWalletText}>Подключенный кошелек:</span>
        <div className={styles.withdrawWalletValue}>
          <Icon src={accountBalanceWallet} />
          <span>{formatAddress(address)}</span>
        </div>
      </div>

      <BalanceUpInput
        className={error ? styles.error : undefined}
        value={withdrawValue}
        onChange={handleChange}
      />

      <div className={styles.withdrawAllSumButtonWrapper}>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>

      <div className={styles.actionButtonWrapper}>
        <Button
          type="primary"
          isDisabled={!!error || !withdrawValue.trim()}
          size="large"
          onClick={handleWithdraw}
        >
          Пополнить на {withdrawValue} TON
        </Button>
      </div>
    </div>
  )
}
