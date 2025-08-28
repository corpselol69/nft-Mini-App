import { FC, useMemo, useState } from "react"

import styles from "./EditPriceModal.module.scss"

import { NFTCardSmall } from "@/components/common/NFTCardSmall/NFTCardSmall"
import { Button } from "@/components/common/Button/Button"
import { t } from "i18next"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { useUpdateListingMutation } from "@/api/endpoints/listings"
import { ErrorBottomSheet } from "../ErrorBottomSheet/ErrorBottomSheet"
import { SuccessBottomSheet } from "../SuccessBottomSheet/SuccessBottomSheet"
import { NftPreview } from "@/components/common/NftPreview/NftPreview"
import { ValueRow } from "@/components/common/ValueRow/ValueRow"
import formatAmount, {
  COMMISSION_PERCENT,
  getNetValue,
} from "@/helpers/formatAmount"

type Nft = {
  id: string
  title: string
  number: string
  price: number
  preview: string
  background: string
}

type Props = {
  listingId: string
  nft: Nft
  onSuccess?: () => void
}

export const EditPriceModal: FC<Props> = ({ listingId, nft, onSuccess }) => {
  const { openSheet, closeAll } = useBottomSheet()
  const [updateListing, { isLoading: isUpdating }] = useUpdateListingMutation()

  const [price, setPrice] = useState<number>(nft.price ?? 0)

  const invalid = useMemo(() => {
    return !(price > 0)
  }, [price])

  const payout = useMemo(() => getNetValue(price), [price])

  const handleSubmit = async () => {
    if (invalid || !listingId) return
    try {
      await updateListing({ listingId, data: { price } }).unwrap()
      openSheet(
        <SuccessBottomSheet
          title={t("price_update_success", "Цена успешно изменена")}
          actionButtons={[
            <Button
              type="primary"
              size="large"
              onClick={() => {
                closeAll()
                onSuccess?.()
              }}
            >
              {t("done", "Готово")}
            </Button>,
          ]}
        />,
        { bottomSheetTitle: t("sell_nft") }
      )
    } catch (e) {
      console.error("Ошибка обновления цены", e)
      openSheet(
        <ErrorBottomSheet
          errorTitle={t("price_update_error_title", "Ошибка изменения цены")}
          errorText={t(
            "price_update_error_desc",
            "Не удалось изменить цену. Попробуйте ещё раз."
          )}
        />,
        { bottomSheetTitle: t("error", "Ошибка") }
      )
    }
  }

  return (
    <div className={styles.container}>
      <NFTCardSmall
        key={nft.id}
        variant="list"
        preview={
          <NftPreview
            background_url={nft.background}
            preview_url={nft.preview}
          />
        }
        title={nft.title}
        subtitle={nft.number ? `#${nft.number}` : ""}
        price={price}
        editablePrice
        onPriceChange={val => setPrice(val)}
      />

      <div className={styles.summary}>
        <ValueRow
          label={t("nft_sum", "Сумма NFT")}
          value={formatAmount(String(price))}
        />
        <ValueRow
          label={t("platform_fee", "Комиссия платформы")}
          hint={`(${COMMISSION_PERCENT}%)`}
          value={formatAmount(String(price - payout))}
        />
        <div className={styles.divider} />
        <ValueRow
          className={styles.receiveRow}
          label={t("you_will_receive", "Вы получите")}
          value={formatAmount(String(payout))}
        />
      </div>

      <div className={styles.actionButtonsWrapper}>
        <Button type="secondary" size="large" onClick={() => closeAll()}>
          {t("cancel", "Отмена")}
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          disabled={invalid || isUpdating}
        >
          {t("edit", "Изменить")}
        </Button>
      </div>
    </div>
  )
}
