import type { FC } from "react";

import { Page } from "@/components/Page.tsx";

import styles from "./StickerPage.module.scss";

export const StickerPage: FC = () => {
  return (
    <Page back={false}>
      <div className={styles.ios}>Hello iOS</div>
      <div className={styles.android}>Hello Android</div>
    </Page>
  );
};
