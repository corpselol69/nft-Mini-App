import React, { useMemo } from "react"
import { t } from "i18next"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { IGiftItem } from "@/components/GiftsGrid/types"
import bdayImg from "@/static/placeholders/bday.png"
import styles from "./GiftItemSheet.module.scss"
import { GIFT_ACTIONS } from "../model/const"
import { ActionButton } from "../ui/ActionButton/ActionButton"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import { Tooltip } from "@/components/common/Tooltip/Tooltip"
import { QuestionMarkIcon } from "@/components/StickersGrid/ui/NftDetailsTable/QuestionMarkIcon"
import { GiftPriceTooltipContent } from "../ui/GiftPriceTooltipContent/GiftPriceTooltipContent"
import { GiftImageWithText } from "../ui/GiftImageWithText/GiftImageWithText"
import { GiftDetailsRows } from "../ui/GiftDetailsRows/GiftDetailsRows"
import { Button } from "@/components/common/Button/Button"
import { BuyNftBottomSheet } from "@/components/BuyNftBottomSheet/BuyNftBottomSheet"

type Props = {
  gift: IGiftItem
}

export const GiftItemSheet: React.FC<Props> = ({ gift }) => {
  const { openSheet, closeAll } = useBottomSheet()

  const priceContent = useMemo(
    () => (
      <span className={styles.priceRow}>
        <span>{gift.price} TON</span>
        <Tooltip content={<GiftPriceTooltipContent price={gift.price} />}>
          <QuestionMarkIcon />
        </Tooltip>
      </span>
    ),
    [gift.price]
  )

  return (
    <div className={styles.detailGiftSheet}>
      <GiftImageWithText imgSrc={bdayImg} name={gift.name} id={gift.id} />

      <div className={styles.detailGiftSheetActions}>
        {GIFT_ACTIONS.map(el => (
          <ActionButton
            key={el.label}
            onClick={el.onClick}
            icon={el.icon}
            className={styles.flexItem}
          >
            {el.label}
          </ActionButton>
        ))}
      </div>

      <GiftDetailsRows gift={gift} priceContent={priceContent} />

      <div className={styles.availableBalanceWrapper}>
        <div className={styles.availableBalanceText}>
          <span>{t("available_balance")}</span>
        </div>
        <div className={styles.availableBalanceValue}>
          12,4 <img src={tonIcon} alt="TON" />
        </div>
      </div>

      <div className={styles.actionButtonsWrapper}>
        <div>
          <Button
            type="secondary"
            size="large"
            className={styles.mainCartButton}
          >
            <span className={styles.cartButtonText}>Добавить в корзину</span>
          </Button>
        </div>
        <div className={styles.buyButtonWrapper}>
          <Button
            type="primary"
            size="large"
            onClick={() =>
              openSheet(
                <BuyNftBottomSheet
                  nftPrice={gift.price}
                  onBuy={() => {}}
                  onCancel={closeAll}
                  quantity="1"
                />,
                {
                  renderLeftHeader() {
                    return (
                      <span className={styles.bottomSheetTitle}>
                        Покупка NFT
                      </span>
                    )
                  },
                }
              )
            }
          >
            Купить за {gift.price}
            <img src={tonIcon} alt="TON" />
          </Button>
        </div>
      </div>
    </div>
  )
}
