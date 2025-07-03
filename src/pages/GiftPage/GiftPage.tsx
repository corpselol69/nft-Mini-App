import { useState, type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./GiftPage.module.scss"
import { Select } from "@/components/common/Select/Select"
import { Input } from "@/components/common/Input/Input"
import searchIcon from "@/static/icons/searchIcon.svg"
import { SELECT_DATA } from "@/components/StickersGrid/model/const"
import { mockGiftItemsArr } from "@/components/GiftsGrid/const"
import { NftCard } from "@/components/NftCard/NftCard"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { GiftItemSheet } from "./GiftItemSheet/GiftItemSheet"
import Icon from "@/components/common/Icon/Icon"

export const GiftPage: FC = () => {
  const [priceFilter, setPriceFilter] = useState("")
  const { openSheet } = useBottomSheet()
  return (
    <Page back={false}>
      <div>
        <div className={styles.filterWrapper}>
          <div className={styles.selectWrapper}>
            <Select
              options={SELECT_DATA}
              value={priceFilter}
              onChange={setPriceFilter}
              defaultValue={SELECT_DATA[0].value}
              className={styles.flexItem}
            />
            <Select
              options={[]}
              onChange={() => {}}
              placeholder="Модель"
              className={styles.flexItem}
            />
            <Select
              options={[]}
              onChange={() => {}}
              placeholder="Фон"
              className={styles.flexItem}
            />
            <Select
              options={[]}
              onChange={() => {}}
              placeholder="Узор"
              className={styles.flexItem}
            />
          </div>
          <Input
            icon={<Icon src={searchIcon} />}
            placeholder="Поиск по названию или ID"
          />
        </div>
        <div className={styles.grid}>
          {mockGiftItemsArr.map(el => (
            <NftCard
              onClick={() => {
                openSheet(<GiftItemSheet gift={el} />)
              }}
            />
          ))}
        </div>
      </div>
    </Page>
  )
}
