import { FC } from "react";
import { FormTransaction, TitleMain, WrapperInfo } from "components/ui";
import { ITransaction } from "redux/transactionsApi/transactionsApi";

type TransactionCreateProps = {
  setTransactionScreen: () => void;
  transactionData: ITransaction;
};

export const TransactionCreate: FC<TransactionCreateProps> = ({transactionData, setTransactionScreen}) => {
  
  return (
    <WrapperInfo>
      <TitleMain fz="30px">{`New ${transactionData.type}`}</TitleMain>
      <FormTransaction
        setTransactionScreen={setTransactionScreen}
        transactionData={transactionData}
      />
    </WrapperInfo>
  )
};