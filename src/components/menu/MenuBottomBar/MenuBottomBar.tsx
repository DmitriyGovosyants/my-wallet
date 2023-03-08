import { FC } from "react";
import { useAppDispatch } from "redux/reduxHooks";
import { currentScreen } from "redux/screenStatus/screenStatusSlice";
import { INFO_SCREEN } from "constants/infoState";
import { Grid, InfoBoard, InfoData, AddButton, RevenueIcon, ExpenseIcon } from "./MenuBottomBar.styled";

type MenuBottomBarProps = {
  setTransactionCreateType: (value: string) => void;
}

export const MenuBottomBar: FC<MenuBottomBarProps> = ({setTransactionCreateType}) => {
  const dispatch = useAppDispatch();

  const handleAddRevenue = () => {
    setTransactionCreateType('2')
    dispatch(currentScreen(INFO_SCREEN.TRANSACTIONS));
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