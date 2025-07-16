import { FC } from "react"
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
import { CartItem } from "@/components/CartPage/CartItem/CartItem"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import {
  removeItem,
  setItemDeleting,
  selectAll,
  toggleSelectItem,
  restoreItem,
} from "@/slices/cartSlice"
import { store } from "@/store"
import formatAmount from "@/helpers/formatAmount"
import { AvailableBalance } from "@/components/common/AvailableBalance/AvailableBalance"
import { BalanceTopUpBottomSheet } from "@/components/Modals/BalanceTopUpBottomSheet"

export const CartPage: FC = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(state => state.cart.items)
  const balance = useAppSelector(state => state.finance.balance)

  const totalCount = items.length
  const totalValue = items
    .filter(i => i.inStock)
    .reduce((a, i) => a + i.price, 0)
  const selectedItems = items.filter(i => i.selected)
  const totalPrice = selectedItems.reduce((a, i) => a + i.price, 0)

  const isBalanceEnough = totalPrice <= Number(balance)

  const setAllSelected = (checked: boolean) => {
    dispatch(selectAll(checked))
  }
  const setItemSelected = (id: string, checked: boolean) => {
    dispatch(toggleSelectItem({ id, selected: checked }))
  }
  const selectedItemsLength = items.filter(el => el.selected).length

  const handleRemove = (id: string) => {
    const item = items.find(i => i.id === id)
    if (!item) return

    if (!item.inStock) {
      dispatch(removeItem(id)) // удаляем сразу
      return
    }

    dispatch(setItemDeleting({ id, isDeleting: true }))

    setTimeout(() => {
      // Проверим, не был ли восстановлен
      const stillDeleting = store
        .getState()
        .cart.items.find(i => i.id === id)?.isDeleting
      if (stillDeleting) {
        dispatch(removeItem(id))
      }
    }, 5000)
  }

  const handleRestore = (id: string) => {
    dispatch(restoreItem(id))
  }

  const { openSheet, closeAll } = useBottomSheet()

  const handleBuyNft = async () => {
    //api.buyNft(id)
  }

  const handleOnBuyClick = () => {
    if (!isBalanceEnough) {
      openSheet(
        <BalanceTopUpBottomSheet
          onClose={closeAll}
          purchasePrice={totalPrice}
          availableBalance={formatAmount(balance)}
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
        <CartHeader totalCount={totalCount} balance={formatAmount(balance)} />
        <div className={styles.contentWrapper}>
          <div className={styles.contentHeader}>
            <CartSelectAll items={items} onSelectAll={setAllSelected} />
            <span className={styles.totalPriceText}>
              <span>{totalValue}</span>
              <Icon src={tonIcon} className={styles.iconTonBalance} />
            </span>
          </div>
          {items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              isDeleting={!!item.isDeleting}
              onRemove={() => handleRemove(item.id)}
              onSelect={(checked: boolean) => setItemSelected(item.id, checked)}
              onRestore={() => handleRestore(item.id)}
            />
          ))}
        </div>
        <div className={styles.footerWrapper}>
          <AvailableBalance balance={formatAmount(balance)} />
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
