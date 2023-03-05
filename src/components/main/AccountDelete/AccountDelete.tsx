
import { ButtonMain, TitleMain, SpinnerFixed, WrapperInfo, WrapperButtons } from "components/ui";
import { FC } from "react";
import { IAccount, useDeleteAccountMutation } from "redux/accounts/accountsApi";
import { IErrorAPI, requestErrorPopUp } from "utils";

type AccountDeleteProps = {
  accountData: IAccount;
  setAccountScreen: () => void;
}

export const AccountDelete: FC<AccountDeleteProps> = ({ accountData, setAccountScreen }) => {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const handleAccountDelete = async (): Promise<void> => {
    try {
      await deleteAccount(accountData._id).unwrap();
      setAccountScreen();
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <>
      <WrapperInfo>
        <TitleMain fz="30px">{`Are you sure you want to delete "${accountData.title}"?`}</TitleMain>
        <WrapperButtons>
          <ButtonMain
            onClick={handleAccountDelete}
            isDisabled={isLoading}
          >
            Delete
          </ButtonMain>
          <ButtonMain
            onClick={setAccountScreen}
          >
            Back
          </ButtonMain>
        </WrapperButtons>
      </WrapperInfo>
      {isLoading && <SpinnerFixed />}
    </>
  )
}