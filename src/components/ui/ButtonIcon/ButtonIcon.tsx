import { FC, MouseEventHandler } from "react";
import { Btn } from "./ButtonIcon.styled";

type ButtonIconProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button" | "reset" | undefined; 
  children: JSX.Element;
}

export const ButtonIcon: FC<ButtonIconProps> = ({onClick, type = 'button', children}) => {
  return (
    <Btn onClick={onClick} type={type}>
      {children}
    </Btn>
  )
};