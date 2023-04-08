import { FC, useState } from "react";
import { AccountsTable, AccountDelete } from "components";
import { IAccount } from "redux/accounts/accountsApi";
import { useAppSelector } from "redux/reduxHooks";
import { SCREEN } from "constants/screenStatus";
import { FormAccount } from "components/ui";

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
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);
  const [accountData, setAccountData] = useState<IAccount>(initialAccount);

  return (
    <>
      {screenStatus === SCREEN["ACCOUNTS.TABLE"] && <AccountsTable
        setAccountData={setAccountData}
      />}
      {screenStatus === SCREEN["ACCOUNTS.CREATE"] && <FormAccount
        title={'Create new account'}
      />}
      {screenStatus === SCREEN["ACCOUNTS.UPDATE"] && <FormAccount
        title={`Update "${accountData.title}"`}
        accountData={accountData}
      />}
      {screenStatus === SCREEN["ACCOUNTS.DELETE"] && <AccountDelete
        accountData={accountData}
      />}
    </>
  )
}