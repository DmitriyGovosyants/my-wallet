import { FC } from "react";
import { Button } from "./InterfaceButton.styled";

type InterfaceButtonProps = {
  onClick: () => void;
  title: string;
}

export const InterfaceButton: FC<InterfaceButtonProps> = ({ onClick, title }) => {
  return (
    <Button onClick={onClick}>{title}</Button>
  )
};