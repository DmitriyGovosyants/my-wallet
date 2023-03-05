import { FC } from "react";
import { useAppDispatch } from "redux/reduxHooks";
import { currentScreen } from "redux/screenStatus/screenStatusSlice";
import { InterfaceButton, InterfaceButtonBox } from "components/ui";
import { INFO_SCREEN } from "constants/infoState";
import { Background } from "./MenuLeftBar.styled";

export const MenuLeftBar: FC = () => {
  const dispatch = useAppDispatch();

  const handleChangeScreen = (screenState: string): void => {
    dispatch(currentScreen(screenState));
  };

  return (
    <Background>
      <InterfaceButtonBox>
        <InterfaceButton
          onClick={() => handleChangeScreen(INFO_SCREEN.TRANSACTIONS)}
          title={'Transactions'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(INFO_SCREEN.ACCOUNTS)}
          title={'Accounts'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(INFO_SCREEN.TRANSFER)}
          title={'Transfer'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(INFO_SCREEN.CATEGORIES)}
          title={'Categories'}
        />
      </InterfaceButtonBox>
    </Background>
  )
};