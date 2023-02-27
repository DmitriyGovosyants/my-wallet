import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";
import { Typography, Box, MenuItem, InputLabel } from '@mui/material';
import { ButtonSubmit } from "components/ui";
import { currencyData } from "data/currency";
import { currencySchema } from "utils/formValidation";
import { ErrorProps, requestErrorPopUp } from "utils/requesErrorPopUp";
import { CurrencyBox, SelectStyled } from "./CurrencySelection.styled";
import { useSetCurrencyMutation } from "redux/user/userApi";
import { redirect, useNavigate } from "react-router-dom";
import { routesPath } from "router/routesPath";

type FormData = yup.InferType<typeof currencySchema>;

export const CurrencySelection: FC = () => {
  const [setCurrency, { isLoading }] = useSetCurrencyMutation();
  // const navigate = useNavigate();
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
      console.log(currency);
      window.location.reload();
    } catch (e) {
      requestErrorPopUp(e as ErrorProps);
    }
  };

  return (
    <CurrencyBox>
      <Typography variant="h3" sx={{ mb: '40px', color: 'white', textAlign: 'center', letterSpacing: 4 }}>
        Choose your main currency
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Controller
          name={"currency"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <InputLabel id="demo-simple-select-standard-label">Choose currency</InputLabel>
              <SelectStyled
                value={value}
                onChange={onChange}
              >
                {Object.keys(currencyData).map((item) => (
                  <MenuItem key={item} value={item}>{item}</MenuItem>
                ))}
              </SelectStyled>
            </>
          )}
        />
        <Typography sx={{ mb: '10px', color: 'red' }}>{errors.currency?.message}</Typography>
        <ButtonSubmit />
      </Box>
    </CurrencyBox>
  )
}