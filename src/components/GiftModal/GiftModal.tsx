import { useCallback, useMemo, useState, type FC } from "react"

import { BottomSheet } from "../common/BottomSheet/BottomSheet"

import { Button } from "@/components/common/Button/Button"
import { useNavigate, useParams } from "react-router-dom"
import { GiftPriceTooltipContent } from "@/pages/GiftPage/ui/GiftPriceTooltipContent/GiftPriceTooltipContent"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { Tooltip } from "@/components/common/Tooltip/Tooltip"
import { QuestionMarkIcon } from "../StickersGrid/ui/NftDetailsTable/QuestionMarkIcon"
import bdayImg from "@/static/placeholders/bday.png"
import tonIcon from "@/static/icons/icn-S_ton.svg"

import { GiftDetailsRows } from "@/pages/GiftPage/ui/GiftDetailsRows/GiftDetailsRows"
import { GiftImageWithText } from "@/pages/GiftPage/ui/GiftImageWithText/GiftImageWithText"
import { t } from "i18next"
import { BuyNftBottomSheet } from "../BuyNftBottomSheet/BuyNftBottomSheet"
import Icon from "../common/Icon/Icon"
import telegramIcon from "@/static/icons/telegramIcon.svg"
import statusIcon from "@/static/icons/statusIcon.svg"
import shareIcon from "@/static/icons/shareIcon.svg"
import { openTelegramLink, setEmojiStatus, shareURL } from "@telegram-apps/sdk"

import styles from "./GiftModal.module.scss"

const gift = {
  id: "gift1",
  name: "Bored Monkey",
  imgLink: "/assets/gifts/monkey.png",
  price: "150",
  model: "2024A",
  symbol: "🙈",
  background: "#ffe480",
  lowestPrice: "120",
  sellPrice: "160",
}

export const GiftModal: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [open, setOpen] = useState(true)

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

  const showEmodjiStatus = async () => {
    openTelegramLink.ifAvailable("https://t.me/nft/HypnoLollipop-18289") //сюда айди эмоджи
  }

  const setEmodjiStatus = async () => {
    if (setEmojiStatus.isAvailable()) {
      await setEmojiStatus("5361800828313167608") //сюда айди эмоджи
    }
  }

  const shareEmodjiStatus = async () => {
    const url = `https://t.me/d33sf0mebot/mytest/#/market/stickers/${id}` //заменить url из .env
    shareURL.ifAvailable(url, `Смотри этот гифт #${id}`)
  }

  const handleCloseGiftModal = useCallback(() => {
    navigate(-1)
    setOpen(false)
  }, [])

  return (
    <BottomSheet open={open} onClose={handleCloseGiftModal}>
      <div className={styles.detailGiftSheet}>
        <GiftImageWithText imgSrc={bdayImg} name={gift.name} id={gift.id} />

        <div className={styles.detailGiftSheetActions}>
          <Button type="vertical" size="large" onClick={showEmodjiStatus}>
            <Icon src={telegramIcon} className={styles.actionIcon} />
            Посмотреть
          </Button>
          <Button type="vertical" size="large" onClick={setEmodjiStatus}>
            <Icon src={statusIcon} className={styles.actionIcon} />
            Статус
          </Button>
          <Button type="vertical" size="large" onClick={shareEmodjiStatus}>
            <Icon src={shareIcon} className={styles.actionIcon} />
            Поделиться
          </Button>
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
              onClick={() => {
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
                handleCloseGiftModal()
              }}
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
