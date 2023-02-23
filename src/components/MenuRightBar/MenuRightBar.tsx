import Logout from "components/Logout/Logout";
import { FC } from "react";
import { Background } from "./MenuRightBar.styled";

const MenuRightBar: FC = () => {
  return (
    <Background>
      <p style={{textAlign: 'center'}}>MenuRightBar</p>
      <Logout/>
    </Background>
  )
};

export default MenuRightBar;