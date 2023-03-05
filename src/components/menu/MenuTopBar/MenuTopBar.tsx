import { FC } from "react";
import { useAppSelector } from "redux/reduxHooks";
import { INFO_SCREEN } from "constants/infoState";
import { Background, StatusText } from "./MenuTopBar.styled";

export const MenuTopBar: FC = () => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);

  return (
    <Background>
      {screenStatus !== INFO_SCREEN.TRANSACTIONS &&
        <StatusText>
          {screenStatus}
        </StatusText>
      }
      {screenStatus === INFO_SCREEN.TRANSACTIONS &&
        <>
          <p style={{textAlign: 'center'}}>February 2023</p>
        </>
      }
    </Background>
  )
};