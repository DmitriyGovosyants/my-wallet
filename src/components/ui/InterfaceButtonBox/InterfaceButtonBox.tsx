import { FC } from "react"
import { BoxStyled } from "./InterfaceButtonBox.styled";

type InterfaceButtonBoxProps = {
  children: JSX.Element[];
}

export const InterfaceButtonBox: FC<InterfaceButtonBoxProps> = ({children}) => {
  return (
    <BoxStyled>
      {children}
    </BoxStyled>
  )
};