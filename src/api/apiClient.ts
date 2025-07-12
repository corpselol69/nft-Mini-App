import axios from "axios"

let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
  accessToken = token
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 100_000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Интерцептор запроса — добавление токена авторизации
apiClient.interceptors.request.use(
  config => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Интерцептор ответа — лог ошибок
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", {
      message: error.message,
      status: error?.response?.status,
      url: error?.config?.url,
    })
    return Promise.reject(error)
  }
)

export default apiClient
