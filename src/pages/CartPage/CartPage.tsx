import { FC, useEffect, useRef, useState } from "react"
import styles from "./CartPage.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import { Page } from "@/components/Page.tsx"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { ConfirmBuyNftBottomSheet } from "@/components/Modals/ConfirmBuyNftBottomSheet/ConfirmBuyNftBottomSheet"
import { t } from "i18next"
import { CartHeader } from "@/components/CartPage/CartHeader/CartHeader"
import { CartSelectAll } from "@/components/CartPage/CartSelectAll/CartSelectAll"
import { useAppDispatch } from "@/hooks/useRedux"
import { selectAll, toggleSelectItem } from "@/slices/cartSlice"
import formatAmount from "@/helpers/formatAmount"
import { AvailableBalance } from "@/components/common/AvailableBalance/AvailableBalance"
import { BalanceTopUpBottomSheet } from "@/components/Modals/BalanceTopUpBottomSheet"
import { useGetBalanceQuery } from "@/api/endpoints/finance"
import {
  useRemoveFromCartMutation,
  useCartConfirmMutation,
  useCartCheckoutMutation,
  useGetMyCartQuery,
  useLazyRefreshCartQuery,
  cartApi,
} from "@/api/endpoints/cart"
import { NFTCardSmall } from "@/components/common/NFTCardSmall/NFTCardSmall"
import { NftPreview } from "@/components/common/NftPreview/NftPreview"
import { CartDiff } from "@/types/cart"

type UndoHandle = {
  undo: () => void
  timer: number
}

export const CartPage: FC = () => {
  const { openSheet, closeAll } = useBottomSheet()

  const dispatch = useAppDispatch()

  const [removeFromCart] = useRemoveFromCartMutation()
  const [cartConfirm] = useCartConfirmMutation()
  const [cartCheckout] = useCartCheckoutMutation()

  const [diffs, setDiffs] = useState<CartDiff[]>([])

  const {
    data: cart,
    isFetching: isCartFetching,
    refetch: refetchCart,
  } = useGetMyCartQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  })

  const [triggerRefresh] = useLazyRefreshCartQuery()

  useEffect(() => {
    triggerRefresh()
      .unwrap()
      .then(preview => {
        setDiffs(preview.diffs ?? [])
        return refetchCart()
      })
      .catch(() => {})
  }, [triggerRefresh, refetchCart])

  const items = cart?.items ?? []

  const { data: balance, isFetching: isBalFetching } = useGetBalanceQuery(
    undefined,
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  )

  const totalCount = items.length
  const totalValue = items.reduce((a, i) => a + Number(i.listing.price), 0)
  const selectedItems = items.filter(i => i.selected)
  const totalPrice = selectedItems.reduce((a, i) => a + i.price, 0)

  const isBalanceEnough = totalPrice <= Number(balance?.available)

  const setAllSelected = (checked: boolean) => {
    dispatch(selectAll(checked))
  }
  const setItemSelected = (id: string, checked: boolean) => {
    dispatch(toggleSelectItem({ id, selected: checked }))
  }
  const selectedItemsLength = items.filter(el => el.selected).length

  // удаление с возможностью отмены
  const undoMap = useRef<Record<string, UndoHandle>>({})
  const [pendingUndoId, setPendingUndoId] = useState<string | null>(null)

  const handleRemove = (id: string) => {
    const item = cart?.items.find(i => i.id === id)
    if (!item) return

    let time = 5000

    if (item.listing.state !== "active") time = 0

    const listingId = item.listing?.id ?? item.listing_id

    setPendingUndoId(id)

    const timer = window.setTimeout(async () => {
      const patch = dispatch(
        cartApi.util.updateQueryData("getMyCart", undefined, draft => {
          if (!draft) return
          draft.items = draft.items.filter((i: any) => i.id !== id)
        })
      )
      delete undoMap.current[id]
      setPendingUndoId(prev => (prev === id ? null : prev))

      try {
        await removeFromCart(listingId).unwrap()
      } catch (e) {
        patch.undo()
      }
    }, time)

    undoMap.current[id] = {
      undo: () => {
        window.clearTimeout(timer)
        // patch.undo()
        delete undoMap.current[id]
        setPendingUndoId(prev => (prev === id ? null : prev))
      },
      timer,
    }
  }

  const handleRestore = () => {
    if (!pendingUndoId) return
    undoMap.current[pendingUndoId]?.undo()
  }

  useEffect(() => {
    return () => {
      Object.values(undoMap.current).forEach(h => window.clearTimeout(h.timer))
      undoMap.current = {}
    }
  }, [])

  // покупка
  const handleBuyNft = async () => {
    //api.buyNft(id)
  }

  const handleOnBuyClick = () => {
    if (!isBalanceEnough) {
      openSheet(
        <BalanceTopUpBottomSheet
          onClose={closeAll}
          purchasePrice={totalPrice}
          availableBalance={formatAmount(balance?.available || "0")}
        />,
        {
          bottomSheetTitle: `${t("top_up_balance")}`,
        }
      )
    } else {
      openSheet(
        <ConfirmBuyNftBottomSheet
          nftPrice={totalPrice}
          onBuy={handleBuyNft}
          onCancel={closeAll}
          quantity={selectedItemsLength.toString()}
        />,
        {
          bottomSheetTitle: `${t("buy_nft")}`,
        }
      )
    }
  }

  return (
    <Page back={true}>
      <div className={styles.pageWrapper}>
        <CartHeader
          totalCount={totalCount}
          balance={formatAmount(balance?.available || "0")}
        />
        <div className={styles.contentWrapper}>
          <div className={styles.contentHeader}>
            <CartSelectAll items={items} onSelectAll={setAllSelected} />
            <span className={styles.totalPriceText}>
              {totalValue}
              <Icon src={tonIcon} className={styles.iconTonBalance} />
            </span>
          </div>
          {items.map(item => (
            <NFTCardSmall
              key={item.id}
              preview={
                <NftPreview
                  background_url={item.listing.gift.background_url}
                  preview_url={item.listing.gift.preview_url}
                />
              }
              title={item.listing.gift.model.title}
              subtitle={
                item.listing.state === "active"
                  ? `#${item.listing.gift.number}`
                  : "Нет в наличии"
              }
              price={Number(formatAmount(item.listing.price))}
              oldPrice={
                Number(
                  formatAmount(
                    diffs.find(d => d.item_id === item.id)?.old_price || "0"
                  )
                ) || null
              }
              inStock={item.inStock}
              isDeleting={pendingUndoId === item.id}
              selected={selectedItems.some(i => i.id === item.id)}
              showCheckbox
              deletable
              onRemove={() => handleRemove(item.id)}
              onSelect={(checked: boolean) => setItemSelected(item.id, checked)}
              onRestore={handleRestore}
            />
          ))}
        </div>
        <div className={styles.footerWrapper}>
          <AvailableBalance balance={formatAmount(balance?.available || "0")} />
          {!!selectedItemsLength && (
            <div className={styles.actionButton}>
              <Button type="primary" size="large" onClick={handleOnBuyClick}>
                {isBalanceEnough ? (
                  <>
                    {t("buttons.buy_for")} {totalPrice}
                    <Icon src={tonIcon} />
                  </>
                ) : (
                  t("buttons.top_up_and_buy")
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Page>
  )
}
