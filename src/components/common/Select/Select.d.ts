import { ReactNode } from 'react';
import { SelectHTMLAttributes } from 'react';

export interface ISelectOption {
	value: string
	label: string
	disabled?: boolean
}

export interface ISelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
	options: ISelectOption[]
	placeholder?: string
	label?: string
	error?: string
	className?: string
	defaultValue?: string
	onChange: (value: string) => void
}