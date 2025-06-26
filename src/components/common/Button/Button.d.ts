import { ReactNode } from 'react';
import { ButtonHTMLAttributes } from 'react';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: 'primary' | 'secondary'
	size: 'large' | 'medium' | 'small'
	fullWidth?: boolean
	iconLeft?: ReactNode
	iconRight?: ReactNode
	iconOnly?: ReactNode
	loading?: boolean
}