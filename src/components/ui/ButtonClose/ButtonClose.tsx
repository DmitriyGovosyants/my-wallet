import { FC } from "react";
import { Button, CloseIcon } from "./ButtonClose.styled";
import { SCREEN } from "constants/screenStatus";
import { useChangeScreen } from "hooks/useChangeScreen";

export const ButtonClose: FC = () => {
  const handleChangeScreen = useChangeScreen();

  return (
    <Button
      onClick={() => handleChangeScreen(SCREEN["TRANSACTION.TABLE"])}
    >
      <CloseIcon />
    </Button>
  )
};