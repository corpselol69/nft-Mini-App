import { useEffect, useMemo, useState, type FC } from "react"

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
import formatAmount from "@/helpers/formatAmount"
import { BalanceTopUpBottomSheet } from "@/components/Modals/BalanceTopUpBottomSheet"

import { useGetMyGiftsQuery } from "@/api/endpoints/gifts"
import { Tabs, Tab } from "@/components/common/Tabs/Tabs"
import { useGetCollectionItemsByModelIdQuery } from "@/api/endpoints/market"
import { MarketItemRead, NftListItem } from "@/types/market"
import { fromMarket, fromProfile } from "@/adapters/nftItemAdapter"
import { useGetBalanceQuery } from "@/api/endpoints/finance"
import {
  useGetMyCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useCartCheckoutMutation,
  useCartConfirmMutation,
} from "@/api/endpoints/cart"
import { ErrorBottomSheet } from "@/components/Modals/ErrorBottomSheet/ErrorBottomSheet"
import { ConfirmBuyNftBottomSheet } from "@/components/Modals/ConfirmBuyNftBottomSheet/ConfirmBuyNftBottomSheet"

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

  const { model_id } = useParams<{ model_id: string }>()

  const { openSheet, closeAll, closeSheet } = useBottomSheet()
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const { data: cart } = useGetMyCartQuery()
  const [addToCart, { isLoading: _adding }] = useAddToCartMutation()
  const [cartConfirm, { isLoading: _confirming }] = useCartConfirmMutation()
  const [cartCheckout, { isLoading: _checkingOut }] = useCartCheckoutMutation()
  const [removeFromCart] = useRemoveFromCartMutation()

  // const isProcessing = adding || confirming || checkingOut

  const isInCart = (listingId: string) =>
    !!cart?.items?.some(
      (it: any) => it.listing_id === listingId || it.id === listingId
    )
  const findCartItemId = (listingId: string) =>
    cart?.items?.find(i => i.listing_id === listingId)?.id

  const { data: balance, isFetching: _isBalFetching } = useGetBalanceQuery(
    undefined,
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  )

  const [priceFilter, setPriceFilter] = useState("")
  // активная вкладка (только для профиля)
  const [currentTab, setCurrentTab] = useState<
    "all" | "for-sale" | "not-for-sale"
  >("all")

  // выбранные фильтры цены
  const [priceMin, _setPriceMin] = useState<number | undefined>(undefined)
  const [priceMax, _setPriceMax] = useState<number | undefined>(undefined)

  // выбранные фильтры по редкости
  const [rarityMin, _setRarityMin] = useState<number | undefined>(undefined)
  const [rarityMax, _setRarityMax] = useState<number | undefined>(undefined)

  // выбранные фоны (только для маркета)
  const [selectedBackgrounds, _setSelectedBackgrounds] = useState<string[]>([])

  // выбранные узоры (только для маркета)
  const [selectedPatterns, _setSelectedPatterns] = useState<string[]>([])

  const [search, _setSearch] = useState("")

  const {
    data: myGifts,
    isLoading: myLoading,
    isError: myError,
  } = useGetMyGiftsQuery(undefined, {
    skip: isMarket,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const {
    data: marketCollectionRaw,
    isLoading: marketLoading,
    isError: marketError,
    refetch: refetchMarket,
  } = useGetCollectionItemsByModelIdQuery(
    {
      model_id: model_id ?? "",
      offset: 0,
      limit: 50,
      sort: "newest",
    },
    {
      skip: !isMarket || !model_id,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  )

  useEffect(() => {
    if (isMarket && model_id) refetchMarket()
  }, [isMarket, model_id, refetchMarket])

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

  const confirmBuy = (opts: { price: number; quantity?: string }) =>
    new Promise<boolean>(resolve => {
      openSheet(
        <ConfirmBuyNftBottomSheet
          nftPrice={Number(formatAmount(String(opts.price)))}
          quantity={opts.quantity ?? "1"}
          onBuy={() => {
            closeAll()
            resolve(true)
          }}
          onCancel={() => {
            closeSheet()
            resolve(false)
          }}
        />,
        {
          bottomSheetTitle: `${t("buy_nft")}`,
        }
      )
    })

  const handleBuy = async ({
    listing_id,
    price,
  }: {
    listing_id: string
    price: number
  }) => {
    try {
      const confirmed = await confirmBuy({ price, quantity: "1" })
      if (!confirmed) return

      const isBalanceEnough = Number(balance?.available) >= price
      if (!isBalanceEnough) {
        openSheet(
          <BalanceTopUpBottomSheet
            onClose={closeAll}
            purchasePrice={price}
            availableBalance={formatAmount(balance?.available || "0")}
          />,
          {
            bottomSheetTitle: `${t("top_up_balance")}`,
          }
        )
        return
      }

      let cartItemId = findCartItemId(listing_id)
      if (!cartItemId) {
        const added = await addToCart({ listing_id }).unwrap()
        cartItemId = added.items.find(i => i.listing_id === listing_id)?.id
      }
      if (!cartItemId)
        throw new Error("Не удалось получить id позиции в корзине")

      await cartConfirm({
        item_ids: [cartItemId],
        accept_all: true, // принять изменения для выбранных item_ids
        remove_unavailable: true, // если внезапно пропал — сервер удалит, а checkout не пройдет
      }).unwrap()
      await cartCheckout().unwrap()

      if (isMarket && model_id) {
        await refetchMarket()
      }

      openSheet(
        <SuccessBottomSheet
          title={"NFT успешно куплен"}
          subTitle="Мы уже отправили NFT к вам в профиль"
          actionButtons={[
            <Button type="primary" size="large" onClick={closeAll}>
              {t("buttons.done")}
            </Button>,
          ]}
        />,
        {
          bottomSheetTitle: `${t("buy_nft")}`,
        }
      )
    } catch (e) {
      console.error("buy failed", e)
      openSheet(
        <ErrorBottomSheet
          errorTitle={t("buy_error")}
          errorText={t("buy_error_text")}
          actionButtons={[
            <Button type="primary" size="large" onClick={closeAll}>
              {t("buttons.ok")}
            </Button>,
          ]}
        />,
        { bottomSheetTitle: t("buy_nft") }
      )
      // снэкбар
    }
  }

  const handleToggleCart = async (listing_id: string) => {
    try {
      if (isInCart(listing_id)) {
        try {
          await removeFromCart(listing_id).unwrap()
        } catch (e) {
          throw e
        }
      } else {
        try {
          await addToCart({ listing_id }).unwrap()
        } catch (e) {
          throw e
        }
      }
      closeAll()
    } catch (e) {
      console.error("cart toggle failed", e)
      // снэкбар
    }
  }

  const handleViewCart = () => {
    // логика открытия корзины
    closeAll()
    navigate("/cart")
  }

  const onBuyButtonClick = (nft: NftListItem) => {
    openSheet(
      <BuyNftBottomSheet
        nft={nft}
        availableBalance={formatAmount(balance?.available || "0")}
      />,
      {
        bottomSheetTitle: `${t("buy_nft")}`,
        buttons: (
          <ModalButtonsWrapper
            price={nft.price.toString()}
            balance={formatAmount(balance?.available || "0")}
            isInCart={isInCart(nft.listing_id || "")}
            onMainClick={() =>
              handleBuy({ listing_id: nft.listing_id || "", price: nft.price })
            }
            onSecondaryClick={handleViewCart}
            onCartClick={() => handleToggleCart(nft.listing_id || "")}
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
  // const facets = useMemo(() => {
  //   if (!marketCollectionRaw) return undefined
  //   return Array.isArray(marketCollectionRaw)
  //     ? marketCollectionRaw[0]?.facets
  //     : marketCollectionRaw.facets
  // }, [marketCollectionRaw])

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
          isInCart={id => !!cart?.items.some(item => item.listing_id === id)}
        />

        <Outlet context={{ isMarket: isMarket }} />
      </div>
    </Page>
  )
}
