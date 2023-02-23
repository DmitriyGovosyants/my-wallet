import { FC } from "react";
import MenuLeftBar from "components/MenuLeftBar/MenuLeftBar";
import MenuRightBar from "components/MenuRightBar/MenuRightBar";
import MenuTopBar from "components/MenuTopBar/MenuTopBar";
import NavArrow from "components/NavArrow/NavArrow";
import InfoScreen from "components/InfoScreen/InfoScreen";
import MenuBottomBar from "components/MenuBottomBar/MenuBottomBar";
import { MainGrid, CenterColumnGrid, CenterGrid } from "./MainScreen.styled";

const MainScreen: FC = () => {
  return (
    <MainGrid>
      <MenuLeftBar />
      <CenterColumnGrid>
        <MenuTopBar />
        <CenterGrid>
          <NavArrow direction={'left'} />
          <InfoScreen />
          <NavArrow direction={'right'}/>
        </CenterGrid>
        <MenuBottomBar />
      </CenterColumnGrid>
      <MenuRightBar />
    </MainGrid>
  )
};

export default MainScreen;