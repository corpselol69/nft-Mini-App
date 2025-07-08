import type { FC } from "react"

import styles from "./MyNftPage.module.scss"
import { Button } from "@/components/common/Button/Button"
import { Tabs, Tab } from "@/components/common/Tabs/Tabs"
import { t } from "i18next"
import { Outlet } from "react-router-dom"

export const MyNftPage: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>{t("my_nft")}</p>
        <Button>{t("sell_nft")}</Button>
      </div>
      <Tabs>
        <Tab to="/my-nft/stickers">{t("stickers")}</Tab>
        <Tab to="/my-nft/gifts">{t("gifts")}</Tab>
      </Tabs>
      <Outlet context={{ isMarket: false }} />
    </div>
  )
}
