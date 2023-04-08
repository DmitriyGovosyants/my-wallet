import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";

import { currencyData } from "data/currencyData";
import { accountsIcons } from "data/accountsIcons";
import { IAccount, useAddAccountMutation, useUpdateAccountMutation } from "redux/accounts/accountsApi";
import { useGetSettingsQuery } from "redux/settingsApi/settingsApi";
import { accountSchema, IErrorAPI, requestErrorPopUp, getCurrentDate } from "utils";
import { ButtonMain, Input, InputRadioIcons, InputSelectCurrency, SpinnerFixed, TitleMain, WrapperButtons, WrapperInfo } from "components/ui";
import { Form, InputGrid } from "./FormAccount.styled";
import { toast } from "react-toastify";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";

type FormAccountProps = {
  accountData?: IAccount;
  title: string;
  firstAccountCreate?: boolean;
};

type FormData = yup.InferType<typeof accountSchema>;

export const FormAccount: FC<FormAccountProps> = ({ accountData, title, firstAccountCreate }) => {
  const { data: userSettings } = useGetSettingsQuery();
  const [addAccount, { isLoading: isAddingAccount }] = useAddAccountMutation();
  const [updateAccount, { isLoading: isUpdatingAccount }] = useUpdateAccountMutation();
  const handleChangeScreen = useChangeScreen();

  const createDefaultValues = {
    title: '',
    currency: userSettings?.mainCurrency || 'USD',
    startBalance: 0.00,
    startDate: getCurrentDate(),
    icon: accountsIcons[0].label,
  };

  const updateDefaultValues = {
    title: accountData?.title,
    currency: accountData?.currency,
    startBalance: accountData?.startBalance,
    startDate: accountData?.startDate,
    icon: accountData?.icon,
  };

  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(accountSchema),
    defaultValues: accountData ? updateDefaultValues : createDefaultValues,
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    try {
      if (!accountData) {
        await addAccount({ ...data, transactions: [] }).unwrap();
        toast.info(`"${data.title}" account created`);
      }
      if (accountData) {
        await updateAccount({ accountID: accountData._id, body: { transactions: accountData.transactions, ...data } }).unwrap();
        toast.info(`"${data.title}" account updated`);
      }
      if (!firstAccountCreate) {
        handleChangeScreen(SCREEN["ACCOUNTS.TABLE"]);
      }
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <WrapperInfo>
      <TitleMain fz="30px">{title}</TitleMain>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <InputGrid>
          <Input
            name={"title"}
            label={"Title"}
            autoFocus={true}
            control={control}
            error={errors?.title?.message}
          />
          <Input
            name={"startBalance"}
            label={"Start balance"}
            type={"number"}
            control={control}
            error={errors?.startBalance?.message}
          />
        </InputGrid>
        <InputGrid>
          <Input
            name={"startDate"}
            label={"Start date"}
            type={"date"}
            control={control}
            error={errors?.startDate?.message}
          />
          <InputSelectCurrency
            name={"currency"}
            label={"Currency"}
            inputData={currencyData}
            control={control}
            error={errors?.currency?.message}
          />
        </InputGrid>
        <InputRadioIcons
          iconsGroup={accountsIcons}
          name={"icon"}
          label={"Choose icon"}
          control={control}
          error={errors?.icon?.message}
        />
        <WrapperButtons>
          <ButtonMain isDisabled={isAddingAccount || isUpdatingAccount} type="submit">
            {accountData ? 'Update' : 'Create'}
          </ButtonMain>
          {!firstAccountCreate && 
            <ButtonMain onClick={() => handleChangeScreen(SCREEN["ACCOUNTS.TABLE"])}>
              Back
            </ButtonMain>
          }
        </WrapperButtons>
      </Form>
      {(isAddingAccount || isUpdatingAccount) && <SpinnerFixed />}
    </WrapperInfo>
  )
};