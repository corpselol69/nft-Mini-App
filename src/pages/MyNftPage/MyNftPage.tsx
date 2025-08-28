import type { FC } from "react"

import styles from "./MyNftPage.module.scss"
import { Button } from "@/components/common/Button/Button"
// import { Tabs, Tab } from "@/components/common/Tabs/Tabs"
import { t } from "i18next"
import { Outlet } from "react-router-dom"
import { AddNftsBottomSheet } from "@/components/Modals/AddNftsBottomSheet/AddNftsBottomSheet"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { SellNftModal } from "@/components/Modals/SellNftModal/SellNftModal"
import { useGetMyGiftsQuery } from "@/api/endpoints/gifts"

export const MyNftPage: FC = () => {
  const { openSheet, closeAll } = useBottomSheet()

  const { data: myGifts } = useGetMyGiftsQuery()

  const handleAddNft = () => {
    openSheet(
      <AddNftsBottomSheet onConfirm={nftsIds => handleSellNft(nftsIds)} />,
      {
        bottomSheetTitle: t("adding_nfts"),
      }
    )
  }

  const handleSellNft = (nftsIds: string[]) => {
    if (!myGifts) return

    const selectedGifts = myGifts
      .filter(gift => nftsIds.includes(gift.id))
      .map(gift => ({
        id: gift.id,
        title: gift.model?.title ?? "",
        number: gift.number ? String(gift.number) : "",
        price: gift.price || 0.1,
        preview: gift.preview_url ?? "",
        background: gift.background_url ?? "",
      }))

    if (!selectedGifts.length) return
    console.log("nft1sIds", selectedGifts)

    closeAll() // закрыть AddNftsBottomSheet
    setTimeout(() => {
      openSheet(<SellNftModal nfts={selectedGifts} onSuccess={() => {}} />, {
        bottomSheetTitle: t("sell_nft", "Продажа NFT"),
      })
    }, 0)
  }
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>{t("my_nft")}</p>
        <Button onClick={handleAddNft}>{t("buttons.sell_nft")}</Button>
      </div>
      {/* <Tabs>
        <Tab to="/my-nft/stickers">{t("stickers")}</Tab>
        <Tab to="/my-nft/gifts">{t("gifts")}</Tab>
      </Tabs> */}
      <Outlet context={{ isMarket: false }} />
    </div>
  )
}
