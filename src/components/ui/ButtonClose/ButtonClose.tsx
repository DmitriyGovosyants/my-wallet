import { SCREEN_STATE } from "constants/screenState";
import { FC } from "react";
import { useAppDispatch } from "redux/reduxHooks";
import { screen } from "redux/screenStatus/screenStatusSlice";
import { BtnCloseStyled } from "./ButtonClose.styled";

export const ButtonClose: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeScreen = (screenState: string): void => {
    dispatch(screen(screenState));
  };

  return (
    <BtnCloseStyled
      onClick={() => handleChangeScreen(SCREEN_STATE.MAIN)}
    >X</BtnCloseStyled>
  )
};