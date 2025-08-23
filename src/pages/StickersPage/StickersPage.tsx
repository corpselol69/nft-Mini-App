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
import { SuccessBottomSheet } from "@/components/Modals/SuccessBottomSheet/SuccessBottomSheet"
import { t } from "i18next"
import { Button } from "@/components/common/Button/Button"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { addToCart, removeItem } from "@/slices/cartSlice"
import formatAmount from "@/helpers/formatAmount"
import { BalanceTopUpBottomSheet } from "@/components/Modals/BalanceTopUpBottomSheet"

// Пример данных для карточек
const mockNfts: {
  id: string
  title: string
  price: number
  url: string
  status: "sell" | "on sale"
}[] = [
  { id: "1", title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
  {
    id: "2",
    title: "Bored Stickers",
    price: 90,
    url: monkey,
    status: "on sale",
  },
  { id: "3", title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
  { id: "4", title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
  { id: "5", title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
  { id: "6", title: "Bored Stickers", price: 90, url: monkey, status: "sell" },
]

export const StickersPage: FC<IStickersPageProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isMarket } = useOutletContext<{ isMarket: boolean }>()
  const { openSheet, closeAll } = useBottomSheet()

  const cartItems = useAppSelector(state => state.cart.items)
  const isInCart = (id: string) => cartItems.some(item => item.id === id)

  const balance = useAppSelector(state => state.finance.balance)

  const onCardClick = (cardId: string) => {
    navigate(`${cardId}`)
  }
  const [value, setValue] = useState("")

  const handleBuy = (nft: {
    id: string
    title: string
    price: number
    url: string
  }) => {
    const isBalanceEnough = Number(balance) >= nft.price
    if (!isBalanceEnough) {
      openSheet(
        <BalanceTopUpBottomSheet
          onClose={closeAll}
          purchasePrice={nft.price}
          availableBalance={formatAmount(balance)}
        />,
        {
          bottomSheetTitle: `${t("top_up_balance")}`,
        }
      )
    } else {
      openSheet(
        <SuccessBottomSheet
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
    }
  }

  const handleToggleCart = (nft: {
    id: string
    title: string
    price: number
    url: string
  }) => {
    if (isInCart(nft.id)) {
      dispatch(removeItem(nft.id))
    } else {
      dispatch(
        addToCart({
          id: nft.id,
          title: nft.title,
          number: `#${nft.id}`,
          price: nft.price,
          inStock: true,
          selected: true,
        })
      )
    }

    closeAll()
  }

  const handleViewCart = () => {
    // логика открытия корзины
    closeAll()
    navigate("/cart")
  }

  const onBuyButtonClick = (nft: {
    id: string
    title: string
    price: number
    url: string
  }) => {
    openSheet(
      <BuyNftBottomSheet {...nft} availableBalance={formatAmount(balance)} />,
      {
        bottomSheetTitle: `${t("buy_nft")}`,
        buttons: (
          <ModalButtonsWrapper
            variant={isMarket ? "buy" : "remove from sale"}
            price={nft.price}
            balance={formatAmount(balance)}
            isInCart={isInCart(nft.id)}
            onMainClick={() => handleBuy(nft)}
            onSecondaryClick={handleViewCart}
            onCartClick={() => handleToggleCart(nft)}
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
        onCardClick={onCardClick}
        onMainAction={onBuyButtonClick}
        onCartClick={handleToggleCart}
        isInCart={id => cartItems.some(item => item.id === id)}
      />
      <Outlet context={{ isMarket: isMarket }} />
    </Page>
  )
}
