import { useState, type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./StickersPage.module.scss"
import { Select } from "@/components/common/Select/Select"
import { Input } from "@/components/common/Input/Input"
import { SELECT_DATA } from "@/constants/stickerFilter"
import searchIcon from "@/static/icons/searchIcon.svg"
import { NftGrid } from "@/components/NftGrid/NftGrid"
import monkey from "@/static/placeholders/monkey.png"

import Icon from "@/components/common/Icon/Icon"
import { IStickersPageProps } from "./StickersPage.d"
import { Outlet, useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom"

// Пример данных для карточек
const mockNfts = [
  { id: 1, title: "Bored Stickers", price: 90, url: monkey },
  { id: 2, title: "Bored Stickers", price: 90, url: monkey },
  { id: 3, title: "Bored Stickers", price: 90, url: monkey },
  { id: 4, title: "Bored Stickers", price: 90, url: monkey },
  { id: 5, title: "Bored Stickers", price: 90, url: monkey },
  { id: 6, title: "Bored Stickers", price: 90, url: monkey },
]

export const StickersPage: FC<IStickersPageProps> = () => {
  const navigate = useNavigate()
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const onCardClick = (cardId: string) => {
    navigate(`${cardId}`)
  }
  const [value, setValue] = useState("")

  return (
    <Page back={false}>
      <div>
        <div className={styles.filterWrapper}>
          {isMarket && (
            <div className={styles.selectWrapper}>
              <Select
                options={SELECT_DATA}
                value={value}
                onChange={setValue}
                defaultValue={SELECT_DATA[0].value}
              />
              <Select options={[]} onChange={() => {}} placeholder="Модель" />
            </div>
          )}

          <Input
            icon={<Icon src={searchIcon} />}
            placeholder="Поиск по названию или ID"
          />
        </div>
        <NftGrid mockNfts={mockNfts} onNftClick={onCardClick} />
        <Outlet />
      </div>
    </Page>
  )
}
