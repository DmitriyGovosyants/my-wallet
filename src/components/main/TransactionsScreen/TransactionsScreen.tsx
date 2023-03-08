import { TRANSACTIONS_SCREEN } from "constants/transactionScreen";
import { FC, useState } from "react";
import { ITransaction, transactionTypes } from "redux/transactionsApi/transactionsApi";
import { TransactionCreate, TransactionsTable } from "components";

const initialTransaction = {
  type: transactionTypes.Revenue,
  category_id: "",
  date: "",
  value: 0,
  comment: "",
  _id: "",
};

export const TransactionsScreen: FC = () => {
  const [transactionScreen, setTransactionScreen] = useState<string>(TRANSACTIONS_SCREEN.TABLE);
  const [transactionData, setTransactionData] = useState<ITransaction>(initialTransaction);
  
  return (
    <>
      {transactionScreen === TRANSACTIONS_SCREEN.TABLE && <TransactionsTable
        setTransactionScreen={setTransactionScreen}
        setTransactionData={setTransactionData}
      />}
      {transactionScreen === TRANSACTIONS_SCREEN.CREATE && <TransactionCreate
        transactionData={transactionData}
        setTransactionScreen={() => setTransactionScreen(TRANSACTIONS_SCREEN.TABLE)}
      />}
      {/* {categoryScreen === CATEGORIES_SCREEN.EDIT && <CategoryEdit
        categoryData={categoryData}
        setCategoryScreen={setCategoryScreen}
      />}
      {categoryScreen === CATEGORIES_SCREEN.DELETE && <CategoryDelete
        categoryData={categoryData}
        setCategoryScreen={setCategoryScreen}
      />} */}
    </>
  )
};