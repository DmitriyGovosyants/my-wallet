import { InterfaceButton, InterfaceButtonBox } from "components/ui";
import { SCREEN_STATE } from "constants/screenState";
import { FC } from "react";
import { useAppDispatch } from "redux/reduxHooks";
import { screen } from "redux/screenStatus/screenStatusSlice";
import { Background } from "./MenuLeftBar.styled";

export const MenuLeftBar: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeScreen = (screenState: string): void => {
    dispatch(screen(screenState));
  };

  return (
    <Background>
      <InterfaceButtonBox>
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN_STATE.TRANSFER)}
          title={'Transfer'} />
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN_STATE.CATEGORIES)}
          title={'Categories'} />
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN_STATE.BILLS)}
          title={'Bills'} />
      </InterfaceButtonBox>
    </Background>
  )
};