import { FC } from "react";
import { useGetSettingsQuery } from "redux/settingsApi/settingsApi";
import { useGetAccountsQuery } from "redux/accounts/accountsApi";
import { useGetCategoriesQuery } from "redux/categoriesApi/categoriesApi";
import { MainCurrencySelect, InfoScreen, MenuBottomBar, MenuLeftBar, MenuRightBar, MenuTopBar } from "components";
import { FormAccount, SpinnerFixed } from "components/ui";
import { MainGrid, CenterColumnGrid, CenterGrid, Wrapper } from "./WalletScreen.styled";

export const WalletScreen: FC = () => {
  const { data: userSettings, isLoading: settingsIsLoading } = useGetSettingsQuery();
  const { data: userAccounts } = useGetAccountsQuery();
  // const { data: userCategories } = useGetCategoriesQuery();

  const isFirstLoadMainCurrency: boolean = userSettings?.mainCurrency === '';
  const isFirstLoadAccountCreate: boolean = userAccounts?.length === 0;
  const isLoadWallet: boolean = !isFirstLoadMainCurrency && !isFirstLoadAccountCreate;

  if (isFirstLoadMainCurrency) {
    return <MainCurrencySelect />;
  };

  if (isFirstLoadAccountCreate) {
    return (
      <Wrapper>
        <FormAccount title={'Create your first account'} firstAccountCreate/>
      </Wrapper>
    );
  };

  if (isLoadWallet) {
    return (
      <MainGrid>
        <MenuLeftBar />
        <CenterColumnGrid>
          <MenuTopBar />
          <CenterGrid>
            <InfoScreen />
          </CenterGrid>
          <MenuBottomBar />
        </CenterColumnGrid>
        <MenuRightBar />
      </MainGrid>
    )
  }

  return (<SpinnerFixed />);
};