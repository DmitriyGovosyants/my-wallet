import { useAppDispatch } from "redux/reduxHooks";
import { currentScreen } from "redux/screenStatus/screenStatusSlice";

export const useChangeScreen = () => {
  const dispatch = useAppDispatch();

  const handleChangeScreen = (screenState: string): void => {
    dispatch(currentScreen(screenState));
  };

  return handleChangeScreen;
}