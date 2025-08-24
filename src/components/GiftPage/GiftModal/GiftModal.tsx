import { useMemo, useState, type FC } from "react"

import { BottomSheet } from "@/components/common/BottomSheet/BottomSheet"

import { Button } from "@/components/common/Button/Button"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { PriceTooltip } from "@/components/common/PriceTooltip/PriceTooltip"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"

import { GiftImageWithText } from "./GiftImageWithText/GiftImageWithText"
import { t } from "i18next"
import Icon from "@/components/common/Icon/Icon"
import telegramIcon from "@/static/icons/telegramIcon.svg"
import statusIcon from "@/static/icons/statusIcon.svg"
import shareIcon from "@/static/icons/shareIcon.svg"
import { openTelegramLink, setEmojiStatus, shareURL } from "@telegram-apps/sdk"

import styles from "./GiftModal.module.scss"
import { Chip } from "@/components/common/Chip/Chip"
import { DetailsTable } from "@/components/common/DetailsTable/DetailsTable"
import { ModalButtonsWrapper } from "@/components/common/ModalButtonsWrapper/ModalButtonsWrapper"
import { ConfirmBuyNftBottomSheet } from "@/components/Modals/ConfirmBuyNftBottomSheet/ConfirmBuyNftBottomSheet"
import { AvailableBalance } from "@/components/common/AvailableBalance/AvailableBalance"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { removeItem, addToCart } from "@/slices/cartSlice"
import formatAmount from "@/helpers/formatAmount"
import { BalanceTopUpBottomSheet } from "@/components/Modals/BalanceTopUpBottomSheet"
import { useGetGiftByIdPublicQuery } from "@/api/endpoints/gifts"
import {
  useCancelListingMutation,
  useCreateListingMutation,
  useGetListingByGiftIdQuery,
} from "@/api/endpoints/listings"
import { SuccessBottomSheet } from "@/components/Modals/SuccessBottomSheet/SuccessBottomSheet"
import { ErrorBottomSheet } from "@/components/Modals/ErrorBottomSheet/ErrorBottomSheet"
import { ListingCreate } from "@/types/listing"
import { SellNftModal } from "@/components/Modals/SellNftModal/SellNftModal"
import { useGetBalanceQuery } from "@/api/endpoints/finance"

export const GiftModal: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { openSheet, closeAll } = useBottomSheet()
  const { id } = useParams<{ id: string }>()

  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const cartItems = useAppSelector(state => state.cart.items)
  const isInCart = cartItems.some(item => item.id === id)

  const { data: balance, isLoading: isBalLoading } = useGetBalanceQuery(
    undefined,
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      // pollingInterval: 10_000,
    }
  )
  const { data: listingData } = useGetListingByGiftIdQuery(id!, { skip: !id })
  const [createListing, { isLoading: isCreating }] = useCreateListingMutation()
  const [cancelListing, { isLoading: isCanceling }] = useCancelListingMutation()

  const {
    data: giftData,
    isLoading,
    isError,
  } = useGetGiftByIdPublicQuery(id!, { skip: !id })

  const gift = useMemo(() => {
    return {
      id: giftData?.id ?? id ?? "",
      title: giftData?.model?.title ?? "",
      tg_name: giftData?.model?.name ?? "",
      url: giftData?.background_url ?? "",
      price: giftData?.price ?? 0,
      tg_gift_id: giftData?.tg_gift_id ?? "",
      number: giftData?.number ?? null,
      background_name: giftData?.background?.name ?? "",
      background_rarity: giftData?.background?.rarity ?? 0,
      background_url: giftData?.background_url ?? "",
      pattern_name: giftData?.pattern?.name ?? "",
      pattern_rarity: giftData?.pattern?.rarity ?? 0,
      variant_name: giftData?.variant?.name ?? "",
      variant_rarity: giftData?.variant?.rarity ?? 0,
      preview: giftData?.preview_url ?? "",
      animation_url: giftData?.animation_url ?? "",

      model: giftData?.model?.title ?? "",
      locked: giftData?.locked ?? false,
    }
  }, [isMarket, giftData, id])
  console.log(listingData)
  const [isClosing, setIsClosing] = useState(false)

  const priceContent = useMemo(
    () => (
      <span className={styles.priceRow}>
        <span className={styles.price}>
          {formatAmount(listingData?.price || "")} TON
          {isMarket && (
            <PriceTooltip price={formatAmount(listingData?.price || "")} />
          )}
        </span>
      </span>
    ),
    [listingData]
  )

  const showEmodjiStatus = async () => {
    openTelegramLink.ifAvailable(`https://t.me/nft/${gift.tg_name}`)
  }

  const setEmodjiStatus = async () => {
    if (setEmojiStatus.isAvailable()) {
      await setEmojiStatus(gift.tg_gift_id)
    }
  }

  const shareEmodjiStatus = async () => {
    const url = `https://t.me/d33sf0mebot/mytest/#/market/gifts/${id}?startapp=command` //заменить url из .env
    shareURL.ifAvailable(url, `Смотри этот гифт ${gift.tg_name}`)
  }

  const handleBuy = () => {
    setIsClosing(true)
    const isBalanceEnough =
      Number(balance?.available) >= Number(listingData?.price)
    if (!isBalanceEnough) {
      openSheet(
        <BalanceTopUpBottomSheet
          onClose={closeAll}
          purchasePrice={Number(formatAmount(listingData?.price || ""))}
          availableBalance={formatAmount(balance?.available || "0")}
        />,
        {
          bottomSheetTitle: `${t("top_up_balance")}`,
        }
      )
    } else {
      openSheet(
        <ConfirmBuyNftBottomSheet
          nftPrice={Number(formatAmount(listingData?.price || ""))}
          onBuy={async () => {
            closeAll()
          }}
          onCancel={closeAll}
          quantity="1"
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
    if (isInCart) {
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

    setIsClosing(true)
  }

  const handleViewCart = () => {
    // логика открытия корзины
    navigate("/cart")
  }

  const handleWithdraw = async () => {
    // логика вывода стикера из прилы
  }

  const handleWithdrawFromSale = async () => {
    const listingId = listingData?.id
    if (!listingId) return
    // логика снятия с продажи

    try {
      await cancelListing(listingId).unwrap()
      openSheet(
        <SuccessBottomSheet
          title={"NFT успешно снят с продажи"}
          actionButtons={[
            <Button type="primary" size="large">
              Готово
            </Button>,
          ]}
        />,
        {
          bottomSheetTitle: `${t("withdraw_nft", "Снятие с продажи")}`,
        }
      )
    } catch (error) {
      openSheet(
        <ErrorBottomSheet
          errorTitle={"Ошибка снятия с продажи"}
          errorText={"Не удалось снять NFT с продажи. Попробуйте ещё раз."}
        />,
        {
          bottomSheetTitle: "Снятие с продажи",
        }
      )
      console.error("Ошибка при снятии с продажи", error)
    }
  }

  const handlePutOnSale = () => {
    // логика выставления на продажу

    const nft = {
      id: gift.id,
      title: gift.title,
      price: gift.price || 0,
      preview: gift.preview,
      background: gift.background_url,
      number: String(gift.number || ""),
    }
    openSheet(<SellNftModal nfts={Array(nft)} />, {
      bottomSheetTitle: `${t("sell_nft", "Продажа NFT")}`,
    })
  }

  const handleEditPrice = () => {
    // логика снятия с продажи
  }

  const rows = useMemo(() => {
    if (isMarket) {
      return [
        {
          label: "Модель",
          value: (
            <div className={styles.detailTableValueWrapper}>
              <span className={styles.detailTableValueText}>
                {gift.variant_name}
              </span>{" "}
              <Chip>{gift.variant_rarity}%</Chip>
            </div>
          ),
        },
        {
          label: "Символ",
          value: (
            <div className={styles.detailTableValueWrapper}>
              <span className={styles.detailTableValueText}>
                {gift.pattern_name}
              </span>{" "}
              <Chip>{gift.pattern_rarity}%</Chip>
            </div>
          ),
        },
        {
          label: "Фон",
          value: (
            <div className={styles.detailTableValueWrapper}>
              <span className={styles.detailTableValueText}>
                {gift.background_name}
              </span>{" "}
              <Chip>{gift.background_rarity}%</Chip>
            </div>
          ),
        },
        {
          label: "Нижняя цена",
          value: (
            <span className={styles.priceRow}>
              {formatAmount(listingData?.price || "")} TON
            </span>
          ),
        },
        { label: "Цена", value: priceContent },
      ]
    } else {
      const yourPriceContent = (
        <span className={styles.priceRow}>
          <span className={styles.price}>
            {formatAmount(listingData?.price || "")} TON{" "}
            <PriceTooltip price={formatAmount(listingData?.price || "")} />
          </span>

          <Button
            size="small"
            className={styles.editButton}
            onClick={handleEditPrice}
          >
            {t("edit", "Изменить")}
          </Button>
        </span>
      )

      return [
        {
          label: "Модель",
          value: (
            <div className={styles.detailTableValueWrapper}>
              <span className={styles.detailTableValueText}>
                {gift.variant_name}
              </span>
            </div>
          ),
        },
        {
          label: "Символ",
          value: (
            <div className={styles.detailTableValueWrapper}>
              <span className={styles.detailTableValueText}>
                {gift.pattern_name}
              </span>
            </div>
          ),
        },
        {
          label: "Фон",
          value: (
            <div className={styles.detailTableValueWrapper}>
              <span className={styles.detailTableValueText}>
                {gift.background_name}
              </span>
            </div>
          ),
        },
        { label: "Рыночная цена", value: priceContent },
        ...(gift.locked
          ? [{ label: "Ваша цена", value: yourPriceContent }]
          : []),
      ]
    }
  }, [isMarket, gift, listingData])

  return (
    <BottomSheet
      open={true}
      doCloseAnimation={isClosing}
      onClose={() => navigate(-1)}
      buttons={
        <ModalButtonsWrapper
          variant={isMarket ? "buy" : gift.locked ? "withdraw" : "sell"}
          price={formatAmount(listingData?.price || "")}
          balance={formatAmount(balance?.available || "0")}
          isInCart={isInCart}
          onMainClick={
            isMarket
              ? handleBuy
              : gift.locked
              ? handleWithdrawFromSale
              : handleWithdraw
          }
          onSecondaryClick={
            isMarket && isInCart ? handleViewCart : handlePutOnSale
          }
          onCartClick={() => handleToggleCart(gift)}
        />
      }
    >
      <GiftImageWithText
        background_url={gift.background_url}
        animation_url={gift.animation_url}
        name={gift.title}
        number={gift.number || 0}
      />

      <div className={styles.detailGiftSheetActions}>
        <Button type="vertical" size="large" onClick={showEmodjiStatus}>
          <Icon src={telegramIcon} className={styles.actionIcon} />
          {t("buttons.view")}
        </Button>
        <Button type="vertical" size="large" onClick={setEmodjiStatus}>
          <Icon src={statusIcon} className={styles.actionIcon} />
          {t("buttons.status")}
        </Button>
        <Button type="vertical" size="large" onClick={shareEmodjiStatus}>
          <Icon src={shareIcon} className={styles.actionIcon} />
          {t("buttons.share")}
        </Button>
      </div>

      <DetailsTable rows={rows} />

      {isMarket && (
        <AvailableBalance balance={formatAmount(balance?.available || "0")} />
      )}
    </BottomSheet>
  )
}
