import { FC } from "react";
import { Background } from "./MenuTopBar.styled";

const MenuTopBar: FC = () => {
  return (
    <Background>
      <p style={{textAlign: 'center'}}>February 2023</p>
    </Background>
  )
};

export default MenuTopBar;