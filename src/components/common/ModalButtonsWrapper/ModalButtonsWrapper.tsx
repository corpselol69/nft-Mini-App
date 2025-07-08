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
  const getCartButtonText = () =>
    isInCart
      ? `${t("buttons.delete_from_cart")}`
      : `${t("buttons.add_to_cart")}`
  return (
    <>
      {variant === "buy" && (
        <div className={styles.availableBalanceWrapper}>
          <span className={styles.availableBalanceText}>
            {t("available_balance")}
          </span>
          <div className={styles.availableBalanceValue}>
            {balance} <Icon src={tonIcon} className={styles.tonBalanceIcon} />
          </div>
        </div>
      )}

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
                onClick={onSecondaryClick}
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
                <Button type="secondary" size="large" onClick={onCartClick}>
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
              {t("buttons.buy_for")} {price}
              <Icon src={tonIcon} />
            </Button>
          </>
        )}

        {variant === "sale" && (
          <>
            <Button
              type="secondary"
              size="large"
              className={styles.secondaryCartButton}
              onClick={onSecondaryClick}
            >
              {t("buttons.withdraw")}
            </Button>

            <Button
              type="primary"
              size="large"
              className={styles.mainCartButton}
              onClick={onMainClick}
            >
              {t("buttons.put_on_sale")}
            </Button>
          </>
        )}

        {variant === "remove from sale" && (
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
    </>
  )
}
