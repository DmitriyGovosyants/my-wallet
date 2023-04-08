import { FC } from "react";
import { toast } from "react-toastify";
import { IAccount, useDeleteAccountMutation } from "redux/accounts/accountsApi";
import { IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, TitleMain, SpinnerFixed, WrapperInfo, WrapperButtons } from "components/ui";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";

type AccountDeleteProps = {
  accountData: IAccount;
}

export const AccountDelete: FC<AccountDeleteProps> = ({ accountData }) => {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
  const handleChangeScreen = useChangeScreen();

  const handleAccountDelete = async (): Promise<void> => {
    try {
      await deleteAccount(accountData._id).unwrap();
      toast.info(`"${accountData.title}" account deleted`);
      handleChangeScreen(SCREEN["ACCOUNTS.TABLE"]);
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
            onClick={() => handleChangeScreen(SCREEN["ACCOUNTS.TABLE"])}
          >
            Back
          </ButtonMain>
        </WrapperButtons>
      </WrapperInfo>
      {isLoading && <SpinnerFixed />}
    </>
  )
}