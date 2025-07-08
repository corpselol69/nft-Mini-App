import { FC, useState } from "react"
import clsx from "classnames"
import styles from "./CartPage.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import { Page } from "@/components/Page.tsx"
import icnLClose from "@/static/icons/icn-L_Close.svg"
import monkeyPng from "@/static/placeholders/monkey.png"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import upwardIcon from "@/static/icons/arrow_upward_alt.svg"
import { ConfirmBuyNftBottomSheet } from "@/components/Modals/ConfirmBuyNftBottomSheet/ConfirmBuyNftBottomSheet"

export const CartPage: FC = () => {
  const [isDeleting, setIsDeleting] = useState(false)
  const { openSheet, closeAll } = useBottomSheet()

  const handleBuyNft = async () => {
    try {
      //api.buyNft(id)
      await new Promise(r => setTimeout(r, 2000))
    } catch (e) {}
  }

  const handleOnBuyClick = () => {
    openSheet(
      <ConfirmBuyNftBottomSheet
        nftPrice={92}
        onBuy={handleBuyNft}
        onCancel={closeAll}
        quantity="2"
      />,
      {
        renderLeftHeader() {
          return <span className={styles.bottomSheetTitle}>Покупка NFT</span>
        },
      }
    )
  }
  return (
    <Page back={true}>
      <div className={styles.pageWrapper}>
        <div className={styles.cartHeader}>
          <span className={styles.headerTitle}>
            Корзина <span className={styles.headerQty}>(3)</span>
          </span>
          <Button type="secondary" size="medium">
            <div className={styles.buttonContent}>
              95.4
              <Icon src={tonIcon} color="active" />
            </div>
          </Button>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.contentHeader}>
            <input type="checkbox" />
            <span className={styles.totalPriceText}>
              <span>147</span>
              <Icon src={tonIcon} pathColor="#278FFF" />
            </span>
          </div>
          <div className={styles.itemWrapper}>
            <input type="checkbox" />
            <div className={styles.imageWrapper}>
              <img src={monkeyPng} />
              <Button
                className={clsx(styles.buttonIconClose, styles.absolute)}
                size="large"
              >
                <Icon src={icnLClose} />
              </Button>
            </div>
            <div className={styles.itemDescription}>
              <span className={styles.itemDescriptionTitle}>
                Bored Stickers
              </span>
              <span className={styles.itemDescriptionText}>#8697</span>
            </div>
            <div className={styles.itemPrice}>
              <span className={styles.priceText}>2</span>
              <Icon src={tonIcon} className={styles.priceIcon} />
            </div>
          </div>
          <div className={styles.itemWrapper}>
            <input
              type="checkbox"
              className={clsx(!isDeleting && styles.disabled)}
            />
            <div
              className={clsx(
                styles.imageWrapper,
                !isDeleting && styles.disabled
              )}
            >
              <img src={monkeyPng} />
            </div>
            <div
              className={clsx(
                styles.itemDescription,
                !isDeleting && styles.disabled
              )}
            >
              <span className={styles.itemDescriptionTitle}>
                Bored Stickers
              </span>
              {!isDeleting ? (
                <span className={styles.itemDescriptionText}>
                  Нет в наличии
                </span>
              ) : (
                <span
                  className={styles.restoreToCartText}
                  onClick={() => setIsDeleting(false)}
                >
                  Вернуть в корзину
                </span>
              )}
            </div>
            {!isDeleting && (
              <div className={styles.itemDeleteButtonWrapper}>
                <Button
                  className={styles.buttonIconClose}
                  size="large"
                  onClick={() => setIsDeleting(true)}
                >
                  <Icon src={icnLClose} />
                </Button>
              </div>
            )}
          </div>
          <div className={styles.itemWrapper}>
            <input type="checkbox" />
            <div className={styles.imageWrapper}>
              <img src={monkeyPng} />
              <Button
                className={clsx(styles.buttonIconClose, styles.absolute)}
                size="large"
              >
                <Icon src={icnLClose} />
              </Button>
            </div>
            <div className={styles.itemDescription}>
              <span className={styles.itemDescriptionTitle}>
                Bored Stickers
              </span>
              <span className={styles.itemDescriptionText}>#8697</span>
            </div>
            <div className={styles.itemPrice}>
              <span className={styles.oldPriceValue}>1</span>
              <div className={styles.upwardWrapper}>
                <Icon src={upwardIcon} className={styles.upwardIcon} />
                <span className={styles.priceText}>2</span>
                <Icon src={tonIcon} className={styles.priceIcon} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerWrapper}>
          <div className={styles.availableBalanceWrapper}>
            <span className={styles.availableBalanceText}>
              Доступный баланс
            </span>
            <div className={styles.availableBalanceValue}>
              <span>95,4</span>
              <Icon src={tonIcon} className={styles.iconTonBalance} />
            </div>
          </div>
          <div className={styles.actionButton}>
            <Button type="primary" size="large" onClick={handleOnBuyClick}>
              Купить за 92
            </Button>
          </div>
        </div>
      </div>
    </Page>
  )
}
