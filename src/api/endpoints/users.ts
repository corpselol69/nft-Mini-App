import api from "@/api/apiClient"
import { TelegramInitData, UserUpdate } from "@/types/user"
import { User } from "@telegram-apps/sdk"

const endpoint = "/users/"

const onboardUser = async (init: TelegramInitData) => {
  const response = await api.post(`${endpoint}onboard`, init)
  return response.data
}

const getMe = async () => {
  const response = await api.get<User>(`${endpoint}me`)
  return response.data
}

const updateMe = async (payload: UserUpdate) => {
  const response = await api.patch(`${endpoint}me`, payload)
  return response.data
}

const getUser = async (userId: string) => {
  const response = await api.get<User>(`${endpoint}${userId}`)
  return response.data
}

const updateUser = async (userId: string, payload: UserUpdate) => {
  const response = await api.patch(`${endpoint}${userId}`, payload)
  return response.data
}

const deleteUser = async (userId: string) => {
  await api.delete(`${endpoint}${userId}`)
}

const listUsers = async (offset = 0, limit = 50) => {
  const response = await api.get<User[]>(endpoint, {
    params: { offset, limit },
  })
  return response.data
}

export const usersAPI = {
  onboardUser,
  getMe,
  updateMe,
  getUser,
  updateUser,
  deleteUser,
  listUsers,
}

export default usersAPI
