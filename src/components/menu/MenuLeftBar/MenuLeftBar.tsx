import { FC } from "react";
import { InterfaceButton, InterfaceButtonBox } from "components/ui";
import { Background } from "./MenuLeftBar.styled";
import { SCREEN } from "constants/screenStatus";
import { useChangeScreen } from "hooks/useChangeScreen";

export const MenuLeftBar: FC = () => {
  const handleChangeScreen = useChangeScreen();

  return (
    <Background>
      <InterfaceButtonBox>
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN["TRANSACTION.TABLE"])}
          title={'Transactions'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN["ACCOUNTS.TABLE"])}
          title={'Accounts'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN["TRANSFER.TABLE"])}
          title={'Transfer'}
        />
        <InterfaceButton
          onClick={() => handleChangeScreen(SCREEN["CATEGORIES.TABLE"])}
          title={'Categories'}
        />
      </InterfaceButtonBox>
    </Background>
  )
};