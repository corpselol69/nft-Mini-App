import type { FC } from "react"
import { ReferralLink } from "@/components/ReferralPage/ReferralLink"
import { ReferralList } from "@/components/ReferralPage/ReferralList"
import styles from "./ReferralPage.module.scss"
import { ReferralHeader } from "@/components/ReferralPage/ReferralHeader"

import { Page } from "@/components/Page"
import { useAppDispatch } from "@/hooks/useRedux"
import { addSnackbar } from "@/slices/snackbarSlice"

const mockData = {
  referralLink: "t.me/bot238757=ref17349619",
  stats: {
    totalEarned: "500 TON",
    totalInvites: 10,
  },
  invites: [
    { id: 1, name: "User1", purchases: 3, earned: "50 TON" },
    { id: 2, name: "User2", purchases: 2, earned: "30 TON" },
    { id: 3, name: "User3", purchases: 1, earned: "20 TON" },
  ],
}

export const ReferralPage: FC = () => {
  const dispatch = useAppDispatch()

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mockData.referralLink)

    dispatch(
      addSnackbar({
        title: "Реферальная ссылка скопирована",
        autoHide: true,
        duration: 5000,
      })
    )
  }

  return (
    <Page back>
      <div className={styles.referralPage}>
        <h1 className={styles.title}>Реферальная система</h1>

        <ReferralHeader
          totalEarned={"12.4"}
          description={"Вы зарабатываете 1,5% с комиссии ваших рефералов"}
        />
        <ReferralLink link={mockData.referralLink} onCopy={handleCopyLink} />

        <ReferralList invites={mockData.invites} totalCount={3} />
      </div>
    </Page>
  )
}
