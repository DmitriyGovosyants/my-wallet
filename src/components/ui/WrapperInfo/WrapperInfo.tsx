import { FC, ReactNode } from "react";
import { Wrapper } from "./WrapperInfo.styled";

type WrapperInfoProps = {
  children: ReactNode;
}

export const WrapperInfo: FC<WrapperInfoProps> = ({ children}) => {
  return <Wrapper>{children}</Wrapper>;
}