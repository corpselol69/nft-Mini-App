import { useMemo, useState, type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./GiftPage.module.scss"
import { Select } from "@/components/common/Select/Select"
import { Input } from "@/components/common/Input/Input"
import searchIcon from "@/static/icons/searchIcon.svg"
import { SELECT_DATA } from "@/constants/stickerFilter"

import Icon from "@/components/common/Icon/Icon"
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom"
import { NftGrid } from "@/components/common/NftGrid/NftGrid"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { IGiftPageProps } from "./GiftPage.d"
import { BuyNftBottomSheet } from "@/components/Modals/BuyNftBottomSheet/BuyNftBottomSheet"
import { ModalButtonsWrapper } from "@/components/common/ModalButtonsWrapper/ModalButtonsWrapper"
import { SuccessBottomSheet } from "@/components/Modals/SuccessBottomSheet/SuccessBottomSheet"
import { t } from "i18next"
import { Button } from "@/components/common/Button/Button"
import { removeItem, addToCart } from "@/slices/cartSlice"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import formatAmount from "@/helpers/formatAmount"
import { BalanceTopUpBottomSheet } from "@/components/Modals/BalanceTopUpBottomSheet"

import { useGetMyGiftsQuery } from "@/api/endpoints/gifts"
import { Tabs, Tab } from "@/components/common/Tabs/Tabs"
import { useGetCollectionItemsByModelIdQuery } from "@/api/endpoints/market"
import { MarketItemRead, NftListItem } from "@/types/market"
import { fromMarket, fromProfile } from "@/adapters/nftItemAdapter"

type Filters = {
  search?: string
  priceMin?: number
  priceMax?: number
  rarityMin?: number
  rarityMax?: number
  tab?: "all" | "for-sale" | "not-for-sale" // вкладки в мои нфт
  backgrounds?: string[] // только market
  patterns?: string[] // только market
}

export const GiftPage: FC<IGiftPageProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { model_id } = useParams<{ model_id: string }>()

  const { openSheet, closeAll } = useBottomSheet()
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const cartItems = useAppSelector(state => state.cart.items)
  const isInCart = (id: string) => cartItems.some(item => item.id === id)

  const balance = useAppSelector(state => state.finance.balance)

  const [priceFilter, setPriceFilter] = useState("")
  // активная вкладка (только для профиля)
  const [currentTab, setCurrentTab] = useState<
    "all" | "for-sale" | "not-for-sale"
  >("all")

  // выбранные фильтры цены
  const [priceMin, setPriceMin] = useState<number | undefined>(undefined)
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined)

  // выбранные фильтры по редкости
  const [rarityMin, setRarityMin] = useState<number | undefined>(undefined)
  const [rarityMax, setRarityMax] = useState<number | undefined>(undefined)

  // выбранные фоны (только для маркета)
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([])

  // выбранные узоры (только для маркета)
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([])

  const [search, setSearch] = useState("")

  const {
    data: myGifts,
    isLoading: myLoading,
    isError: myError,
  } = useGetMyGiftsQuery(undefined, {
    skip: isMarket,
  })

  const {
    data: marketCollectionRaw,
    isLoading: marketLoading,
    isError: marketError,
  } = useGetCollectionItemsByModelIdQuery(
    {
      model_id: model_id ?? "",
      offset: 0,
      limit: 50,
      sort: "newest",
    },
    {
      skip: !isMarket || !model_id,
    }
  )

  const marketItems: NftListItem[] = useMemo(() => {
    if (!marketCollectionRaw) return []
    const items: MarketItemRead[] = marketCollectionRaw.items ?? []
    return items.map(fromMarket)
  }, [marketCollectionRaw])

  const profileItems: NftListItem[] = useMemo(
    () => (myGifts ?? []).map(fromProfile),
    [myGifts]
  )
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

  const onBuyButtonClick = (nft: NftListItem) => {
    openSheet(
      <BuyNftBottomSheet nft={nft} availableBalance={formatAmount(balance)} />,
      {
        bottomSheetTitle: `${t("buy_nft")}`,
        buttons: (
          <ModalButtonsWrapper
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

  const list: NftListItem[] = isMarket ? marketItems : profileItems
  const isLoading = isMarket ? marketLoading : myLoading
  const isError = isMarket ? marketError : myError

  const matchesSearch = (n: NftListItem, q: string) => {
    if (!q) return true
    const s = q.trim().toLowerCase()
    return n.id.toLowerCase().includes(s) || n.title.toLowerCase().includes(s)
  }

  const inRange = (val: number | undefined, min?: number, max?: number) => {
    if (val == null) return true
    if (min != null && val < min) return false
    if (max != null && val > max) return false
    return true
  }

  const matchesProfileTab = (n: NftListItem, tab?: Filters["tab"]) => {
    if (n.source !== "profile" || !tab || tab === "all") return true
    if (tab === "for-sale") {
      return n.locked
    }
    if (tab === "not-for-sale") {
      return !n.locked
    }
    return true
  }
  const facets = useMemo(() => {
    if (!marketCollectionRaw) return undefined
    return Array.isArray(marketCollectionRaw)
      ? marketCollectionRaw[0]?.facets
      : marketCollectionRaw.facets
  }, [marketCollectionRaw])

  const matchesMarketFacets = (
    _n: NftListItem,
    _backgrounds?: string[],
    _patterns?: string[]
  ) => true // no‑op, пока бэк не отдаёт поля у item

  const filtered: NftListItem[] = useMemo(() => {
    const q = (search ?? "").toLowerCase()
    return list.filter(
      n =>
        matchesSearch(n, q) &&
        inRange(n.price, priceMin, priceMax) &&
        inRange(n.rarity, rarityMin, rarityMax) &&
        matchesProfileTab(n, isMarket ? undefined : currentTab) &&
        (isMarket
          ? matchesMarketFacets(n, selectedBackgrounds, selectedPatterns)
          : true)
    )
  }, [
    list,
    search,
    priceMin,
    priceMax,
    rarityMin,
    rarityMax,
    currentTab,
    isMarket,
    selectedBackgrounds,
    selectedPatterns,
  ])

  return (
    <Page back={isMarket}>
      <div>
        <div className={styles.filterWrapper}>
          {!isMarket && (
            <Tabs
              type="select"
              selected={currentTab}
              onSelect={key =>
                setCurrentTab(key as "all" | "for-sale" | "not-for-sale")
              }
            >
              <Tab to="all">{t("all")}</Tab>
              <Tab to="not-for-sale">{t("not_for_sale")}</Tab>
              <Tab to="for-sale">{t("for_sale")}</Tab>
            </Tabs>
          )}
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

        {!isMarket && isLoading && (
          <div className={styles.loader}>Загрузка…</div>
        )}
        {!isMarket && isError && (
          <div className={styles.error}>Не удалось загрузить подарки</div>
        )}
        <NftGrid
          items={filtered}
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
