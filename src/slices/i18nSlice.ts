import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface I18nState {
  language: string
  supportedLanguages: string[]
}

const initialState: I18nState = {
  language: "ru",
  supportedLanguages: ["ru", "en"],
}

export const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = i18nSlice.actions
