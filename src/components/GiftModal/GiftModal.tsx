import { useMemo, type FC } from "react"

import { BottomSheet } from "../common/BottomSheet/BottomSheet"

import { Button } from "@/components/common/Button/Button"
import { useNavigate, useParams } from "react-router-dom"
import { PriceTooltip } from "@/components/common/PriceTooltip/PriceTooltip"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"

import bdayImg from "@/static/placeholders/bday.png"
import tonIcon from "@/static/icons/icn-S_ton.svg"

import { GiftImageWithText } from "@/pages/GiftPage/ui/GiftImageWithText/GiftImageWithText"
import { t } from "i18next"
import { BuyNftBottomSheet } from "../BuyNftBottomSheet/BuyNftBottomSheet"
import Icon from "../common/Icon/Icon"
import telegramIcon from "@/static/icons/telegramIcon.svg"
import statusIcon from "@/static/icons/statusIcon.svg"
import shareIcon from "@/static/icons/shareIcon.svg"
import { openTelegramLink, setEmojiStatus, shareURL } from "@telegram-apps/sdk"

import styles from "./GiftModal.module.scss"
import { Chip } from "@/components/common/Chip/Chip"
import { DetailsTable } from "../common/DetailsTable/DetailsTable"

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

  const { openSheet, closeAll } = useBottomSheet()

  const priceContent = useMemo(
    () => (
      <span className={styles.priceRow}>
        <span>{gift.price} TON</span>
        <PriceTooltip price={gift.price} />
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

  const rows = useMemo(() => {
    return [
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
      { label: "Нижняя цена", value: `${gift.lowestPrice} TON` },
      { label: "Цена", value: priceContent },
    ]
  }, [])

  return (
    <BottomSheet open={true} onClose={() => navigate(-1)}>
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

        <DetailsTable rows={rows} />

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
