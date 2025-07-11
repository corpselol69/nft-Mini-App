import axios from "axios"

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
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
