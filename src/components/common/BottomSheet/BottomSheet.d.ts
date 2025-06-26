import { PropsWithChildren } from 'react'

export interface IBottomSheetProps extends PropsWithChildren {
	open: boolean
	onClose: () => void
}