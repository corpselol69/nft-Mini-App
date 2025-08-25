import { FC, useEffect, useMemo, useState } from "react"

import styles from "./AddNftsBottomSheet.module.scss"
import { Tabs } from "@/components/common/Tabs/Tabs"
import { t } from "i18next"
import searchIcon from "@/static/icons/searchIcon.svg"

import Icon from "@/components/common/Icon/Icon"
import { Input } from "@/components/common/Input/Input"
import { useGetMyGiftsQuery } from "@/api/endpoints/gifts"
import { Gift } from "@/types/gift"
import { NFTCardSmall } from "@/components/common/NFTCardSmall/NFTCardSmall"
import { Button } from "@/components/common/Button/Button"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { NftPreview } from "@/components/common/NftPreview/NftPreview"

type Props = {
  initiallySelected?: string[]
  onConfirm: (ids: string[]) => void
}

export const AddNftsBottomSheet: FC<Props> = ({
  initiallySelected = [],
  onConfirm,
}) => {
  const { closeSheet } = useBottomSheet()

  const [query, setQuery] = useState("")
  const [selectedIds, setSelectedIds] = useState<string[]>(() => [
    ...initiallySelected,
  ])

  useEffect(() => {
    setSelectedIds([...initiallySelected])
  }, [initiallySelected])

  const { data: myGifts, isLoading, isError } = useGetMyGiftsQuery()

  const filtered: Gift[] = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = myGifts ?? []

    list = list.filter(g => !g.locked)

    if (!q) return list
    return list.filter(g => {
      const title = (g.model?.title ?? "").toLowerCase()
      const idStr = String(g.id).toLowerCase()
      const numStr = String(g.number ?? "").toLowerCase()
      return title.includes(q) || idStr.includes(q) || numStr.includes(q)
    })
  }, [myGifts, query])

  const toggle = (id: string, checked: boolean) => {
    setSelectedIds(prev =>
      checked ? [...new Set([...prev, id])] : prev.filter(x => x !== id)
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* <Tabs type="select" color='secondary' selected={selected} onSelect={setSelected}>
          <Tabs.Tab to="stickers">{t("stickers")}</Tabs.Tab>
          <Tabs.Tab to="gifts">{t("gifts")}</Tabs.Tab>
        </Tabs> */}
        <Input
          icon={<Icon src={searchIcon} />}
          placeholder={t("search_placeholder", "Поиск по названию или ID")}
          className={styles.input}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        {isLoading && (
          <div className={styles.state}>{t("loading", "Загрузка...")}</div>
        )}
        {isError && (
          <div className={styles.state}>
            {t("error_loading", "Не удалось загрузить список")}
          </div>
        )}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className={styles.state}>
            {t("nothing_found", "Ничего не найдено")}
          </div>
        )}

        {!isLoading &&
          !isError &&
          filtered.map(g => {
            const id = String(g.id)
            return (
              <div key={id} className={styles.item}>
                <NFTCardSmall
                  variant="list"
                  preview={
                    <NftPreview
                      background_url={g.background_url}
                      preview_url={g.preview_url}
                    />
                  }
                  title={g.model?.title || `#${g.id}`}
                  subtitle={`#${g.number}`}
                  price={Number(g.price ?? 0)}
                  inStock={true} // можно связать с g.locked, если нужно
                  showCheckbox
                  selected={selectedIds.includes(id)}
                  onSelect={checked => toggle(id, checked)}
                  editablePrice={false} // в этой модалке редакт цены не нужен
                />
              </div>
            )
          })}
      </div>
      <div className={styles.actionButtonsWrapper}>
        <Button type="secondary" size="large" onClick={closeSheet}>
          Отменить
        </Button>
        <Button
          size="large"
          onClick={() => {
            onConfirm([...selectedIds])

            closeSheet()
          }}
          disabled={selectedIds.length === 0}
        >
          Выбрать
        </Button>
      </div>
    </div>
  )
}
