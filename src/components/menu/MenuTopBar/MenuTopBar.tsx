import { FC } from "react";
import { useAppSelector } from "redux/reduxHooks";
import { Background, StatusText, TopBarBox } from "./MenuTopBar.styled";
import { SCREEN } from "constants/screenStatus";
import { getMonthName } from "utils";
import { NavArrow } from "components/ui";

export const MenuTopBar: FC = () => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);
  const {year, month} = useAppSelector(({ chosesDate }) => chosesDate);

  return (
    <Background>
      {screenStatus !== SCREEN["TRANSACTION.TABLE"] &&
        <StatusText>
          {screenStatus}
        </StatusText>
      }
      {screenStatus === SCREEN["TRANSACTION.TABLE"] &&
        <TopBarBox>
          <NavArrow direction={'left'} />
          <p style={{ textAlign: 'center' }}>{getMonthName(month)} {year}</p>
          <NavArrow direction={'right'} />
        </TopBarBox>
      }
    </Background>
  )
};