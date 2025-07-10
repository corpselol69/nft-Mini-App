export interface SnackbarData {
  id: string
  title: string
  description?: string
  autoHide?: boolean
  duration?: number
}

export interface SnackbarProps extends SnackbarData {
  onClose?: () => void
  isRemoving?: boolean
}

export interface SnackbarContainerProps {
  snackbars: SnackbarData[]
  onRemove: (id: string) => void
}
