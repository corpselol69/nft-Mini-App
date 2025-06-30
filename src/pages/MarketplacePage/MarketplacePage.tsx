import { Tabs, Tab } from "@/components/Tabs/Tabs"
import { useState, type FC } from "react"
import styles from "./MarketplacePage.module.scss"

import { NftGrid } from "@/components/NftGrid/NftGrid"
import { t } from "i18next"
import { Select } from "@/components/common/Select/Select"
import { SELECT_DATA } from "../../components/StickersGrid/model/const"
import { Input } from "@/components/common/Input/Input"
import { SearchIcon } from "@/components/common/icons/SearchIcon"
import { BottomSheet } from "@/components/common/BottomSheet/BottomSheet"
import { NftBottomSheet } from "../../components/StickersGrid/ui/NftBottomSheet/NftBottomSheet"
import { Outlet } from "react-router-dom"

export const MarketplacePage: FC = () => {
  const [value, setValue] = useState("")
  const [selectedNftCard, setSelectedNftCard] = useState()

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t("market")}</p>
      <Tabs>
        <Tab to="/market/stickers">{t("stickers")}</Tab>
        <Tab to="/market/gifts">{t("gifts")}</Tab>
      </Tabs>
      <Outlet />
    </div>
  )
}
