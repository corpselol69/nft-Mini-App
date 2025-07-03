import { useMemo, type FC } from "react"

import { BottomSheet } from "../common/BottomSheet/BottomSheet"

import { Button } from "@/components/common/Button/Button"
import { useNavigate, useParams } from "react-router-dom"
import { IGiftItem } from "../GiftsGrid/types"
import { GiftPriceTooltipContent } from "@/pages/GiftPage/ui/GiftPriceTooltipContent/GiftPriceTooltipContent"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { Tooltip } from "@/components/common/Tooltip/Tooltip"
import { QuestionMarkIcon } from "../StickersGrid/ui/NftDetailsTable/QuestionMarkIcon"
import bdayImg from "@/static/placeholders/bday.png"
import tonIcon from "@/static/icons/icn-S_ton.svg"

import styles from "./GiftModal.module.scss"
import { GIFT_ACTIONS } from "@/pages/GiftPage/model/const"
import { ActionButton } from "@/pages/GiftPage/ui/ActionButton/ActionButton"
import { GiftDetailsRows } from "@/pages/GiftPage/ui/GiftDetailsRows/GiftDetailsRows"
import { GiftImageWithText } from "@/pages/GiftPage/ui/GiftImageWithText/GiftImageWithText"
import { t } from "i18next"
import { BuyNftBottomSheet } from "../BuyNftBottomSheet/BuyNftBottomSheet"

type Props = {
  gift: IGiftItem
}

export const GiftModal: FC<Props> = ({ gift }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

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
    <BottomSheet open={true} onClose={() => navigate(-1)}>
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
    </BottomSheet>
  )
}
