import { ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'right' | 'left'

export interface ITooltipProps {
	content: ReactNode
	children: ReactNode
	offset?: number
	prefer?: TooltipPosition
	className?: string
}