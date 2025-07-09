import { useCallback, useState, type FC } from "react"

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
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { BuyNftBottomSheet } from "@/components/Modals/BuyNftBottomSheet/BuyNftBottomSheet"
import { ModalButtonsWrapper } from "@/components/common/ModalButtonsWrapper/ModalButtonsWrapper"
import { SuccessBuyNftBottomSheet } from "@/components/Modals/SuccessBuyNftBottomSheet/SuccessBuyNftBottomSheet"
import { t } from "i18next"

// Пример данных для карточек
const mockNfts: {
  id: number
  title: string
  price: number
  url: string
  status: "sell" | "on sale"
}[] = [
  { id: 1, title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
  { id: 2, title: "Bored Stickers", price: 90, url: monkey, status: "on sale" },
  { id: 3, title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
  { id: 4, title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
  { id: 5, title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
  { id: 6, title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
]

const isInCart = false

export const StickersPage: FC<IStickersPageProps> = () => {
  const navigate = useNavigate()
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()
  const { openSheet, closeAll } = useBottomSheet()

  const onCardClick = (cardId: string) => {
    navigate(`${cardId}`)
  }
  const [value, setValue] = useState("")

  const handleBuy = useCallback(async () => {
    try {
      openSheet(<SuccessBuyNftBottomSheet onConfirm={closeAll} />, {
        bottomSheetTitle: `${t("buy_nft")}`,
      })
    } catch (e) {
      console.error(e)
      //
    }
  }, [])

  const handleAddToCart = () => {
    // логика добавления в корзину
    closeAll()
  }

  const handleViewCart = () => {
    // логика открытия корзины
    navigate("/cart")
  }

  const onBuyButtonClick = (nft: {
    imgLink: string
    title: string
    id: string
    price: number
  }) => {
    openSheet(<BuyNftBottomSheet {...nft} availableBalance={95} />, {
      bottomSheetTitle: `${t("buy_nft")}`,
      buttons: (
        <ModalButtonsWrapper
          variant={isMarket ? "buy" : "remove from sale"}
          price={90}
          balance={100}
          isInCart={isInCart}
          onMainClick={handleBuy}
          onSecondaryClick={handleViewCart}
          onCartClick={handleAddToCart}
        />
      ),
    })
  }

  return (
    <Page back={false}>
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
      <NftGrid
        mockNfts={mockNfts}
        onNftClick={onCardClick}
        mainClick={onBuyButtonClick}
      />
      <Outlet context={{ isMarket: isMarket }} />
    </Page>
  )
}
