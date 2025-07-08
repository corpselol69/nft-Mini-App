import { FC } from "react"
import styles from "./CartPage.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import { Page } from "@/components/Page.tsx"
import icnLClose from "@/static/icons/icn-L_Close.svg"
import monkeyPng from "@/static/placeholders/monkey.png"

export const CartPage: FC = () => {
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
              <Button className={styles.buttonIconClose} size="large">
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
              <span>2</span>
              <Icon src={tonIcon} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
