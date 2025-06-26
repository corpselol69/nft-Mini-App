import { FC } from "react"
import { NftBottomSheetProps } from "../../model/types"
import styles from "./NftBottomSheet.module.scss"
import { NftDetailsTable } from "../NftDetailsTable/NftDetailsTable"
import { Button } from "@/components/Button/Button"
import clsx from "clsx"
import shoppingCart from "../../../../../assets/icons/shopping_cart.svg"
import tonIcon from "../../../../../assets/icons/icn-S_ton.svg"
import monkeyImg from "../../../../../assets/monkey.png"

export const NftBottomSheet: FC<NftBottomSheetProps> = ({
  availableBalance,
  collection,
  imgLink,
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
      <div className={styles.availableBalanceWrapper}>
        <span className={styles.availableBalanceText}>Доступный баланс</span>
        <div className={styles.availableBalanceValue}>
          12,4 <img src={tonIcon} />
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
          <Button type="secondary" className={styles.mainCartButton}>
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
            <Button type="secondary" className={styles.priceButton}>
              <img src={shoppingCart} alt="Add to cart" />
            </Button>
          )}
        </div>
        <div className={styles.buyButtonWrapper}>
          <Button type="primary">
            Купить за {price}
            <img src={tonIcon} />
          </Button>
        </div>
      </div>
    </div>
  )
}
