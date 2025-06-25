import type { FC } from "react";

import { Page } from "@/components/Page.tsx";

import styles from "./GiftPage.module.scss";

export const GiftPage: FC = () => {
  return (
    <Page back={false}>
      <div className={styles.ios}>Hello iOS</div>
      <div className={styles.android}>Hello Android</div>
    </Page>
  );
};
