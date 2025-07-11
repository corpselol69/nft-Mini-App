import { LOCAL_STORAGE_KEYS } from "@/helpers/localStorageKeys"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const getInitialLanguage = (): string => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE)
  return saved || "ru"
}
interface I18nState {
  language: string
  supportedLanguages: string[]
}

const initialState: I18nState = {
  language: getInitialLanguage(),
  supportedLanguages: ["ru", "en"],
}

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
      localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, action.payload)
    },
  },
})

export const { setLanguage } = i18nSlice.actions
