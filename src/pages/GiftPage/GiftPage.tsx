import { useState, type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./GiftPage.module.scss"
import { Select } from "@/components/common/Select/Select"
import { Input } from "@/components/common/Input/Input"
import searchIcon from "@/static/icons/searchIcon.svg"
import { SELECT_DATA } from "@/constants/stickerFilter"

import Icon from "@/components/common/Icon/Icon"
import { Outlet, useNavigate, useOutletContext } from "react-router-dom"
import { NftGrid } from "@/components/NftGrid/NftGrid"
import bdayImg from "@/static/placeholders/bday.png"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { IGiftPageProps } from "./GiftPage.d"
import { BuyNftBottomSheet } from "@/components/Modals/BuyNftBottomSheet/BuyNftBottomSheet"

// Пример данных для карточек
const mockNfts = [
  { id: 1, title: "Snow ball", price: 96, url: bdayImg },
  { id: 2, title: "Snow ball", price: 90, url: bdayImg },
  { id: 3, title: "Snow ball", price: 90, url: bdayImg },
  { id: 4, title: "Snow ball", price: 90, url: bdayImg },
  { id: 5, title: "Snow ball", price: 90, url: bdayImg },
  { id: 6, title: "Snow ball", price: 90, url: bdayImg },
]

export const GiftPage: FC<IGiftPageProps> = () => {
  const navigate = useNavigate()
  const { openSheet } = useBottomSheet()
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const [priceFilter, setPriceFilter] = useState("")

  const onCardClick = (cardId: string) => {
    navigate(`${cardId}`)
  }

  const onBuy = (nft: {
    imgLink: string
    title: string
    id: string
    price: number
  }) => {
    openSheet(<BuyNftBottomSheet {...nft} availableBalance={96} />, {
      renderLeftHeader() {
        return <span className={styles.bottomSheetTitle}>Покупка NFT</span>
      },
    })
  }

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
        <NftGrid mockNfts={mockNfts} onNftClick={onCardClick} onBuy={onBuy} />

        <Outlet context={{ isMarket: isMarket }} />
      </div>
    </Page>
  )
}
