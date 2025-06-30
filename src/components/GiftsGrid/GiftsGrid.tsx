import type { FC } from "react"

import { Page } from "@/components/Page.tsx"

import styles from "./GiftsGrid.module.scss"
import { SearchIcon } from "../common/icons/SearchIcon"
import { Input } from "../common/Input/Input"
import { Grid } from "./Grid"

export const GiftsGrid: FC = () => {
  return (
    <Page back={false}>
      <div>
        <div className={styles.filterWrapper}>
          <Input icon={<SearchIcon />} placeholder="Поиск по названию или ID" />
        </div>
        <Grid onElementClick={() => {}} />
      </div>
    </Page>
  )
}
