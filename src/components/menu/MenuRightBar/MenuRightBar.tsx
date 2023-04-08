import { FC } from "react";
import { InterfaceButton, InterfaceButtonBox } from "components/ui";
import { Background } from "./MenuRightBar.styled";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";

export const MenuRightBar: FC = () => {
  const handleChangeScreen = useChangeScreen();

  return (
    <Background>
      <InterfaceButtonBox>
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN.USER)}
          title={'User'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN.SETTINGS)}
          title={'Settings'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN.LOGOUT)}
          title={'Logout'}
        />
      </InterfaceButtonBox>
    </Background>
  )
};