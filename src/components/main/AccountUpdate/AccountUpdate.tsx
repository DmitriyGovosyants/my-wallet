import { FormAccount, TitleMain, WrapperInfo } from "components/ui";
import { FC } from "react";
import { IAccount } from "redux/accounts/accountsApi";

type AccountUpdateProps = {
  accountData: IAccount;
  setAccountScreen: () => void;
}

export const AccountUpdate: FC<AccountUpdateProps> = ({accountData, setAccountScreen}) => {
  return (
    <WrapperInfo>
      <TitleMain fz="30px">{`Update "${accountData.title}"`}</TitleMain>
      <FormAccount
        accountData={accountData}
        setAccountScreen={setAccountScreen}
      />
    </WrapperInfo>
  )
};