import { FC } from "react";
import { CurrencySelection, InfoScreen, MenuBottomBar, MenuLeftBar, MenuRightBar, MenuTopBar } from "components";
import { NavArrow } from "components/ui";
import { useGetSettingsQuery } from "redux/user/userApi";
import { MainGrid, CenterColumnGrid, CenterGrid } from "./AppScreen.styled";

export const AppScreen: FC = () => {
  const { data, isLoading } = useGetSettingsQuery();
  console.log(data);

  const isSetMainCurrency: boolean = data?.settings?.mainCurrency === '';
  const isCreateFirstBill: boolean = data?.settings?.bills?.length === 0;
  
  if (isSetMainCurrency) {
    return (
      <CurrencySelection />
    )
  };

  if (isCreateFirstBill) {
    return (
      <div>Create your first bill</div>
    )
  };

  if (isLoading) {
    return (
      <p>...Loading</p>
    )
  }

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