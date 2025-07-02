import React, { ReactNode, useMemo } from "react"
import { t } from "i18next"
// import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { IGiftItem } from "@/components/GiftsGrid/types"
import bdayImg from "../../../../assets/bday.png"
import styles from "./GiftItemSheet.module.scss"
import { GIFT_ACTIONS } from "../model/const"
import { ActionButton } from "../ui/ActionButton/ActionButton"
import { DetailsTable } from "@/components/common/DetailsTable/DetailsTable"
import tonIcon from "@/static/icons/icn-S_ton.svg"
import { Chip } from "@/components/common/Chip/Chip"
import { QuestionMarkIcon } from "@/components/StickersGrid/ui/NftDetailsTable/QuestionMarkIcon"
import { Tooltip } from "@/components/common/Tooltip/Tooltip"
import { Button } from "@/components/Button/Button"

type Props = {
  gift: IGiftItem
}

export const GiftItemSheet: React.FC<Props> = ({ gift }) => {
  // const { openSheet, closeSheet } = useBottomSheet()

  const priceContent = (
    <span className={styles.priceRow}>
      <span>{gift.price} TON</span>
      <Tooltip
        content={
          <>
            <div className={styles.tooltipWrapper}>
              <div className={styles.tooltipLabel}>Базовая цена</div>
              <div className={styles.tooltipValue}>{gift.price} TON</div>
            </div>
            <div className={styles.tooltipWrapper}>
              <div className={styles.tooltipLabel}>Цена с комиссией</div>
              <div className={styles.tooltipValue}>{gift.price} TON</div>
            </div>
            <div className={styles.tooltipWrapper}>
              <div className={styles.tooltipLabel}>Цена продажи</div>
              <div className={styles.tooltipValue}>{gift.price} TON</div>
            </div>
          </>
        }
      >
        <QuestionMarkIcon />
      </Tooltip>
    </span>
  )

  const rows: { label: string; value: ReactNode }[] = useMemo(
    () => [
      {
        label: "Модель",
        value: (
          <div className={styles.detailTableValueWrapper}>
            <span className={styles.detailTableValueText}>{gift.model}</span>{" "}
            <Chip>1,2%</Chip>
          </div>
        ),
      },
      {
        label: "Символ",
        value: (
          <div className={styles.detailTableValueWrapper}>
            <span className={styles.detailTableValueText}>{gift.symbol}</span>{" "}
            <Chip>0,2%</Chip>
          </div>
        ),
      },
      {
        label: "Фон",
        value: (
          <div className={styles.detailTableValueWrapper}>
            <span className={styles.detailTableValueText}>
              {gift.background}
            </span>{" "}
            <Chip>1,5%</Chip>
          </div>
        ),
      },
      {
        label: "Нижняя цена",
        value: <span>{gift.lowestPrice} TON</span>,
      },
      {
        label: "Цена продажи",
        value: priceContent,
      },
    ],
    []
  )

  return (
    <div className={styles.detailGiftSheet}>
      <div className={styles.detailGiftSheetImageWrapper}>
        <img src={bdayImg} width={210} height={210} />
        <div className={styles.detailGiftSheetImageText}>
          <span className={styles.detailGiftSheetName}>{gift.name}</span>
          <span className={styles.detailGiftSheetSubName}>#{gift.id}</span>
        </div>
      </div>
      <div className={styles.detailGiftSheetActions}>
        {GIFT_ACTIONS.map(el => (
          <ActionButton
            onClick={el.onClick}
            icon={el.icon}
            className={styles.flexItem}
          >
            {el.label}
          </ActionButton>
        ))}
      </div>
      <div>
        <DetailsTable rows={rows} />
      </div>
      <div className={styles.availableBalanceWrapper}>
        <div className={styles.availableBalanceText}>
          <span>{t("available_balance")}</span>
        </div>
        <div className={styles.availableBalanceValue}>
          12,4 <img src={tonIcon} />
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
          <Button type="primary" size="large">
            Купить за {gift.price}
            <img src={tonIcon} />
          </Button>
        </div>
      </div>
    </div>
  )
}
