import { FC } from "react"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import { getIsBalanceEnough } from "@/helpers/getIsBalanceEnough"
import tonSrc from "@/static/icons/icn-S_ton.svg"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import styles from "./AddToCartBottomSheet.module.scss"
import { BalanceTopUpBottomSheet } from "../BalanceTopUpBottomSheet"

type Props = {
  imgLink: string
  title: string
  id: string
  price: string
  availableBalance: string
}

export const AddToCartBottomSheet: FC<Props> = ({
  availableBalance,
  id,
  imgLink,
  price,
  title,
}) => {
  const { openSheet, closeAll } = useBottomSheet()
  const isBalanceEnough = getIsBalanceEnough(availableBalance, price)

  const buttonToShow = isBalanceEnough ? (
    <Button type="primary" onClick={() => console.log("Купить")} size="large">
      Купить за {price} <Icon src={tonSrc} />
    </Button>
  ) : (
    <Button
      type="primary"
      onClick={() =>
        openSheet(
          <BalanceTopUpBottomSheet
            availableBalance="70"
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
      <div className={styles.availableBalanceWrapper}>
        <span className={styles.availableBalanceText}>Доступный баланс</span>
        <div className={styles.availableBalanceValue}>
          <span>{availableBalance}</span>
          <Icon src={tonSrc} opacity="0.6" />
        </div>
      </div>
      <div className={styles.actionButtonsWrapper}>
        <Button size="large" type="secondary">
          Добавить в корзину
        </Button>
        {buttonToShow}
      </div>
    </div>
  )
}
