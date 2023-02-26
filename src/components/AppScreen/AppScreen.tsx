import { FC } from "react";
import { InfoScreen, MenuBottomBar, MenuLeftBar, MenuRightBar, MenuTopBar } from "components";
import { NavArrow } from "components/ui";
import { MainGrid, CenterColumnGrid, CenterGrid } from "./AppScreen.styled";

export const AppScreen: FC = () => {
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