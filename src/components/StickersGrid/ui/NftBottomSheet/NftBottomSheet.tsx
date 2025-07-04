import { FC } from "react"
import { NftBottomSheetProps } from "../../model/types"
import styles from "./NftBottomSheet.module.scss"
import { NftDetailsTable } from "../NftDetailsTable/NftDetailsTable"
import { Button } from "@/components/common/Button/Button"
import clsx from "classnames"
import shoppingCart from "@/static/icons/shopping_cart.svg"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import monkeyImg from "@/static/placeholders/monkey.png"
import Icon from "@/components/common/Icon/Icon"

export const NftBottomSheet: FC<NftBottomSheetProps> = ({
  //availableBalance,
  collection,
  //imgLink,
  issued,
  number,
  price,
}) => {
  //TODO: добавить логику проверки на наличие в корзине
  const isInCart = true
  //TODO: вынести текстовки в i18n
  const getCartButtonText = () =>
    isInCart ? "Удалить из корзины" : "Добавить в корзину"
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.imageWrapper}>
        <img
          height={210}
          width={210}
          className={styles.nftImage}
          src={monkeyImg}
          alt="STICKER"
        />
      </div>
      <div className={styles.tableDataWrapper}>
        <NftDetailsTable
          collection={collection}
          issued={issued}
          number={number}
          price={price}
        />
      </div>

      {/*TODO: все что ниже вынести в отдельный компонент в common*/}
      <div className={styles.availableBalanceWrapper}>
        <span className={styles.availableBalanceText}>Доступный баланс</span>
        <div className={styles.availableBalanceValue}>
          12,4 <Icon src={tonIcon} className={styles.tonBalanceIcon} />
        </div>
      </div>
      <div className={styles.actionButtonsWrapper}>
        <div
          className={clsx({
            [styles.cartButtonsWrapper]: isInCart,
            [styles.notInCartButtonsWrapper]: !isInCart,
          })}
        >
          {/*TODO: поправить паддинги у кнопок*/}
          <Button
            type="secondary"
            size="large"
            className={styles.mainCartButton}
          >
            <span
              className={clsx({
                [styles.inCartText]: isInCart,
                [styles.notInCartText]: !isInCart,
              })}
            >
              {getCartButtonText()}
            </span>
          </Button>
          {isInCart && (
            <Button type="secondary" size="large">
              <Icon src={shoppingCart} />
            </Button>
          )}
        </div>

        <Button type="primary" size="large" className={styles.buyButton}>
          Купить за {price}
          <Icon src={tonIcon} />
        </Button>
      </div>
    </div>
  )
}
