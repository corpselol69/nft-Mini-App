import React from "react"
import styles from "./ModalButtonsWrapper.module.scss"
import { ModalButtonsWrapperProps } from "./ModalButtonsWrapper.d"
import cs from "classnames"

import shoppingCart from "@/static/icons/shopping_cart.svg"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import Icon from "@/components/common/Icon/Icon"
import { t } from "i18next"
import { Button } from "@/components/common/Button/Button"

export const ModalButtonsWrapper: React.FC<ModalButtonsWrapperProps> = ({
  price,
  balance,
  isInCart,
}) => {
  const getCartButtonText = () =>
    isInCart ? `${t("delete_from_cart")}` : `${t("add_to_cart")}`
  return (
    <>
      <div className={styles.availableBalanceWrapper}>
        <span className={styles.availableBalanceText}>Доступный баланс</span>
        <div className={styles.availableBalanceValue}>
          {balance} <Icon src={tonIcon} className={styles.tonBalanceIcon} />
        </div>
      </div>
      <div className={styles.actionButtonsWrapper}>
        <div
          className={cs({
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
              className={cs({
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
    </>
  )
}
