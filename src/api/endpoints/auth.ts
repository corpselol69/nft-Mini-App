import api from "@/api/apiClient"
import type { TelegramWebAppLoginPayload, Token } from "@/types/auth"

const endpoint = "/auth/"

const login = async (data: TelegramWebAppLoginPayload) => {
  const response = await api.post<Token>(`${endpoint}login/webapp`, data)
  return response.data
}

const getMe = async () => {
  const response = await api.get(`${endpoint}me`)
  return response.data
}

export const authAPI = {
  login,
  getMe,
}

export default authAPI
