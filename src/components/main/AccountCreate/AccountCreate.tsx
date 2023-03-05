import { FormAccount, TitleMain, WrapperInfo } from "components/ui";
import { FC } from "react";

type AccountCreateProps = {
  setAccountScreen: () => void;
}

export const AccountCreate: FC<AccountCreateProps> = ({ setAccountScreen}) => {
  return (
    <WrapperInfo>
      <TitleMain fz="30px">Create new account</TitleMain>
      <FormAccount
        setAccountScreen={setAccountScreen}
      />
    </WrapperInfo>
  )
}