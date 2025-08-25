import { retrieveRawInitData } from "@telegram-apps/bridge"
import axios from "axios"

type TokenBundle = { access_token: string; expires_in: number }
const ACCESS = "access_token"
const EXP = "expires_at"

export const tokenStorage = {
  save({ access_token, expires_in }: TokenBundle) {
    const expires_at = Date.now() + expires_in * 1000
    localStorage.setItem(ACCESS, access_token)
    localStorage.setItem(EXP, String(expires_at))
  },
  load() {
    const access_token = localStorage.getItem(ACCESS) || ""
    const expires_at = Number(localStorage.getItem(EXP) || 0)
    return { access_token, expires_at }
  },
  clear() {
    localStorage.removeItem(ACCESS)
    localStorage.removeItem(EXP)
  },
}

let accessToken: string | null = null

export const setAccessToken = (token: string | null) => {
  accessToken = token
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete apiClient.defaults.headers.common.Authorization
  }
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 100_000,
  headers: {
    "Content-Type": "application/json",
  },
})

{
  const { access_token } = tokenStorage.load()
  if (access_token) setAccessToken(access_token)
}

let reloginPromise: Promise<string | null> | null = null
async function silentRelogin(): Promise<string | null> {
  if (reloginPromise) return reloginPromise
  reloginPromise = (async () => {
    try {
      const init_data = retrieveRawInitData()
      if (!init_data) return null

      // используем тот же apiClient, но без авторизации
      const res = await axios.post<TokenBundle>(
        `${import.meta.env.VITE_API_URL}auth/login/webapp`,
        { init_data },
        { headers: { "Content-Type": "application/json" } }
      )

      const tokenData = res.data
      tokenStorage.save(tokenData)
      setAccessToken(tokenData.access_token)
      return tokenData.access_token
    } catch {
      tokenStorage.clear()
      setAccessToken(null)
      return null
    } finally {
      reloginPromise = null
    }
  })()
  return reloginPromise
}

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

let isRefreshing = false
let waiters: Array<(t: string | null) => void> = []
const subscribe = (cb: (t: string | null) => void) => waiters.push(cb)
const publish = (t: string | null) => {
  waiters.splice(0).forEach(cb => cb(t))
}

// Интерцептор ответа — лог ошибок
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const status = error?.response?.status
    const original = error?.config

    if (status !== 401 || !original || original._retried) {
      console.error("API Error:", {
        message: error.message,
        status,
        url: error?.config?.url,
      })
      return Promise.reject(error)
    }

    original._retried = true

    if (isRefreshing) {
      // ждём, пока другой запрос обновит токен
      return new Promise((resolve, reject) => {
        subscribe(t => {
          if (!t) return reject(error)
          original.headers.Authorization = `Bearer ${t}`
          resolve(apiClient(original))
        })
      })
    }

    isRefreshing = true
    try {
      const newToken = await silentRelogin()
      publish(newToken)
      if (!newToken) throw error
      original.headers.Authorization = `Bearer ${newToken}`
      return apiClient(original) // ретрай исходного запроса
    } finally {
      isRefreshing = false
    }
  }
)

export default apiClient
