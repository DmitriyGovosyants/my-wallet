import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";
import { ButtonMain, InputSelect, TitleMain, SpinnerFixed } from "components/ui";
import { useSetCurrencyMutation } from "redux/settingsApi/settingsApi";
import { currencyData } from "data/currencyData";
import { currencySchema,IErrorAPI, requestErrorPopUp } from "utils";
import { CurrencyWrapper, Form } from "./MainCurrencySelect.styled";

type FormData = yup.InferType<typeof currencySchema>;

export const MainCurrencySelect: FC = () => {
  const [setCurrency, { isLoading }] = useSetCurrencyMutation();
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(currencySchema),
    defaultValues: {
      currency: '',
    },
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    const { currency } = data;
    
    try {
      await setCurrency({ currency }).unwrap();
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <>
      <CurrencyWrapper>
        <TitleMain>Choose your main currency</TitleMain>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <InputSelect
            name={"currency"}
            label={"Currency"}
            inputData={currencyData}
            control={control}
            error={errors?.currency?.message}
          />
          <ButtonMain isDisabled={isLoading} type="submit" marginTop="40px">
            Add
          </ButtonMain>
        </Form>    
      </CurrencyWrapper>
      {isLoading && <SpinnerFixed />}
    </>
  )
}