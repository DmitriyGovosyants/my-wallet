import { FC } from "react";
import { Grid, InfoBoard, InfoData, AddButton, RevenueIcon, ExpenseIcon } from "./MenuBottomBar.styled";

export const MenuBottomBar: FC = () => {
  const handleAddRevenue = () => {
    console.log('addRevenue');
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