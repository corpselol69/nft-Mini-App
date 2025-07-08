import { useCallback, useMemo, useState, type FC } from "react"

import { BottomSheet } from "../common/BottomSheet/BottomSheet"

import shareIcon from "@/static/icons/shareIcon.svg"
import { shareURL } from "@telegram-apps/sdk"
import Icon from "../common/Icon/Icon"
import { Button } from "@/components/common/Button/Button"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"

import styles from "./StickerModal.module.scss"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { ModalButtonsWrapper } from "../common/ModalButtonsWrapper/ModalButtonsWrapper"
import monkeyImg from "@/static/placeholders/monkey.png"
import { PriceTooltip } from "../common/PriceTooltip/PriceTooltip"
import { DetailsTable } from "../common/DetailsTable/DetailsTable"
import { ConfirmBuyNftBottomSheet } from "../Modals/ConfirmBuyNftBottomSheet/ConfirmBuyNftBottomSheet"

// Пример данных для карточек
const mockNft = {
  id: 1,
  title: "Bored Stickers",
  price: 90,
  url: monkeyImg,
  collection: "Bored Stickers",
  number: "123123",
  issued: "9 999/9 999",
}

export const StickerModal: FC = () => {
  const navigate = useNavigate()
  const { openSheet, closeAll } = useBottomSheet()
  const { id } = useParams<{ id: string }>()
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const [isInCart, setIsInCart] = useState(false) //  заменить на реальное состояние

  const handleBuy = () => {
    openSheet(
      <ConfirmBuyNftBottomSheet
        nftPrice={mockNft.price}
        onBuy={() => {
          closeAll()
        }}
        onCancel={closeAll}
        quantity="1"
      />,
      {
        renderLeftHeader() {
          return <span className={styles.bottomSheetTitle}>Покупка NFT</span>
        },
      }
    )
    handleCloseGiftModal()
  }

  const handleAddToCart = () => {
    // логика добавления в корзину
    setIsInCart(!isInCart)
  }

  const handleViewCart = () => {
    // логика открытия корзины
    navigate("/cart")
  }

  const handleWithdraw = () => {
    // логика снятия с продажи
  }

  const handlePutOnSale = () => {
    // логика выставления на продажу
  }

  const handleCloseGiftModal = useCallback(() => {
    navigate(-1)
  }, [])

  const priceContent = (
    <span className={styles.priceRow}>
      <span>{mockNft.price} TON</span>
      <PriceTooltip price={mockNft.price} />
    </span>
  )

  const rows = useMemo(() => {
    return [
      { label: "Коллекция", value: mockNft.collection },
      { label: "Номер", value: mockNft.number },
      { label: "Выпущено", value: mockNft.issued },
      { label: "Цена", value: priceContent },
    ]
  }, [mockNft.collection, mockNft.number, mockNft.issued, mockNft.price])

  return (
    <BottomSheet
      open={true}
      onClose={() => navigate(-1)}
      renderLeftHeader={
        isMarket
          ? () => (
              <Button
                type="icon"
                className={styles.shareButton}
                onClick={() => {
                  const url = `https://t.me/d33sf0mebot/mytest/#/market/stickers/${id}`
                  if (shareURL.isAvailable()) {
                    shareURL(url, `Смотри этот стикер #${id}`)
                  }
                }}
              >
                <Icon src={shareIcon} />
              </Button>
            )
          : undefined
      }
    >
      <div className={styles.imageWrapper}>
        <img
          height={210}
          width={210}
          className={styles.nftImage}
          src={monkeyImg}
          alt="STICKER"
        />
      </div>

      <DetailsTable rows={rows} />

      <ModalButtonsWrapper
        variant={isMarket ? "buy" : "remove from sale"}
        price={90}
        balance={100}
        isInCart={isInCart}
        onMainClick={isMarket ? handleBuy : handleWithdraw}
        onSecondaryClick={
          isMarket && isInCart ? handleViewCart : handlePutOnSale
        }
        onCartClick={handleAddToCart}
      />
    </BottomSheet>
  )
}
