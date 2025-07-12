import { TransactionType } from '../types';

export const TRANSACTION_GROUP_CONFIG: Record<TransactionType, {
	colorClass: string, sign: string
}> = {
	buy: { colorClass: 'pending', sign: '-' },
	sell: { colorClass: 'positive', sign: '+' },
	topup: { colorClass: 'positive', sign: '+' },
	bonus: { colorClass: 'positive', sign: '+' },
	withdraw: { colorClass: 'negative', sign: '-' },
}

export const MONTHS_RU = ['ЯНВАРЯ', 'ФЕВРАЛЯ', 'МАРТА', 'АПРЕЛЯ', 'МАЯ', 'ИЮНЯ',
	'ИЮЛЯ', 'АВГУСТА', 'СЕНТЯБРЯ', 'ОКТЯБРЯ', 'НОЯБРЯ', 'ДЕКАБРЯ']