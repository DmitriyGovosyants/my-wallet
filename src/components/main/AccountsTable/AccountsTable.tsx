import { FC } from "react";
import { ButtonMain } from "components/ui";
import { getIconSrc, getCurrencyLabel, getNumberFormat } from "utils";
import { IAccount, useGetAccountsQuery } from "redux/accounts/accountsApi";
import { Wrapper, Table, TableHead, TableBody, THead, TRow, TData, ButtonBox, AccountInterfaceBtn, DeleteIcon, EditIcon } from "./AccountsTable.styled";
import { accountsIcons } from "data/accountsIcons";
import { SCREEN } from "constants/screenStatus";
import { useChangeScreen } from "hooks/useChangeScreen";
import { ITransaction, transactionTypes, useGetTransactionsQuery } from "redux/transactionsApi/transactionsApi";

type AccountsTableProps = {
  setAccountData: (value: IAccount | ((prevState: IAccount) => IAccount)) => void;
};

export const AccountsTable: FC<AccountsTableProps> = ({ setAccountData }) => {
  const { data: userAccounts } = useGetAccountsQuery();
  const { data: userTransactions } = useGetTransactionsQuery();
  const handleChangeScreen = useChangeScreen();

  const handleAccountUpdate = (account: IAccount) => {
    setAccountData((prev) => ({...prev, ...account}));
    handleChangeScreen(SCREEN["ACCOUNTS.UPDATE"]);
  };

  const handleAccountDelete = (account: IAccount) => {
    setAccountData((prev) => ({...prev, ...account}));
    handleChangeScreen(SCREEN["ACCOUNTS.DELETE"]);
  };

  const handleTotalBalance = (
    startBalance: number, accountTransactions: string[] | [], accountID: string, userTransactions: ITransaction[]
  ): string => {

    if (accountTransactions.length === 0) {
      return getNumberFormat(startBalance.toFixed(2));
    }

    const totalBalance = userTransactions.reduce((acc, el) => {
      if (el.account_id === accountID && el.type === transactionTypes.Revenue) {
        acc += el.value;
      };
      if (el.account_id === accountID && el.type === transactionTypes.Expense) {
        acc -= el.value;
      };

      return acc;
    }, 0)

    return getNumberFormat((totalBalance + startBalance).toFixed(2));
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
          {userAccounts && userTransactions && (userAccounts.map(account => { 
            const { _id, title, currency, icon, startBalance, transactions } = account;
              return (
                <TRow key={_id}>
                  <TData><img src={getIconSrc(icon, accountsIcons)} alt={icon} /></TData>
                  <TData>{currency} {getCurrencyLabel(currency)}</TData>
                  <TData pos={'start'} pad={'30px'}>{title}</TData>
                  <TData pos={'end'} pad={'30px'}>{handleTotalBalance(startBalance, transactions, _id, userTransactions)}</TData>
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