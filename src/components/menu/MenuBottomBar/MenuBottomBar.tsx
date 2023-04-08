import { FC } from "react";
import { Grid, InfoBoard, InfoData, AddButton, RevenueIcon, ExpenseIcon } from "./MenuBottomBar.styled";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";

type MenuBottomBarProps = {
  setTransactionCreateType: (value: string) => void;
}

export const MenuBottomBar: FC<MenuBottomBarProps> = ({setTransactionCreateType}) => {
  const handleChangeScreen = useChangeScreen();

  const handleAddRevenue = () => {
    setTransactionCreateType('2')
    handleChangeScreen(SCREEN["TRANSACTION.CREATE"]);
  }

  const handleAddExpense = () => {
    console.log('addExpense');
  }

  return (
    <Grid>
      <InfoBoard>
        <span>Revenues</span>
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
        <span>Expenses</span>
        <InfoData>8 000</InfoData>
      </InfoBoard>
    </Grid>
  )
};