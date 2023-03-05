import { FC } from "react";
import { useAppDispatch } from "redux/reduxHooks";
import { currentScreen } from "redux/screenStatus/screenStatusSlice";
import { INFO_SCREEN } from "constants/infoState";
import { Button, CloseIcon } from "./ButtonClose.styled";

export const ButtonClose: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeScreen = (screenState: string): void => {
    dispatch(currentScreen(screenState));
  };

  return (
    <Button
      onClick={() => handleChangeScreen(INFO_SCREEN.TRANSACTIONS)}
    >
      <CloseIcon />
    </Button>
  )
};