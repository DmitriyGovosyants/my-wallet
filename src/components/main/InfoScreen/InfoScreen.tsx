import { FC } from "react";
import { useAppSelector } from "redux/reduxHooks";
import { INFO_SCREEN } from "constants/infoState";
import { AccountsScreen, CategoriesScreen, TransactionsScreen, Logout } from "components";
import { InfoScreenBox } from "./InfoScreen.styled";

export const InfoScreen: FC = () => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);

  return (
    <InfoScreenBox>
      {screenStatus === INFO_SCREEN.TRANSACTIONS && <TransactionsScreen />}
      {screenStatus === INFO_SCREEN.ACCOUNTS && <AccountsScreen />}
      {screenStatus === INFO_SCREEN.CATEGORIES && <CategoriesScreen />}
      {screenStatus === INFO_SCREEN.LOGOUT && <Logout />}
      {/* {screenStatus !== 'logout' && screenStatus} */}
      {/* {screenStatus !== INFO_SCREEN.TRANSACTIONS && <ButtonClose />} */}
    </InfoScreenBox>
  )
};