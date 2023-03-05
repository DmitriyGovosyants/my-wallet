import { FC } from "react";
import { INFO_SCREEN } from "constants/infoState";
import { useLogoutMutation } from "redux/auth/authApi";
import { useAppDispatch } from "redux/reduxHooks";
import { currentScreen } from "redux/screenStatus/screenStatusSlice";
import { IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, TitleMain, SpinnerFixed, WrapperButtons, WrapperInfo } from "components/ui";

export const Logout: FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout({}).unwrap();
      handleChangeScreen(INFO_SCREEN.TRANSACTIONS);
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  const handleChangeScreen = (screenState: string): void => {
    dispatch(currentScreen(screenState));
  };

  return (
    <>
      <WrapperInfo>
        <TitleMain fz='30px'>Do you really want to exit?</TitleMain>
        <WrapperButtons>
          <ButtonMain
            onClick={handleLogout}
          >
            Yes
          </ButtonMain>
          <ButtonMain
            onClick={() => handleChangeScreen(INFO_SCREEN.TRANSACTIONS)}
          >
            No
          </ButtonMain>
        </WrapperButtons>
      </WrapperInfo>
      {isLoading && <SpinnerFixed />}
    </>
  )
};