import { type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./GiftsCollectionGrid.module.scss"
import searchIcon from "@/static/icons/searchIcon.svg"
import { Input } from "../common/Input/Input"
import Icon from "../common/Icon/Icon"
import { mockGiftCards } from "./const"
import { GiftCollectionCard } from "./GiftCollectionCard/GiftCollectionCard"
import { IGiftsCollectionGridProps } from "./GiftsCollectionGrid.d"
import { t } from "i18next"
import { Tabs, Tab } from "../common/Tabs/Tabs"
import { useOutletContext } from "react-router-dom"

export const GiftsCollectionGrid: FC<IGiftsCollectionGridProps> = () => {
  const { isMarket } = useOutletContext<{ isMarket: boolean }>()

  const link = isMarket ? "/market" : "/my-nft"
  return (
    <Page back={false}>
      <div>
        {isMarket && (
          <div className={styles.filterWrapper}>
            <Input
              icon={<Icon src={searchIcon} />}
              placeholder="Поиск по названию или ID"
            />
          </div>
        )}

        {!isMarket && (
          <Tabs>
            <Tab to="all">{t("all")}</Tab>
            <Tab to="not-for-sale">{t("not_for_sale")}</Tab>
            <Tab to="for-sale">{t("for_sale")}</Tab>
          </Tabs>
        )}

        <div className={styles.grid}>
          {mockGiftCards.map(nft => (
            <GiftCollectionCard key={nft.id} item={nft} link={link} />
          ))}
        </div>
      </div>
    </Page>
  )
}
