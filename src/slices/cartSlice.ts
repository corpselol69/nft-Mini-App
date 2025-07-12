import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
  id: string
  title: string
  number: string
  price: number
  oldPrice?: number
  inStock: boolean
  selected: boolean
  isDeleting?: boolean
}

interface CartState {
  items: CartItem[]
  deletingId: string | null
}

const initialState: CartState = {
  items: [],
  deletingId: null,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload
    },
    toggleSelectItem(
      state,
      action: PayloadAction<{ id: string; selected: boolean }>
    ) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) item.selected = action.payload.selected
    },
    selectAll(state, action: PayloadAction<boolean>) {
      state.items = state.items.map(item =>
        item.inStock ? { ...item, selected: action.payload } : item
      )
    },
    setItemDeleting(
      state,
      action: PayloadAction<{ id: string; isDeleting: boolean }>
    ) {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) {
        item.isDeleting = action.payload.isDeleting
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    restoreItem(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload)
      if (item) item.isDeleting = false
    },
    clearCart(state) {
      state.items = []
      state.deletingId = null
    },
  },
})

export const {
  setCartItems,
  toggleSelectItem,
  selectAll,
  removeItem,
  setItemDeleting,
  restoreItem,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
