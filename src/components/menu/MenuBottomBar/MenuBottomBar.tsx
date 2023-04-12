import { FC } from "react";
import { Grid, InfoBoard, InfoData, AddButton, RevenueIcon, ExpenseIcon } from "./MenuBottomBar.styled";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";
import { transactionTypes } from "redux/transactionsApi/transactionsApi";
import { useAppDispatch } from "redux/reduxHooks";
import { transactionType } from "redux/transactionType/transactionTypeSlice"; 

export const MenuBottomBar: FC = () => {
  const handleChangeScreen = useChangeScreen();
  const dispatch = useAppDispatch();

  const handleAddTransaction = (type: transactionTypes) => {
    dispatch(transactionType(type));
    handleChangeScreen(SCREEN["TRANSACTION.CREATE"]);
  };

  return (
    <Grid>
      <InfoBoard>
        <span>Revenues</span>
        <InfoData>10 000</InfoData>
      </InfoBoard>
      <InfoBoard>
        <AddButton onClick={() => handleAddTransaction(transactionTypes.Revenue)}>
          <RevenueIcon />
        </AddButton>
      </InfoBoard>
      <InfoBoard>
        <AddButton onClick={() => handleAddTransaction(transactionTypes.Expense)}>
          <ExpenseIcon />
        </AddButton>
      </InfoBoard>
      <InfoBoard>
        <span>Expenses</span>
        <InfoData>8 000</InfoData>
      </InfoBoard>
    </Grid>
  )
};