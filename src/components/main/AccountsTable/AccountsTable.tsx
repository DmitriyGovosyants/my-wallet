import { FC } from "react";
import { ButtonMain } from "components/ui";
import { getIconSrc, getCurrencyLabel, getNumberFormat } from "utils";
import { IAccount, useGetAccountsQuery } from "redux/accounts/accountsApi";
import { Wrapper, Table, TableHead, TableBody, THead, TRow, TData, ButtonBox, AccountInterfaceBtn, DeleteIcon, EditIcon } from "./AccountsTable.styled";
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
    <Wrapper>
      <Table>
        <TableHead>
          <TRow>
            <THead>icon</THead>
            <THead>curr</THead>
            <THead>title</THead>
            <THead>total</THead>
            <THead>edit</THead>
            <THead>del</THead>
          </TRow>
        </TableHead>
        <TableBody>
          {userAccounts && (userAccounts.map(account => { 
            const { _id, title, currency, icon, startBalance, transactions } = account;
              return (
                <TRow key={_id}>
                  <TData><img src={getIconSrc(icon, accountsIcons)} alt={icon} /></TData>
                  <TData>{currency} {getCurrencyLabel(currency)}</TData>
                  <TData pos={'start'} pad={'30px'}>{title}</TData>
                  <TData pos={'end'} pad={'30px'}>{getNumberFormat (handleTotalBalance(startBalance, transactions))}</TData>
                  <TData>
                    <AccountInterfaceBtn onClick={() => handleAccountUpdate(account)}>
                      <EditIcon />
                    </AccountInterfaceBtn>
                  </TData>
                  <TData>
                    <AccountInterfaceBtn onClick={() => handleAccountDelete(account)}>
                      <DeleteIcon />
                    </AccountInterfaceBtn>
                  </TData>
                </TRow>
              )
            })
          )}
        </TableBody>
      </Table>
      <ButtonBox>
        <ButtonMain onClick={() => handleChangeScreen(SCREEN["ACCOUNTS.CREATE"])}>Add new account</ButtonMain>
      </ButtonBox>
    </Wrapper>
  )
}