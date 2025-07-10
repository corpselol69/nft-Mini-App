import type { FC } from "react"
import styles from "./ReferralList.module.scss"
import { Avatar } from "../common/Avatar/Avatar"

interface Invite {
  id: number
  name: string
  purchases: number
  earned: string
}

interface ReferralListProps {
  invites: Invite[]
  totalCount: number
}

export const ReferralList: FC<ReferralListProps> = ({
  invites,
  totalCount,
}) => {
  return (
    <div className={styles.referralList}>
      <div className={styles.header}>
        <span className={styles.title}>Рефералы</span>
        <span className={styles.count}>{totalCount} чел.</span>
      </div>
      <div className={styles.listContainer}>
        {invites.map((invite, index) => (
          <div key={invite.id}>
            <div className={styles.inviteItem}>
              <div className={styles.userInfo}>
                <Avatar className={styles.avatar} />
                <span className={styles.username}>@{invite.name}</span>
              </div>
              <div className={styles.stats}>
                <div className={styles.purchases}>
                  {invite.purchases} покуп
                  {invite.purchases === 1
                    ? "ка"
                    : invite.purchases < 5
                    ? "ки"
                    : "ок"}
                </div>
                <div className={styles.earned}>+ {invite.earned}</div>
              </div>
            </div>
            {index < invites.length - 1 && (
              <div className={styles.separator}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
