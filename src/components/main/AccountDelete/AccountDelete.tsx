import { FC } from "react";
import { toast } from "react-toastify";
import { IAccount, useDeleteAccountMutation } from "redux/accounts/accountsApi";
import { IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, TitleMain, SpinnerFixed, WrapperInfo, WrapperButtons } from "components/ui";

type AccountDeleteProps = {
  accountData: IAccount;
  setAccountScreen: () => void;
}

export const AccountDelete: FC<AccountDeleteProps> = ({ accountData, setAccountScreen }) => {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const handleAccountDelete = async (): Promise<void> => {
    try {
      await deleteAccount(accountData._id).unwrap();
      toast.info(`"${accountData.title}" account deleted`);
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