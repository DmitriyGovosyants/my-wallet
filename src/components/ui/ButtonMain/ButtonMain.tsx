import { FC, MouseEventHandler } from "react";
import Button from "@mui/material/Button";

type ButtonMainProps = {
  marginTop?: string;
  children: string;
  type?: "submit" | "button" | "reset" | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

export const ButtonMain: FC<ButtonMainProps> = ({
  onClick, type = "button", marginTop, children, isDisabled = false
}) => {
  return (
    <Button
      type={type}
      variant="contained"
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        backgroundColor: '#15acc0',
        width: '100%',
        maxWidth: '240px',
        boxShadow: 3,
        color: 'white',
        fontSize: '20px',
        letterSpacing: 3,
        paddingTop: '10px',
        paddingBottom: '10px',
        marginTop: marginTop,
      }}
    >
      {children}
    </Button>
  )
}