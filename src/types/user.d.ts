export interface User {
  id: string
  telegram_id: number
  is_bot: boolean
  created_at: string
  updated_at: string
  active: boolean
  username?: string | null
  locale?: string | null
}

export interface UserUpdate {
  username?: string | null
  locale?: string | null
}

export interface TelegramInitData {
  hash: string
  raw_data: string
}
