import { FC, useState, useEffect } from "react";
import { Grid, InfoBoard, InfoData, AddButton, RevenueIcon, ExpenseIcon } from "./MenuBottomBar.styled";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";
import { transactionTypes, useGetTransactionsQuery } from "redux/transactionsApi/transactionsApi";
import { useAppDispatch, useAppSelector } from "redux/reduxHooks";
import { transactionType } from "redux/transactionType/transactionTypeSlice";
import { getNumberFormat, getTransactionsByDate } from "utils";

type transactionsSummType = {
  expense: number;
  revenue: number;
}

const initialTransactionsSumm = {
  expense: 0,
  revenue: 0,
}

export const MenuBottomBar: FC = () => {
  const { data: userTransactions } = useGetTransactionsQuery();
  const [transactionsSumm, setTransactionsSumm] = useState<transactionsSummType>(initialTransactionsSumm);
  const { year, month } = useAppSelector(({ chosesDate }) => chosesDate);
  const handleChangeScreen = useChangeScreen();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userTransactions) {
      const transactionsByDate = getTransactionsByDate(year, month, userTransactions);
      const transactionsBySumm = transactionsByDate.reduce((acc, el) => {
        acc[el.type] += el.value;
        return acc;
      }, {expense: 0, revenue: 0});
      setTransactionsSumm(transactionsBySumm);
    }
  },[month, userTransactions, year])

  const handleAddTransaction = (type: transactionTypes) => {
    dispatch(transactionType(type));
    handleChangeScreen(SCREEN["TRANSACTION.CREATE"]);
  };

  const handleSummByType = (type: transactionTypes) => {
    const summToString = transactionsSumm[type].toFixed(2).toString();
    return getNumberFormat(summToString);
  };

  return (
    <Grid>
      <InfoBoard>
        <span>Expenses</span>
        <InfoData>{handleSummByType(transactionTypes.Expense)}</InfoData>
      </InfoBoard>
      <InfoBoard>
        <AddButton onClick={() => handleAddTransaction(transactionTypes.Expense)}>
          <ExpenseIcon />
        </AddButton>
      </InfoBoard>
      <InfoBoard>
        <AddButton onClick={() => handleAddTransaction(transactionTypes.Revenue)}>
          <RevenueIcon />
        </AddButton>
      </InfoBoard>
      <InfoBoard>
        <span>Revenues</span>
        <InfoData>{handleSummByType(transactionTypes.Revenue)}</InfoData>
      </InfoBoard>
    </Grid>
  )
};