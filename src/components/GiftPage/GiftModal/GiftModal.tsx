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
import { ValueRow } from "@/components/common/ValueRow/ValueRow"
import formatAmount from "@/helpers/formatAmount"
import { BalanceTopUpBottomSheet } from "@/components/Modals/BalanceTopUpBottomSheet"
import { useGetGiftByIdPublicQuery } from "@/api/endpoints/gifts"
import {
  useCancelListingMutation,
  useGetListingByGiftIdQuery,
} from "@/api/endpoints/listings"
import { SuccessBottomSheet } from "@/components/Modals/SuccessBottomSheet/SuccessBottomSheet"
import { ErrorBottomSheet } from "@/components/Modals/ErrorBottomSheet/ErrorBottomSheet"
import { SellNftModal } from "@/components/Modals/SellNftModal/SellNftModal"
import { useGetBalanceQuery } from "@/api/endpoints/finance"
import {
  useAddToCartMutation,
  useGetMyCartQuery,
  useRemoveFromCartMutation,
} from "@/api/endpoints/cart"

export const GiftModal: FC = () => {
  const navigate = useNavigate()

  const { openSheet, closeAll, closeSheet } = useBottomSheet()
  const { id } = useParams<{ id: string }>()

  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const { data: cart } = useGetMyCartQuery()
  const isInCart = (listingId: string) =>
    !!cart?.items?.some(
      (it: any) => it.listing_id === listingId || it.id === listingId
    )

  const [addToCart] = useAddToCartMutation()
  const [removeFromCart] = useRemoveFromCartMutation()

  const { data: balance, isLoading: _isBalLoading } = useGetBalanceQuery(
    undefined,
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      // pollingInterval: 10_000,
    }
  )
  const { data: listingData } = useGetListingByGiftIdQuery(id!, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    skip: !id,
  })
  const [cancelListing, { isLoading: _isCanceling }] =
    useCancelListingMutation()

  const {
    data: giftData,
    isLoading: _isGiftLoading,
    isError: _isGiftError,
  } = useGetGiftByIdPublicQuery(id!, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    skip: !id,
  })

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

  const [isClosing, setIsClosing] = useState(false)

  const priceContent = useMemo(
    () => (
      <span className={styles.priceRow}>
        <span className={styles.price}>
          {formatAmount(listingData?.price || "")} TON
          {isMarket && (
            <PriceTooltip
              price={Number(formatAmount(listingData?.price || ""))}
            />
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
    const url = `https://t.me/d33sf0mebot/teleportnft?startapp=gift/${gift.id}` //заменить url из .env
    shareURL.ifAvailable(url, `Смотри этот гифт ${gift.tg_name}`)
  }

  const confirmBuy = (opts: { price: number; quantity?: string }) =>
    new Promise<boolean>(resolve => {
      openSheet(
        <ConfirmBuyNftBottomSheet
          nftPrice={Number(formatAmount(String(opts.price)))}
          quantity={opts.quantity ?? "1"}
          onBuy={() => {
            closeSheet()
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

  const handleBuy = async () => {
    setIsClosing(true)
    if (!listingData) return
    try {
      const confirmed = await confirmBuy({
        price: Number(listingData.price),
        quantity: "1",
      })
      if (!confirmed) return

      const isBalanceEnough =
        Number(balance?.available) >= Number(listingData.price)
      if (!isBalanceEnough) {
        openSheet(
          <BalanceTopUpBottomSheet
            onClose={closeAll}
            purchasePrice={Number(listingData.price)}
            availableBalance={formatAmount(balance?.available || "0")}
          />,
          {
            bottomSheetTitle: `${t("top_up_balance")}`,
          }
        )
        return
      }
    } catch (e) {}
  }

  const handleToggleCart = async (listing_id: string) => {
    if (!listing_id) return
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
            <Button
              type="primary"
              size="large"
              onClick={() => {
                closeAll()
                navigate(-1)
              }}
            >
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
    openSheet(
      <SellNftModal
        nfts={Array(nft)}
        onSuccess={() => {
          navigate(-1)
        }}
      />,
      {
        bottomSheetTitle: `${t("sell_nft", "Продажа NFT")}`,
      }
    )
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
          label: "Рыночная цена",
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
            <PriceTooltip
              price={Number(formatAmount(listingData?.price || ""))}
            />
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
          isInCart={listingData?.id ? isInCart(listingData?.id) : false}
          onMainClick={
            isMarket
              ? handleBuy
              : gift.locked
              ? handleWithdrawFromSale
              : handleWithdraw
          }
          onSecondaryClick={
            isMarket && listingData?.id && isInCart(listingData?.id)
              ? handleViewCart
              : handlePutOnSale
          }
          onCartClick={() => handleToggleCart(listingData?.id || "")}
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
        <ValueRow
          label={t("available_balance", "Доступный баланс")}
          value={formatAmount(balance?.available || "0")}
        />
      )}
    </BottomSheet>
  )
}
