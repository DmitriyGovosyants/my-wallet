import { SCREEN_STATE } from "constants/screenState";
import { FC } from "react";
import { useAppSelector } from "redux/reduxHooks";
import { Background, StatusText } from "./MenuTopBar.styled";

export const MenuTopBar: FC = () => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);

  return (
    <Background>
      {screenStatus !== SCREEN_STATE.MAIN &&
        <StatusText>
          {screenStatus}
        </StatusText>
      }
      {screenStatus === SCREEN_STATE.MAIN &&
        <>
          <p style={{textAlign: 'center'}}>February 2023</p>
        </>
      }
    </Background>
  )
};