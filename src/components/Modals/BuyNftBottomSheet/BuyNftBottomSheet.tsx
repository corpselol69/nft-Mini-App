import { FC } from "react"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import tonSrc from "@/static/icons/icn-S_ton.svg"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import styles from "./BuyNftBottomSheet.module.scss"
import { BalanceTopUpBottomSheet } from "../BalanceTopUpBottomSheet"
import { AvailableBalance } from "@/components/common/AvailableBalance/AvailableBalance"

type Props = {
  imgLink: string
  title: string
  id: string
  price: number
  availableBalance: number
  onClick?: () => void
}

export const BuyNftBottomSheet: FC<Props> = ({
  availableBalance,
  id,
  imgLink,
  price,
  title,
  onClick,
}) => {
  const { openSheet, closeAll } = useBottomSheet()
  const isBalanceEnough = availableBalance >= price

  const buttonToShow = isBalanceEnough ? (
    <Button type="primary" onClick={onClick} size="large">
      Купить за {price} <Icon src={tonSrc} />
    </Button>
  ) : (
    <Button
      type="primary"
      onClick={() =>
        openSheet(
          <BalanceTopUpBottomSheet
            availableBalance={availableBalance}
            onClose={closeAll}
            purchasePrice={price}
          />,
          {
            renderLeftHeader() {
              return (
                <span className={styles.bottomSheetTitle}>
                  Пополнение баланса
                </span>
              )
            },
          }
        )
      }
      size="large"
    >
      Пополнить баланс и купить
    </Button>
  )

  return (
    <div className={styles.addToCartBottomSheetWrapper}>
      <div className={styles.titleAndPriceWrapper}>
        <div className={styles.imageAndTitleWrapper}>
          <div className={styles.imageWrapper}>
            <img src={imgLink} />
          </div>
          <div className={styles.titleAdnIdWrapper}>
            <span className={styles.titleText}>{title}</span>
            <span className={styles.idText}>#{id}</span>
          </div>
        </div>
        <div>
          <span className={styles.priceText}>{price}</span>{" "}
          <span className={styles.priceValue}>TON</span>
        </div>
      </div>
      <AvailableBalance balance={availableBalance} />
      <div className={styles.actionButtonsWrapper}>
        <Button size="large" type="secondary">
          Добавить в корзину
        </Button>
        {buttonToShow}
      </div>
    </div>
  )
}
