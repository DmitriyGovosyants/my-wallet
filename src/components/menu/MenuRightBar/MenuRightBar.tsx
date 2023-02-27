
import { InterfaceButton, InterfaceButtonBox } from "components/ui";
import { SCREEN_STATE } from "constants/screenState";
import { FC } from "react";
import { useAppDispatch } from "redux/reduxHooks";
import { screen } from "redux/screenStatus/screenStatusSlice";
import { Background } from "./MenuRightBar.styled";

export const MenuRightBar: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeScreen = (screenState: string): void => {
    dispatch(screen(screenState));
  };

  return (
    <Background>
      <InterfaceButtonBox>
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN_STATE.LOGOUT)}
          title={'Logout'} />
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN_STATE.USER)}
          title={'User'} />
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN_STATE.SETTINGS)}
          title={'Settings'} />
      </InterfaceButtonBox>
    </Background>
  )
};