import Icon from "@/components/common/Icon/Icon"
import telegramIcon from "@/static/icons/telegramIcon.svg"
import statusIcon from "@/static/icons/statusIcon.svg"
import shareIcon from "@/static/icons/shareIcon.svg"

export const GIFT_ACTIONS = [
  {
    icon: <Icon src={telegramIcon} />,
    label: "Посмотреть",
    onClick: () => {
      alert("Посмотреть")
    },
  },
  {
    icon: <Icon src={statusIcon} />,
    label: "Статус",
    onClick: () => {
      alert("Статус")
    },
  },
  {
    icon: <Icon src={shareIcon} />,
    label: "Поделиться",
    onClick: () => {
      alert("Поделиться")
    },
  },
]
