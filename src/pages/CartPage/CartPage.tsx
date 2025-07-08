import { FC, useState } from "react"
import styles from "./CartPage.module.scss"
import { Button } from "@/components/common/Button/Button"
import Icon from "@/components/common/Icon/Icon"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import { Page } from "@/components/Page.tsx"
import { mockCartItems } from "./const/mockData"
import { CartHeader } from "./components/CartHeader/CartHeader"
import { CartSelectAll } from "./components/CartSelectAll/CartSelectAll"
import { CartItem } from "./components/CartItem/CartItem"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { ConfirmBuyNftBottomSheet } from "@/components/Modals/ConfirmBuyNftBottomSheet/ConfirmBuyNftBottomSheet"

export const CartPage: FC = () => {
  const [items, setItems] = useState(mockCartItems)

  const totalCount = items.length
  const totalValue = items.reduce((a, i) => a + i.price, 0)

  const setAllSelected = (checked: boolean) =>
    setItems(items.map(i => ({ ...i, selected: i.inStock ? checked : false })))
  const setItemSelected = (id: string, checked: boolean) =>
    setItems(items.map(i => (i.id === id ? { ...i, selected: checked } : i)))

  const selectedItemsLength = items.filter(el => el.selected).length
  const totalPrice = items
    .filter(el => el.selected)
    .reduce((a, b) => a + b.price, 0)

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const handleRemove = (id: string) => setDeletingId(id)
  const handleRestore = (id: string) => setDeletingId(null)
  const { openSheet, closeAll } = useBottomSheet()

  const handleBuyNft = async () => {
    //api.buyNft(id)

    await new Promise(r => setTimeout(r, 2000))
  }

  const handleOnBuyClick = () => {
    openSheet(
      <ConfirmBuyNftBottomSheet
        nftPrice={totalPrice}
        onBuy={handleBuyNft}
        onCancel={closeAll}
        quantity={selectedItemsLength.toString()}
      />,
      {
        renderLeftHeader() {
          return <span className={styles.bottomSheetTitle}>Покупка NFT</span>
        },
      }
    )
  }

  return (
    <Page back={true}>
      <div className={styles.pageWrapper}>
        <CartHeader totalCount={totalCount} totalValue={totalValue} />
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
              onRemove={handleRemove}
              onSelect={setItemSelected}
              isDeleting={deletingId === item.id}
              onRestore={handleRestore}
              setIsDeleting={v => setDeletingId(v ? item.id : null)}
            />
          ))}
        </div>
        <div className={styles.footerWrapper}>
          <div className={styles.availableBalanceWrapper}>
            <span className={styles.availableBalanceText}>
              Доступный баланс
            </span>
            <div className={styles.availableBalanceValue}>
              <span>95,4</span>
              <Icon src={tonIcon} className={styles.iconTonBalance} />
            </div>
          </div>
          {!!selectedItemsLength && (
            <div className={styles.actionButton}>
              <Button type="primary" size="large" onClick={handleOnBuyClick}>
                Купить за {totalPrice}
                <Icon src={tonIcon} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Page>
  )
}
