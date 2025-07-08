import { Tabs, Tab } from "@/components/common/Tabs/Tabs"
import { type FC } from "react"
import styles from "./MarketplacePage.module.scss"

import { t } from "i18next"

import { Outlet, useNavigate } from "react-router-dom"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import shoppingCart from "@/static/icons/shopping_cart.svg"

export const MarketplacePage: FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>{t("market")}</p>
        <div className={styles.buttonWrapper}>
          <Button
            type="secondary"
            size="medium"
            onClick={() => navigate("/profile")}
          >
            <div className={styles.button_content}>
              95.4
              <Icon src={tonIcon} color="active" />
            </div>
          </Button>
          <Button
            type="secondary"
            size="medium"
            onClick={() => navigate("/cart")}
          >
            <div className={styles.button_content}>
              <Icon src={shoppingCart} color="active" /> 3
            </div>
          </Button>
        </div>
      </div>
      <Tabs>
        <Tab to="/market/stickers">{t("stickers")}</Tab>
        <Tab to="/market/gifts">{t("gifts")}</Tab>
      </Tabs>
      <Outlet context={{ isMarket: true }} />
    </div>
  )
}
