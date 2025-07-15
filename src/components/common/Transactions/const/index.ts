import { TransactionType } from "../TransactionsBlock/index"

export const TRANSACTION_GROUP_CONFIG: Record<
  TransactionType,
  {
    colorClass: string
    sign: string
  }
> = {
  buy: { colorClass: "pending", sign: "-" },
  sell: { colorClass: "positive", sign: "+" },
  deposit: { colorClass: "positive", sign: "+" },
  bonus: { colorClass: "positive", sign: "+" },
  withdraw: { colorClass: "negative", sign: "-" },
}
