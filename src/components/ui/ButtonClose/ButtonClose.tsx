import { FC } from "react";
import { SCREEN_STATE } from "constants/screenState";
import { useAppDispatch } from "redux/reduxHooks";
import { screen } from "redux/screenStatus/screenStatusSlice";
import { Button, CloseIcon } from "./ButtonClose.styled";

export const ButtonClose: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeScreen = (screenState: string): void => {
    dispatch(screen(screenState));
  };

  return (
    <Button
      onClick={() => handleChangeScreen(SCREEN_STATE.MAIN)}
    >
      <CloseIcon />
    </Button>
  )
};