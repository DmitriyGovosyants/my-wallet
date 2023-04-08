import { ButtonMain } from "components/ui";
import { SCREEN } from "constants/screenStatus";
import { useChangeScreen } from "hooks/useChangeScreen";
import { FC } from "react";
import { ITransaction, transactionTypes, useGetTransactionsQuery } from "redux/transactionsApi/transactionsApi";

type TransactionsTableProps = {
  setTransactionData: (value: ITransaction | ((prevState: ITransaction) => ITransaction)) => void;
};

export const TransactionsTable: FC<TransactionsTableProps> = ({setTransactionData}) => {
  const { data: userTransactions } = useGetTransactionsQuery();
  const handleChangeScreen = useChangeScreen();

  const handleAddTransaction = (type: transactionTypes) => {
    setTransactionData(prev => ({ ...prev, type }));
    handleChangeScreen(SCREEN["TRANSACTION.CREATE"]);
  };

  return (
    <>
      <ButtonMain onClick={() => handleAddTransaction(transactionTypes.Revenue)}>+++</ButtonMain>
      <ButtonMain onClick={() => handleAddTransaction(transactionTypes.Expense)}>---</ButtonMain>
    </>
  )
}