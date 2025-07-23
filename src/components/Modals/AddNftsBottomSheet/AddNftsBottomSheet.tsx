import { FC, useState } from "react"

import styles from "./AddNftsBottomSheet.module.scss"
import { Tabs } from "@/components/common/Tabs/Tabs"
import { t } from "i18next"
import searchIcon from "@/static/icons/searchIcon.svg"

import Icon from "@/components/common/Icon/Icon"
import { Input } from "@/components/common/Input/Input"

type Props = {
  list: string[]
}

export const AddNftsBottomSheet: FC<Props> = () => {
  const [selected, setSelected] = useState("stickers")
  // const [value, setValue] = useState("")

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Tabs type="select" selected={selected} onSelect={setSelected}>
          <Tabs.Tab to="stickers">{t("stickers")}</Tabs.Tab>
          <Tabs.Tab to="gifts">{t("gifts")}</Tabs.Tab>
        </Tabs>
        <Input
          icon={<Icon src={searchIcon} />}
          placeholder="Поиск по названию или ID"
          className={styles.input}
        />
      </div>
    </div>
  )
}
