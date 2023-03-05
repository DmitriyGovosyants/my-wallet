import { FC } from "react";
import { ACCOUNTS_SCREEN } from "constants/accountsScreen";
import { ButtonMain } from "components/ui";
import { getAccountIconSrc, getCurrencyLabel } from "utils";
import { IAccount, useGetAccountsQuery } from "redux/accounts/accountsApi";
import { Table, RowGrid, TitleData, RowData, Text, ButtonBox, AccountInterfaceBtn, DeleteIcon, EditIcon } from "./AccountsTable.styled";

type AccountsTableProps = {
  setAccountScreen: (value: string) => void;
  setAccountData: (value: IAccount | ((prevState: IAccount) => IAccount)) => void;
}

export const AccountsTable: FC<AccountsTableProps> = ({ setAccountScreen, setAccountData }) => {
  const { data: userAccounts } = useGetAccountsQuery();

  const handleAccountUpdate = (account: IAccount) => {
    setAccountData((prev) => ({...prev, ...account}));
    setAccountScreen(ACCOUNTS_SCREEN.UPDATE);
  };

  const handleAccountDelete = (account: IAccount) => {
    setAccountData((prev) => ({...prev, ...account}));
    setAccountScreen(ACCOUNTS_SCREEN.DELETE);
  };

  const handleTotalBalance = (startBalance: number, transactons: string[] | []): string => {
    // if (transactons.length === 0) {
      return startBalance.toFixed(2);
    // }
    // const totalBalance: number = transactons.reduce((acc, {type, value}) => {
    //   if (type === 'expence' || type === 'transferTo') {
    //     return acc -= value;
    //   }
    //   if (type === 'income' || type === 'transferFrom') {
    //     return acc += value;
    //   }
    //   return 0;
    // }, startBalance)
    // return totalBalance.toFixed(2);
  };

  return (
    <>
      <Table>
        <RowGrid>
          <TitleData>*</TitleData>
          <TitleData>title</TitleData>
          <TitleData>total</TitleData>
          <TitleData>currency</TitleData>
          <TitleData></TitleData>
          <TitleData></TitleData>
        </RowGrid>
        {userAccounts && (
          userAccounts.map(account => 
          { 
            const { _id, title, currency, icon, startBalance, transactions } = account;
            return (
              <RowGrid key={_id}>
                <RowData>
                  <img src={getAccountIconSrc(icon)} alt={icon} />
                </RowData>
                <RowData>
                  <Text>{title}</Text>
                </RowData>
                <RowData>
                  <Text>{handleTotalBalance(startBalance, transactions)}</Text>
                </RowData>
                <RowData>
                  <Text>{currency} - {getCurrencyLabel(currency)}</Text>
                </RowData>
                <RowData>
                  <AccountInterfaceBtn onClick={() => handleAccountUpdate(account)}>
                    <EditIcon />
                  </AccountInterfaceBtn>
                </RowData>
                <RowData>
                  <AccountInterfaceBtn onClick={() => handleAccountDelete(account)}>
                    <DeleteIcon />
                  </AccountInterfaceBtn>
                </RowData>
              </RowGrid>
              )
            }
          )
        )}
      </Table>
      <ButtonBox>
        <ButtonMain onClick={() => setAccountScreen(ACCOUNTS_SCREEN.CREATE)}>Add account</ButtonMain>
      </ButtonBox>
    </>
  )
}