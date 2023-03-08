import { FC, useEffect, useState } from "react";
import { useGetSettingsQuery } from "redux/settingsApi/settingsApi";
import { useGetAccountsQuery } from "redux/accounts/accountsApi";
import { useGetCategoriesQuery } from "redux/categoriesApi/categoriesApi";
import { APP_SCREEN } from "constants/appScreen";
import { FirstAccountCreate, MainCurrencySelect, InfoScreen, MenuBottomBar, MenuLeftBar, MenuRightBar, MenuTopBar } from "components";
import { NavArrow, SpinnerFixed } from "components/ui";
import { MainGrid, CenterColumnGrid, CenterGrid } from "./WalletScreen.styled";

export const WalletScreen: FC = () => {
  const { data: userSettings, isLoading: settingsIsLoading } = useGetSettingsQuery();
  const { data: userAccounts } = useGetAccountsQuery();
  const { data: userCategories } = useGetCategoriesQuery();
  const [appScreen, setAppScreen] = useState<string>(APP_SCREEN.EMPTY);
  const [transactionCreateType, setTransactionCreateType] = useState('');

  useEffect(() => {
    const isMainCurrencySelectScreen: boolean = userSettings?.mainCurrency === '';
    const isFirstAccountCreateScreen: boolean = userAccounts?.length === 0;
    const isWalletScreen: boolean = !isMainCurrencySelectScreen && !isFirstAccountCreateScreen;

    if (isMainCurrencySelectScreen) {
      setAppScreen(APP_SCREEN.CURRENCY);
      return;
    };
    if (isFirstAccountCreateScreen) {
      setAppScreen(APP_SCREEN.ACCOUNT);
      return;
    };
    if (isWalletScreen) {
      setAppScreen(APP_SCREEN.WALLET);
      return;
    };
  }, [userAccounts?.length, userSettings?.mainCurrency]);

  return (
    <>
      {appScreen === APP_SCREEN.CURRENCY && <MainCurrencySelect />}
      {appScreen === APP_SCREEN.ACCOUNT && <FirstAccountCreate />}
      {appScreen === APP_SCREEN.WALLET &&
        <MainGrid>
          <MenuLeftBar />
          <CenterColumnGrid>
            <MenuTopBar />
            <CenterGrid>
              <NavArrow direction={'left'} />
              <InfoScreen />
              <NavArrow direction={'right'}/>
            </CenterGrid>
            <MenuBottomBar setTransactionCreateType={setTransactionCreateType} />
          </CenterColumnGrid>
          <MenuRightBar />
        </MainGrid>
      }
      {(settingsIsLoading || appScreen === APP_SCREEN.EMPTY) && <SpinnerFixed />}
    </>
  )
};