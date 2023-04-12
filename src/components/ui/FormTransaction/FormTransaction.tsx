import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";
import { toast } from "react-toastify";

import { transactionSchema, IErrorAPI, requestErrorPopUp, getCurrentDate, getIconSrc } from "utils";
import { ButtonMain, Input, InputRadioCategories, InputSelectAccount, SpinnerFixed, TitleMain, WrapperButtons, WrapperInfo } from "components/ui";
import { Form } from "./FormTransaction.styled";
import { ITransaction, useAddTransactionMutation, useUpdateTransactionMutation } from "redux/transactionsApi/transactionsApi";
import { InputGrid } from "../FormAccount/FormAccount.styled";
import { useGetCategoriesQuery } from "redux/categoriesApi/categoriesApi";
import { useGetAccountsQuery } from "redux/accounts/accountsApi";
import { useChangeScreen } from "hooks/useChangeScreen";
import { SCREEN } from "constants/screenStatus";
import { useAppSelector } from "redux/reduxHooks";

type FormTransactionProps = {
  transactionData: ITransaction;
  formTypeEdit?: boolean;
};

type FormData = yup.InferType<typeof transactionSchema>;

export const FormTransaction: FC<FormTransactionProps> = ({ formTypeEdit, transactionData }) => {
  const handleChangeScreen = useChangeScreen();
  const [addTransaction, { isLoading: isAddingTransaction }] = useAddTransactionMutation();
  const [updateTransaction, { isLoading: isUpdatingTransaction }] = useUpdateTransactionMutation();
  const { data: userCategories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  const { data: userAccounts, isLoading: isLoadingAccounts } = useGetAccountsQuery();
  const transactionType = useAppSelector(({ transactionType }) => transactionType);
  
  const userCategoriesByType = userCategories?.filter(({ type }) => type === transactionType);

  const createDefaultValues = {
    account_id: '',
    date: getCurrentDate(),
    value: 0,
    comment: '',
    category_id: '',
  };

  // const editDefaultValues = {
  //   title: transactionData.title,
  //   icon: transactionData.icon,
  // };

  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(transactionSchema),
    defaultValues: createDefaultValues,
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    console.log(typeof data.comment)
    console.log({...data, type: transactionType});
    try {
      // if (!formTypeEdit) {
        await addTransaction({...data, type: transactionType}).unwrap();
      //   toast.info(`"${data.title}" category created`);
      // }
      // if (formTypeEdit) {
      //   await updateTransaction({ categoryID: transactionData._id, body: { type: transactionData.type, ...data } }).unwrap();
      //   toast.info(`"${data.title}" category updated`);
      // }
      handleChangeScreen(SCREEN["TRANSACTION.TABLE"])
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <WrapperInfo>
      <TitleMain fz="30px">{`New ${transactionType}`}</TitleMain>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <InputGrid>
          {/* <Input
            name={"account_id"}
            label={"Account"}
            autoFocus={true}
            control={control}
            error={errors?.account_id?.message}
          /> */}
          <InputSelectAccount
            name={"account_id"}
            label={"Account"}
            inputData={userAccounts}
            control={control}
            error={errors?.account_id?.message}
          />
          <Input
            name={"value"}
            label={"Value"}
            type={"number"}
            control={control}
            error={errors?.value?.message}
          />
        </InputGrid>
        <InputGrid>
          <Input
            name={"date"}
            label={"Date"}
            type={"date"}
            control={control}
            error={errors?.date?.message}
          />
          <Input
            name={"comment"}
            label={"Comment"}
            autoFocus={true}
            control={control}
            error={errors?.comment?.message}
          />
        </InputGrid>
        <WrapperButtons>
          <ButtonMain isDisabled={isAddingTransaction} type="submit">
            {formTypeEdit ? 'uodate' : 'create'}
          </ButtonMain>
          {formTypeEdit && 
            <ButtonMain onClick={() => handleChangeScreen(SCREEN["TRANSACTION.DELETE"])}>
              delete
            </ButtonMain>
          }
          <ButtonMain onClick={() => handleChangeScreen(SCREEN["TRANSACTION.TABLE"])}>
            back
          </ButtonMain>
        </WrapperButtons>
        <InputRadioCategories
          categoriesGroup={userCategoriesByType || []}
          name={"category_id"}
          label={"Choose category"}
          control={control}
          error={errors?.category_id?.message}
        />
        {/* <Input
            name={"category_id"}
            label={"Category"}
            autoFocus={true}
            control={control}
            error={errors?.category_id?.message}
          /> */}
      </Form>
      {isAddingTransaction && <SpinnerFixed />}
    </WrapperInfo>
  )
};