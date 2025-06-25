import type { FC } from "react";

import { Page } from "@/components/Page.tsx";

import styles from "./MyNftPage.module.scss";

export const MyNftPage: FC = () => {
  return (
    <Page back={false}>
      <div className={styles.ios}>Hello dвсiOS</div>
      <div className={styles.android}>Hello Android</div>
    </Page>
  );
};
