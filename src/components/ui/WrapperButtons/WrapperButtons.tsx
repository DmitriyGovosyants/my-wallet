import { FC, ReactNode } from "react";
import { Wrapper } from "./WrapperButtons.styled";

type WrapperButtonsProps = {
  children: ReactNode;
}

export const WrapperButtons: FC<WrapperButtonsProps> = ({ children}) => {
  return <Wrapper>{children}</Wrapper>;
}