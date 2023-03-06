import { FC } from "react";
import { useGetAccountsQuery } from "redux/accounts/accountsApi";
import { TitleMain, WrapperInfo } from "components/ui";

export const TransactionCreate: FC = () => {
  const { data: userAccounts } = useGetAccountsQuery();
  
  return (
    <WrapperInfo>
      <TitleMain fz="30px">Add transaction</TitleMain>
      <div>
        Input account
        Input data
        
        input number
        input comments
        input radio categories
      </div>
    </WrapperInfo>
  )
};