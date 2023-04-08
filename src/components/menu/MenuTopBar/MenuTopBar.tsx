import { FC } from "react";
import { useAppSelector } from "redux/reduxHooks";
import { Background, StatusText } from "./MenuTopBar.styled";
import { SCREEN } from "constants/screenStatus";

export const MenuTopBar: FC = () => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);

  return (
    <Background>
      {screenStatus !== SCREEN["TRANSACTION.TABLE"] &&
        <StatusText>
          {screenStatus}
        </StatusText>
      }
      {screenStatus === SCREEN["TRANSACTION.TABLE"] &&
        <>
          <p style={{textAlign: 'center'}}>February 2023</p>
        </>
      }
    </Background>
  )
};