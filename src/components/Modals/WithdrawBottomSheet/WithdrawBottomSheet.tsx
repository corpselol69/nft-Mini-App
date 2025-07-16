import { FC, useEffect, useState } from "react"
import accountBalanceWallet from "@/static/icons/account_balance_wallet.svg"
import tonIcon from "@/static/icons/icn-S_ton.svg"

import styles from "./WithdrawBottomSheet.module.scss"
import Icon from "@/components/common/Icon/Icon"
import { formatAddress } from "@/helpers/formatAddress"
import { Button } from "@/components/common/Button/Button"
import { BalanceUpInput } from "@/components/common/InputWithUnit/BalanceUpInput"

type Props = {
  withdrawValue: string
  handleWithdraw: (value: string) => void
  availableWithdrawValue: string
  address: string
}

const MIN_WITHDRAW_AMOUNT = 0.5

export const WithdrawBottomSheet: FC<Props> = ({
  handleWithdraw: onWithdraw,
  withdrawValue: initialWithdrawValue,
  availableWithdrawValue,
  address,
}) => {
  const [error, setError] = useState<string>()
  const [withdrawValue, setWithdrawValue] = useState(initialWithdrawValue || "")

  const handleAllSumClick = () => {
    setWithdrawValue(availableWithdrawValue)
    setError("")
  }

  const handleChange = (value: string) => {
    setWithdrawValue(value)
  }

  const handleWithdraw = () => {
    onWithdraw(withdrawValue)
  }

  useEffect(() => {
    if (withdrawValue.trim() !== "") {
      const numValue = parseFloat(withdrawValue)
      if (isNaN(numValue) || numValue < MIN_WITHDRAW_AMOUNT) {
        setError(`Введите сумму более ${MIN_WITHDRAW_AMOUNT} TON`)
      } else if (numValue > Number(availableWithdrawValue)) {
        setError("Недостаточно средств для вывода")
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

      <div className={styles.withdrawInputWrapper}>
        <BalanceUpInput
          className={error ? styles.error : undefined}
          value={withdrawValue}
          onChange={handleChange}
        />
      </div>

      <div className={styles.withdrawAllSumButtonWrapper}>
        <Button type="text" onClick={handleAllSumClick}>
          Вся сумма
        </Button>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>

      <div className={styles.availableWithdrawValueWrapper}>
        <span>Доступно к выводу</span>
        <div>
          <span className={styles.availableWithdrawValue}>
            {availableWithdrawValue}
          </span>
          <Icon src={tonIcon} />
        </div>
      </div>

      <div className={styles.actionButtonWrapper}>
        <Button
          type="primary"
          isDisabled={!!error || !withdrawValue.trim()}
          size="large"
          onClick={handleWithdraw}
        >
          Вывести {withdrawValue} TON
        </Button>
      </div>
    </div>
  )
}
