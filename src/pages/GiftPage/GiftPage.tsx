import { useCallback, useState, type FC } from "react"

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
import { ModalButtonsWrapper } from "@/components/common/ModalButtonsWrapper/ModalButtonsWrapper"
import { SuccessBuyNftBottomSheet } from "@/components/Modals/SuccessBuyNftBottomSheet/SuccessBuyNftBottomSheet"
import { t } from "i18next"
import { Button } from "@/components/common/Button/Button"

// Пример данных для карточек
const mockNfts: {
  id: number
  title: string
  price: number
  url: string
  status: "sell" | "on sale"
}[] = [
  { id: 1, title: "Snow ball", price: 96, url: bdayImg, status: "sell" },
  { id: 2, title: "Snow ball", price: 90, url: bdayImg, status: "on sale" },
  { id: 3, title: "Snow ball", price: 90, url: bdayImg, status: "sell" },
  { id: 4, title: "Snow ball", price: 90, url: bdayImg, status: "sell" },
  { id: 5, title: "Snow ball", price: 90, url: bdayImg, status: "sell" },
  { id: 6, title: "Snow ball", price: 90, url: bdayImg, status: "sell" },
]

const isInCart = false

export const GiftPage: FC<IGiftPageProps> = () => {
  const navigate = useNavigate()
  const { openSheet, closeAll } = useBottomSheet()
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const [priceFilter, setPriceFilter] = useState("")

  const onCardClick = (cardId: string) => {
    navigate(`${cardId}`)
  }

  const handleBuy = useCallback(async () => {
    try {
      openSheet(
        <SuccessBuyNftBottomSheet
          title={"NFT успешно куплен"}
          subTitle="Мы уже отправили NFT к вам в профиль"
          actionButtons={[
            <Button type="primary" size="large" onClick={closeAll}>
              Готово
            </Button>,
          ]}
        />,
        {
          bottomSheetTitle: `${t("buy_nft")}`,
        }
      )
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
          price={nft.price}
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
    <Page back={isMarket}>
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
        <NftGrid
          mockNfts={mockNfts}
          onNftClick={onCardClick}
          mainClick={onBuyButtonClick}
        />

        <Outlet context={{ isMarket: isMarket }} />
      </div>
    </Page>
  )
}
