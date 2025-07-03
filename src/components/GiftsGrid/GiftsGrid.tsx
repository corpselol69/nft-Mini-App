import { useCallback, type FC } from "react";

import { Page } from "@/components/Page.tsx";

import styles from "./GiftsGrid.module.scss";
import searchIcon from "@/static/icons/searchIcon.svg";
import { Input } from "../common/Input/Input";
import { Grid } from "./Grid";
import Icon from "../common/Icon/Icon";

export const GiftsGrid: FC = () => {
  return (
    <Page back={false}>
      <div>
        <div className={styles.filterWrapper}>
          <Input
            icon={<Icon src={searchIcon} />}
            placeholder="Поиск по названию или ID"
          />
        </div>

        <Grid />
      </div>
    </Page>
  );
};
