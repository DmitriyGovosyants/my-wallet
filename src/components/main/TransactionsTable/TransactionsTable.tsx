import { ButtonMain } from "components/ui";
import { TRANSACTIONS_SCREEN } from "constants/transactionScreen";
import { FC } from "react";
import { ITransaction, transactionTypes, useGetTransactionsQuery } from "redux/transactionsApi/transactionsApi";

type TransactionsTableProps = {
  setTransactionScreen: (value: string) => void;
  setTransactionData: (value: ITransaction | ((prevState: ITransaction) => ITransaction)) => void;
};

export const TransactionsTable: FC<TransactionsTableProps> = ({setTransactionScreen, setTransactionData}) => {
  const { data: userTransactions } = useGetTransactionsQuery();
  console.log(userTransactions);

  const handleAddTransaction = (type: transactionTypes) => {
    setTransactionData(prev => ({ ...prev, type }));
    setTransactionScreen(TRANSACTIONS_SCREEN.CREATE);
  };

  return (
    <>
      <ButtonMain onClick={() => handleAddTransaction(transactionTypes.Revenue)}>+++</ButtonMain>
      <ButtonMain onClick={() => handleAddTransaction(transactionTypes.Expense)}>---</ButtonMain>
    </>
  )
}