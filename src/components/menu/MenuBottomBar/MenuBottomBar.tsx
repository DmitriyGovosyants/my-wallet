import { INFO_SCREEN } from "constants/infoState";
import { FC } from "react";
import { useAppDispatch } from "redux/reduxHooks";
import { currentScreen } from "redux/screenStatus/screenStatusSlice";
import { Grid, InfoBoard, InfoData, AddButton, RevenueIcon, ExpenseIcon } from "./MenuBottomBar.styled";

export const MenuBottomBar: FC = () => {
  const dispatch = useAppDispatch();

  const handleAddRevenue = () => {
    dispatch(currentScreen(INFO_SCREEN.NEW_TRANSACTION));
  }

  const handleAddExpense = () => {
    console.log('addExpense');
  }

  return (
    <Grid>
      <InfoBoard>
        <span>Revenue</span>
        <InfoData>10 000</InfoData>
      </InfoBoard>
      <InfoBoard>
        <AddButton onClick={handleAddRevenue}>
          <RevenueIcon />
        </AddButton>
      </InfoBoard>
      <InfoBoard>
        <AddButton onClick={handleAddExpense}>
          <ExpenseIcon />
        </AddButton>
      </InfoBoard>
      <InfoBoard>
        <span>Expense</span>
        <InfoData>8 000</InfoData>
      </InfoBoard>
    </Grid>
  )
};