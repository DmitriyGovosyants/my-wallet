import { FC, useState } from "react";
import { ITransaction, transactionTypes } from "redux/transactionsApi/transactionsApi";
import { TransactionsTable } from "components";
import { SCREEN } from "constants/screenStatus";
import { useAppSelector } from "redux/reduxHooks";
import { FormTransaction } from "components/ui";

const initialTransaction = {
  type: transactionTypes.Revenue,
  category_id: "",
  account_id: "",
  date: "",
  value: 0,
  comment: "",
  _id: "",
  createdAt: "",
};

export const TransactionsScreen: FC = () => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);
  const [transactionData, setTransactionData] = useState<ITransaction>(initialTransaction);

  return (
    <>
      {screenStatus === SCREEN["TRANSACTION.TABLE"] && <TransactionsTable
        setTransactionData={setTransactionData}
      />}
      {screenStatus === SCREEN["TRANSACTION.CREATE"] && <FormTransaction
        transactionData={transactionData}
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