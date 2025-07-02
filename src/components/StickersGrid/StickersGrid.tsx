import { useState, type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./StickersGrid.module.scss"
import { Select } from "../common/Select/Select"
import { Input } from "../common/Input/Input"
import { NftBottomSheet } from "@/components/StickersGrid/ui/NftBottomSheet/NftBottomSheet"
import { SELECT_DATA } from "@/components/StickersGrid/model/const"
import { BottomSheet } from "../common/BottomSheet/BottomSheet"
import { SearchIcon } from "../common/icons/SearchIcon"
import { NftGrid } from "../NftGrid/NftGrid"
import { ShareIcon } from "../common/BottomSheet/ShareIcon"

export const StickersGrid: FC = () => {
  const [value, setValue] = useState("")
  const [selectedNftCard, setSelectedNftCard] = useState()

  return (
    <Page back={false}>
      <div>
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
        <NftGrid onNftClick={setSelectedNftCard} />
        <BottomSheet
          open={!!selectedNftCard}
          onClose={() => setSelectedNftCard(undefined)}
          renderLeftHeader={() => <ShareIcon />}
        >
          <NftBottomSheet
            availableBalance="12,4"
            collection="Bored Stickers"
            number="#0001"
            imgLink=""
            issued="9 999/9 999"
            price="95"
          />
        </BottomSheet>
      </div>
    </Page>
  )
}
