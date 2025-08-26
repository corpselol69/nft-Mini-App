import { useState, type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./StickersPage.module.scss"
import { Select } from "@/components/common/Select/Select"
import { Input } from "@/components/common/Input/Input"
import { SELECT_DATA } from "@/constants/stickerFilter"
import searchIcon from "@/static/icons/searchIcon.svg"
import { NftGrid } from "@/components/common/NftGrid/NftGrid"
import monkey from "@/static/placeholders/monkey.png"

import Icon from "@/components/common/Icon/Icon"
import { IStickersPageProps } from "./StickersPage.d"
import { Outlet, useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { BuyNftBottomSheet } from "@/components/Modals/BuyNftBottomSheet/BuyNftBottomSheet"
import { ModalButtonsWrapper } from "@/components/common/ModalButtonsWrapper/ModalButtonsWrapper"
import { t } from "i18next"

import { useAppSelector } from "@/hooks/useRedux"

import formatAmount from "@/helpers/formatAmount"
import { NftListItem } from "@/types/market"

// Пример данных для карточек
const mockNfts: NftListItem[] = [
  {
    id: "1",
    title: "Bored Stickers",
    price: 90,
    background: monkey,
    number: "123123",
    source: "market",
  },
  {
    id: "2",
    title: "Bored Stickers",
    price: 120,
    background: monkey,

    number: "123124",
    source: "market",
  },
]

export const StickersPage: FC<IStickersPageProps> = () => {
  const navigate = useNavigate()

  const { isMarket } = useOutletContext<{ isMarket: boolean }>()
  const { openSheet, closeAll } = useBottomSheet()

  const cartItems = useAppSelector(state => state.cart.items)
  const isInCart = (id: string) => cartItems.some(item => item.id === id)

  const balance = useAppSelector(state => state.finance.balance)

  const [value, setValue] = useState("")

  const handleViewCart = () => {
    // логика открытия корзины
    closeAll()
    navigate("/cart")
  }

  const onBuyButtonClick = (nft: NftListItem) => {
    openSheet(
      <BuyNftBottomSheet nft={nft} availableBalance={formatAmount(balance)} />,
      {
        bottomSheetTitle: `${t("buy_nft")}`,
        buttons: (
          <ModalButtonsWrapper
            price={nft.price.toString()}
            balance={formatAmount(balance)}
            isInCart={isInCart(nft.id)}
            // onMainClick={() => handleBuy(nft)}
            onSecondaryClick={handleViewCart}
            // onCartClick={() => handleToggleCart(nft)}
          />
        ),
      }
    )
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
        items={mockNfts}
        isMarket={isMarket}
        // onCardClick={onCardClick}
        onMainAction={onBuyButtonClick}
        // onCartClick={handleToggleCart}
        isInCart={id => cartItems.some(item => item.id === id)}
      />
      <Outlet context={{ isMarket: isMarket }} />
    </Page>
  )
}
