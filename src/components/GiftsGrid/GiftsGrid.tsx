import { type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./GiftsGrid.module.scss"
import searchIcon from "@/static/icons/searchIcon.svg"
import { Input } from "../common/Input/Input"
import Icon from "../common/Icon/Icon"
import { mockGiftCards } from "./const"
import { ItemCard } from "./ItemCard/ItemCard"

export const GiftsGrid: FC = () => {
  return (
    <Page back={false}>
      <div>
        <div className={styles.filterWrapper}>
          <Input
            icon={<Icon src={searchIcon} />}
            placeholder="Поиск по названию или ID"
          />
        </div>

        <div className={styles.grid}>
          {mockGiftCards.map(nft => (
            <ItemCard key={nft.id} item={nft} />
          ))}
        </div>
      </div>
    </Page>
  )
}
