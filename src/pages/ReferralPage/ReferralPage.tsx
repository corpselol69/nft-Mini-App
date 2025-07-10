import type { FC } from "react"
import { useState } from "react"
import { ReferralLink } from "@/components/ReferralPage/ReferralLink"
import { ReferralList } from "@/components/ReferralPage/ReferralList"
import styles from "./ReferralPage.module.scss"
import { ReferralHeader } from "@/components/ReferralPage/ReferralHeader"
import { SnackbarContainer } from "@/components/common/Snackbar"
import type { SnackbarData } from "@/components/common/Snackbar"

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
  const [snackbars, setSnackbars] = useState<SnackbarData[]>([])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mockData.referralLink)

    const newSnackbar: SnackbarData = {
      id: Date.now().toString(),
      title: "Реферальная ссылка скопирована",
      autoHide: true,
      duration: 5000,
    }

    setSnackbars(prev => [...prev, newSnackbar])
  }

  const handleRemoveSnackbar = (id: string) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id))
  }

  return (
    <div className={styles.referralPage}>
      <h1 className={styles.title}>Реферальная система</h1>
      <SnackbarContainer
        snackbars={snackbars}
        onRemove={handleRemoveSnackbar}
      />

      <ReferralHeader
        totalEarned={"12.4"}
        description={"Вы зарабатываете 1,5% с комиссии ваших рефералов"}
      />
      <ReferralLink link={mockData.referralLink} onCopy={handleCopyLink} />

      <ReferralList invites={mockData.invites} totalCount={3} />
    </div>
  )
}
