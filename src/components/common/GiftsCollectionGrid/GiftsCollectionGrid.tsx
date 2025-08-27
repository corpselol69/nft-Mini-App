import { useMemo, useState, type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./GiftsCollectionGrid.module.scss"
import searchIcon from "@/static/icons/searchIcon.svg"
import { Input } from "@/components/common/Input/Input"
import Icon from "@/components/common/Icon/Icon"
import { GiftCollectionCard } from "./GiftCollectionCard/GiftCollectionCard"
import { IGiftsCollectionGridProps } from "./GiftsCollectionGrid.d"
import { t } from "i18next"
import { useGetMarketListQuery } from "@/api/endpoints/market"

export const GiftsCollectionGrid: FC<IGiftsCollectionGridProps> = () => {
  const [search, setSearch] = useState("")

  const { data, isLoading, isError, refetch } = useGetMarketListQuery(
    {
      offset: 0,
      limit: 1000,
      sort: "newest",
    },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true,
    }
  )

  const handleSearch = (value: string) => setSearch(value)

  const filtered = useMemo(() => {
    if (!data) return []
    const q = search.trim().toLowerCase()
    if (!q) return data
    return data.filter(col => {
      const nameMatch = String((col as any).model_name ?? "")
        .toLowerCase()
        .includes(q)
      return nameMatch
    })
  }, [data, search])

  return (
    <Page back={false}>
      <div>
        <div className={styles.filterWrapper}>
          <Input
            icon={<Icon src={searchIcon} />}
            placeholder={t("search.placeholder", "Поиск по названию или ID")}
            value={search}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>

        {isLoading && (
          <div className={styles.state}>{t("common.loading", "Загрузка…")}</div>
        )}

        {isError && (
          <div className={styles.state}>
            {t("common.error", "Ошибка загрузки")}
            <button className={styles.retryBtn} onClick={() => refetch()}>
              {t("common.retry", "Повторить")}
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {filtered.length === 0 ? (
              <div className={styles.state}>
                {t("common.empty", "Ничего не найдено")}
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map(col => (
                  <GiftCollectionCard
                    key={(col as any).id}
                    item={col as any}
                    link={"market"}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Page>
  )
}
