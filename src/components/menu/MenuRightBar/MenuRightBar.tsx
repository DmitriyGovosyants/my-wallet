import { FC } from "react";
import { useAppDispatch } from "redux/reduxHooks";
import { currentScreen } from "redux/screenStatus/screenStatusSlice";
import { InterfaceButton, InterfaceButtonBox } from "components/ui";
import { INFO_SCREEN } from "constants/infoState";
import { Background } from "./MenuRightBar.styled";

export const MenuRightBar: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeScreen = (screenState: string): void => {
    dispatch(currentScreen(screenState));
  };

  return (
    <Background>
      <InterfaceButtonBox>
        <InterfaceButton
          onClick={() => handleChangeScreen(INFO_SCREEN.USER)}
          title={'User'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(INFO_SCREEN.SETTINGS)}
          title={'Settings'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(INFO_SCREEN.LOGOUT)}
          title={'Logout'}
        />
      </InterfaceButtonBox>
    </Background>
  )
};