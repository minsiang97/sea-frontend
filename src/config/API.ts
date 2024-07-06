interface APIRoute {
  LOGIN: string;
  REFRESH: string;
  TRANSACTION_HISTORY: string;
  TRANSACTION_DETAIL: string;
}

export const API: APIRoute = {
  LOGIN: '/user/login',
  REFRESH: '/user/refresh',
  TRANSACTION_HISTORY: '/transactions/transaction-list',
  TRANSACTION_DETAIL: '/transactions/transaction',
};
