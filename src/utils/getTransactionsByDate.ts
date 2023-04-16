import { ITransaction } from "redux/transactionsApi/transactionsApi";

export const getTransactionsByDate = (year: number, month: number, transactions: ITransaction[]) => {
  return transactions.filter(({ date }) => {
    const transactionYear = Number(date.split('-')[0]);
    const transactionMonth = Number(date.split('-')[1]);

    const isChosesYear = transactionYear === year;
    const isChosesMonth = transactionMonth === month;

    return isChosesYear && isChosesMonth;
  });
}