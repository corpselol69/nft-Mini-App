import { ShareIcon } from "@/static/icons/ShareIcon"
import { StatusIcon } from "@/static/icons/StatusIcon"
import { TelegramIcon } from "@/static/icons/TelegramIcon"

export const GIFT_ACTIONS = [
  {
    icon: <TelegramIcon />,
    label: "Посмотреть",
    onClick: () => {
      alert("Посмотреть")
    },
  },
  {
    icon: <StatusIcon />,
    label: "Статус",
    onClick: () => {
      alert("Статус")
    },
  },
  {
    icon: <ShareIcon />,
    label: "Поделиться",
    onClick: () => {
      alert("Поделиться")
    },
  },
]
