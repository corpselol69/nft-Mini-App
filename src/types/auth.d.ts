export interface Token {
  access_token: string
  token_type?: string // default "bearer"
  expires_in: number
}

export interface AuthLoginPayload {
  username: string
  password: string
  grant_type?: string
  scope?: string
  client_id?: string
  client_secret?: string
}

export interface TelegramWebAppLoginPayload {
  init_data: string
}
