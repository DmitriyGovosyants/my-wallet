import { FC } from "react";
import { useAppSelector } from "redux/reduxHooks";
import { AccountsScreen, CategoriesScreen, TransactionsScreen, Logout } from "components";
import { InfoScreenBox } from "./InfoScreen.styled";
import { SCREEN } from "constants/screenStatus";

export const InfoScreen: FC = () => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);

  return (
    <InfoScreenBox>
      <TransactionsScreen />
      <AccountsScreen />
      <CategoriesScreen />
      {/* {screenStatus === INFO_SCREEN.ACCOUNTS && <AccountsScreen />} */}
      {/* {screenStatus === INFO_SCREEN.CATEGORIES && <CategoriesScreen />} */}
      {screenStatus === SCREEN.LOGOUT && <Logout />}
      {/* {screenStatus !== 'logout' && screenStatus} */}
      {/* {screenStatus !== INFO_SCREEN.TRANSACTIONS && <ButtonClose />} */}
    </InfoScreenBox>
  )
};