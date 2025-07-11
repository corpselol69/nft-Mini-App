import api from "@/api/apiClient"

const endpoint = "/ping"

const ping = async () => {
  const response = await api.get(endpoint)
  return response.data
}

export const pingAPI = {
  ping,
}

export default pingAPI
