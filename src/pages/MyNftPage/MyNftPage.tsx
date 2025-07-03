import type { FC } from "react";

import { Page } from "@/components/Page.tsx";

import styles from "./MyNftPage.module.scss";
import { Button } from "@/components/common/Button/Button";

export const MyNftPage: FC = () => {
  return (
    <Page back={false}>
      <Button type="text" style={{ flex: 1 }} size="medium">
        <span className={styles.price}>Button</span>
      </Button>
    </Page>
  );
};
