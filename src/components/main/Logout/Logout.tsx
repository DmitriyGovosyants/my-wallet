import { FC } from "react";
import { useLogoutMutation } from "redux/auth/authApi";
import { IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, TitleMain, SpinnerFixed, WrapperButtons, WrapperInfo } from "components/ui";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";
import { useAppDispatch } from "redux/reduxHooks";

export const Logout: FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const handleChangeScreen = useChangeScreen();
  const dispatch = useAppDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout().unwrap();
      dispatch({type: 'USER_LOGOUT'})
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
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
            onClick={() => handleChangeScreen(SCREEN["TRANSACTION.TABLE"])}
          >
            No
          </ButtonMain>
        </WrapperButtons>
      </WrapperInfo>
      {isLoading && <SpinnerFixed />}
    </>
  )
};