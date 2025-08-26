import type { FC } from "react"

import styles from "./MyNftPage.module.scss"
import { Button } from "@/components/common/Button/Button"
// import { Tabs, Tab } from "@/components/common/Tabs/Tabs"
import { t } from "i18next"
import { Outlet } from "react-router-dom"
import { AddNftsBottomSheet } from "@/components/Modals/AddNftsBottomSheet/AddNftsBottomSheet"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"

export const MyNftPage: FC = () => {
  const { openSheet } = useBottomSheet()

  const handleSellNft = () => {
    openSheet(<AddNftsBottomSheet onConfirm={() => console.log("d")} />, {
      bottomSheetTitle: t("adding_nfts"),
    })
  }
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>{t("my_nft")}</p>
        <Button onClick={handleSellNft}>{t("buttons.sell_nft")}</Button>
      </div>
      {/* <Tabs>
        <Tab to="/my-nft/stickers">{t("stickers")}</Tab>
        <Tab to="/my-nft/gifts">{t("gifts")}</Tab>
      </Tabs> */}
      <Outlet context={{ isMarket: false }} />
    </div>
  )
}
