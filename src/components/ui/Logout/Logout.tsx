import { FC } from "react";
import { SCREEN_STATE } from "constants/screenState";
import { useLogoutMutation } from "redux/auth/authApi";
import { useAppDispatch } from "redux/reduxHooks";
import { screen } from "redux/screenStatus/screenStatusSlice";
import { LogoutBox, Title, ButtonBox } from "./Logout.styled";
import { Button } from "@mui/material";

export const Logout: FC = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout({}).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeScreen = (screenState: string): void => {
    dispatch(screen(screenState));
  };

  return (
    <LogoutBox>
      <Title>Do you really want to exit?</Title>
      <ButtonBox>
        <Button variant="outlined"
          onClick={handleLogout}
        >Yes</Button>
        <Button variant="outlined"
          onClick={() => handleChangeScreen(SCREEN_STATE.MAIN)}
        >No</Button>
      </ButtonBox>
    </LogoutBox>
  )
};