export type TransactionType = 'buy' | 'sell' | 'topup' | 'bonus' | 'withdraw';

export interface Transaction {
	id: string;
	type: TransactionType;
	description: string;
	amount: number;
	timestamp: string;
	status?: 'completed' | 'pending' | 'failed';
}

export interface TransactionGroup {
	date: string;
	transactions: Transaction[];
}

export interface TransactionHistoryProps {
	groups: TransactionGroup[];
	loading?: boolean;
	onTransactionClick?: (transaction: Transaction) => void;
}
