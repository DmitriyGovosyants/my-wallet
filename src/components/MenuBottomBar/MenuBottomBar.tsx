import { FC } from "react";
import { Background } from "./MenuBottomBar.styled";

const MenuBottomBar: FC = () => {
  return (
    <Background>
      <p style={{textAlign: 'center'}}>MenuBottomBar</p>
    </Background>
  )
};

export default MenuBottomBar;