import { useCallback, type FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./GiftsGrid.module.scss"
import { SearchIcon } from "../common/icons/SearchIcon"
import { Input } from "../common/Input/Input"
import { Grid } from "./Grid"
import { useNavigate } from "react-router-dom"

export const GiftsGrid: FC = () => {
  const navigate = useNavigate()

  const handleCategoryClick = useCallback(
    (id: string) => navigate(`/gifts/${id}`),
    []
  )

  return (
    <Page back={false}>
      <div>
        <div className={styles.filterWrapper}>
          <Input icon={<SearchIcon />} placeholder="Поиск по названию или ID" />
        </div>
        <Grid onGiftCategoryClick={({ id }) => handleCategoryClick(id)} />
      </div>
    </Page>
  )
}
