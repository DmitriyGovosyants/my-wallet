import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";

import { currencyData } from "data/currencyData";
import { accountsIcons } from "data/accountsIcons";
import { IAccount, useAddAccountMutation, useUpdateAccountMutation } from "redux/accounts/accountsApi";
import { useGetSettingsQuery } from "redux/settingsApi/settingsApi";
import { accountSchema, IErrorAPI, requestErrorPopUp, currentDate } from "utils";
import { ButtonMain, Input, InputAccountsIcons, InputSelect, SpinnerFixed, WrapperButtons } from "components/ui";
import { Form, InputGrid } from "./FormAccount.styled";

type FormAccountProps = {
  accountData?: IAccount;
  setAccountScreen?: () => void;
};

type FormData = yup.InferType<typeof accountSchema>;

export const FormAccount: FC<FormAccountProps> = ({ accountData, setAccountScreen }) => {
  const { data: userSettings } = useGetSettingsQuery();
  const [addAccount, { isLoading: isAddingAccount }] = useAddAccountMutation();
  const [updateAccount, { isLoading: isUpdatingAccount }] = useUpdateAccountMutation();

  const createDefaultValues = {
    title: '',
    currency: userSettings?.mainCurrency || 'USD',
    startBalance: 0.00,
    startDate: currentDate(),
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
      }
      if (accountData) {
        await updateAccount({accountID: accountData._id, body: {transactions: accountData.transactions, ...data}})
        console.log(accountData._id, {...accountData, ...data})
      }
      if (setAccountScreen) {
        setAccountScreen();
      }
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <>
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
            name={"startDate"}
            label={"Start date"}
            type={"date"}
            control={control}
            error={errors?.startDate?.message}
          />
        </InputGrid>
        <InputGrid>
          <Input
            name={"startBalance"}
            label={"Start balance"}
            type={"number"}
            control={control}
            error={errors?.startBalance?.message}
          />
          <InputSelect
            name={"currency"}
            label={"Currency"}
            inputData={currencyData}
            control={control}
            error={errors?.currency?.message}
          />
        </InputGrid>
        <InputAccountsIcons
          name={"icon"}
          label={"Choose icon"}
          control={control}
          error={errors?.icon?.message}
        />
        <WrapperButtons>
          <ButtonMain isDisabled={isAddingAccount || isUpdatingAccount} type="submit">
            {accountData ? 'Update' : 'Create'}
          </ButtonMain>
          {setAccountScreen && 
            <ButtonMain onClick={setAccountScreen}>
              Back
            </ButtonMain>
          }
        </WrapperButtons>
      </Form>
      {(isAddingAccount || isUpdatingAccount) && <SpinnerFixed />}
    </>
  )
};