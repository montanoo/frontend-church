export interface IFinanceTransaction {
  id?: number;
  transactionType: string;
  amount: number;
  description: string;
  transactionDate: string;
  category: string;
}
