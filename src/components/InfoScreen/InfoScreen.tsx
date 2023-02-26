import { ButtonClose, Logout } from "components/ui";
import { SCREEN_STATE } from "constants/screenState";
import { FC } from "react";
import { useAppSelector } from "redux/reduxHooks";
import { InfoScreenBox } from "./InfoScreen.styled";

export const InfoScreen: FC = () => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);

  return (
    <InfoScreenBox>
      {screenStatus === SCREEN_STATE.LOGOUT && <Logout />}
      {screenStatus !== 'logout' && screenStatus}
      {screenStatus !== SCREEN_STATE.MAIN && <ButtonClose />}
    </InfoScreenBox>
  )
};