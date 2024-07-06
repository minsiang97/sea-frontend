export interface TransactionHistoryData {
  description: string;
  type: string;
  amount: number;
  _id: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TransactionHistoryResponse {
  message: string;
  data: TransactionHistoryData[];
  total: number;
}

export enum TransactionType {
  debit = 'Debit',
  credit = 'Credit',
}
