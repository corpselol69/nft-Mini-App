import { Tabs, Tab } from "@/components/Tabs/Tabs"
import { useState, type FC } from "react"
import styles from "./MarketplacePage.module.scss"

import { NftGrid } from "@/components/NftGrid/NftGrid"
import { t } from "i18next"
import { Select } from "@/components/common/Select/Select"
import { SELECT_DATA } from "./model/const"
import { Input } from "@/components/common/Input/Input"
import { SearchIcon } from "@/components/common/icons/SearchIcon"

export const MarketplacePage: FC = () => {
  const [value, setValue] = useState("")
  return (
    <div className={styles.root}>
      <p className={styles.title}>{t("market")}</p>
      <Tabs>
        <Tab to="/market/stickers">{t("stickers")}</Tab>
        <Tab to="/market/gifts">{t("gifts")}</Tab>
      </Tabs>
      <div className={styles.filterWrapper}>
        <div className={styles.selectWrapper}>
          <Select
            options={SELECT_DATA}
            value={value}
            onChange={setValue}
            defaultValue={SELECT_DATA[0].value}
          />
          <Select options={[]} onChange={() => {}} placeholder="Модель" />
        </div>
        <Input icon={<SearchIcon />} placeholder="Поиск по названию или ID" />
      </div>
      <NftGrid />
    </div>
  )
}
