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
import { removeItem, addToCart } from "@/slices/cartSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
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
  { id: "11", title: "Snow ball", price: 96, url: bdayImg, status: "sell" },
  { id: "22", title: "Snow ball", price: 90, url: bdayImg, status: "on sale" },
  { id: "33", title: "Snow ball", price: 90, url: bdayImg, status: "sell" },
  { id: "44", title: "Snow ball", price: 90, url: bdayImg, status: "sell" },
  { id: "55", title: "Snow ball", price: 90, url: bdayImg, status: "sell" },
  { id: "66", title: "Snow ball", price: 90, url: bdayImg, status: "sell" },
]

export const GiftPage: FC<IGiftPageProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { openSheet, closeAll } = useBottomSheet()
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const cartItems = useAppSelector(state => state.cart.items)
  const isInCart = (id: string) => cartItems.some(item => item.id === id)

  const balance = useAppSelector(state => state.finance.balance)

  const [priceFilter, setPriceFilter] = useState("")

  const onCardClick = (cardId: string) => {
    navigate(`${cardId}`)
  }

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
          items={mockNfts}
          isMarket={isMarket}
          onCardClick={onCardClick}
          onMainAction={onBuyButtonClick}
          onCartClick={handleToggleCart}
          isInCart={id => cartItems.some(item => item.id === id)}
        />

        <Outlet context={{ isMarket: isMarket }} />
      </div>
    </Page>
  )
}
