import { FC } from "react";
import { ButtonMain } from "components/ui";
import { getIconSrc, getCurrencyLabel } from "utils";
import { IAccount, useGetAccountsQuery } from "redux/accounts/accountsApi";
import { Table, RowGrid, TitleData, RowData, Text, ButtonBox, AccountInterfaceBtn, DeleteIcon, EditIcon } from "./AccountsTable.styled";
import { accountsIcons } from "data/accountsIcons";
import { SCREEN } from "constants/screenStatus";
import { useChangeScreen } from "hooks/useChangeScreen";

type AccountsTableProps = {
  setAccountData: (value: IAccount | ((prevState: IAccount) => IAccount)) => void;
}

export const AccountsTable: FC<AccountsTableProps> = ({ setAccountData }) => {
  const { data: userAccounts } = useGetAccountsQuery();
  const handleChangeScreen = useChangeScreen();

  const handleAccountUpdate = (account: IAccount) => {
    setAccountData((prev) => ({...prev, ...account}));
    handleChangeScreen(SCREEN["ACCOUNTS.UPDATE"]);
  };

  const handleAccountDelete = (account: IAccount) => {
    setAccountData((prev) => ({...prev, ...account}));
    handleChangeScreen(SCREEN["ACCOUNTS.DELETE"]);
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
                  <img src={getIconSrc(icon, accountsIcons)} alt={icon} />
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
        <ButtonMain onClick={() => handleChangeScreen(SCREEN["ACCOUNTS.CREATE"])}>Add account</ButtonMain>
      </ButtonBox>
    </>
  )
}