import { TransactionType } from "@/types/transaction"

export const TRANSACTION_GROUP_CONFIG: Record<
  TransactionType,
  {
    colorClass: string
    sign: string
  }
> = {
  purchase: { colorClass: "pending", sign: "-" },
  sale: { colorClass: "positive", sign: "+" },
  deposit: { colorClass: "positive", sign: "+" },
  bonus: { colorClass: "positive", sign: "+" },
  withdraw: { colorClass: "negative", sign: "-" },
}
