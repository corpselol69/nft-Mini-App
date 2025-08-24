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
  variant = "buy",
  price,
  balance,
  isInCart,
  onMainClick,
  onSecondaryClick,
  onCartClick,
}) => {
  const isBalanceEnough = Number(balance) >= Number(price)

  const getCartButtonText = () =>
    isInCart
      ? `${t("buttons.delete_from_cart")}`
      : `${t("buttons.add_to_cart")}`
  return (
    <div className={styles.actionButtonsWrapper}>
      {variant === "buy" && (
        <>
          <div
            className={cs({
              [styles.cartButtonsWrapper]: isInCart,
              [styles.notInCartButtonsWrapper]: !isInCart,
            })}
          >
            <Button
              type="secondary"
              size="large"
              className={styles.secondaryCartButton}
              onClick={onCartClick}
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
              <Button type="secondary" size="large" onClick={onSecondaryClick}>
                <Icon src={shoppingCart} />
              </Button>
            )}
          </div>

          <Button
            type="primary"
            size="large"
            className={styles.mainCartButton}
            onClick={onMainClick}
          >
            {isBalanceEnough ? (
              <>
                {t("buttons.buy_for")} {price} <Icon src={tonIcon} />
              </>
            ) : (
              `${t("buttons.top_up_and_buy")}`
            )}
          </Button>
        </>
      )}

      {variant === "sell" && (
        <>
          <Button
            type="secondary"
            size="large"
            className={styles.secondaryCartButton}
            onClick={onMainClick}
          >
            {t("buttons.withdraw")}
          </Button>

          <Button
            type="primary"
            size="large"
            className={styles.mainCartButton}
            onClick={onSecondaryClick}
          >
            {t("buttons.put_on_sale")}
          </Button>
        </>
      )}

      {variant === "withdraw" && (
        <Button
          type="secondary"
          size="large"
          className={styles.mainCartButton}
          onClick={onMainClick}
        >
          {t("buttons.remove_from_sale")}
        </Button>
      )}
    </div>
  )
}
