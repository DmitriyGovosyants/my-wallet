import { FC, useState } from "react";
import { ACCOUNTS_SCREEN } from "constants/accountsScreen";
import { AccountsTable, AccountCreate, AccountDelete, AccountUpdate } from "components";
import { IAccount } from "redux/accounts/accountsApi";

const initialAccount = {
  currency: '',
  icon: '',
  startBalance: 0,
  startDate: '',
  title: '',
  transactions: [],
  _id: '',
}

export const AccountsScreen: FC = () => {
  const [accountScreen, setAccountScreen] = useState<string>(ACCOUNTS_SCREEN.TABLE);
  const [accountData, setAccountData] = useState<IAccount>(initialAccount);

  return (
    <>
      {accountScreen === ACCOUNTS_SCREEN.TABLE && <AccountsTable
        setAccountScreen={setAccountScreen}
        setAccountData={setAccountData}
      />}
      {accountScreen === ACCOUNTS_SCREEN.CREATE && <AccountCreate
        setAccountScreen={() => setAccountScreen(ACCOUNTS_SCREEN.TABLE)}
      />}
      {accountScreen === ACCOUNTS_SCREEN.UPDATE && <AccountUpdate
        accountData={accountData}
        setAccountScreen={() => setAccountScreen(ACCOUNTS_SCREEN.TABLE)}
      />}
      {accountScreen === ACCOUNTS_SCREEN.DELETE && <AccountDelete
        accountData={accountData}
        setAccountScreen={() => setAccountScreen(ACCOUNTS_SCREEN.TABLE)}
      />}
    </>
  )
}