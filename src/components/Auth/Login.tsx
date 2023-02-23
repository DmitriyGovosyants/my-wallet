import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography, Box } from '@mui/material';

import { loginSchema } from "utils/formValidation";
import { routesPath } from "router/routesPath";
import { useLoginMutation } from "redux/authApi";
import { ErrorType, requestErrorPopUp } from "utils/requesErrorPopUp";
import { MainBox, TextFieldStyled } from "./Auth.styled";

type FormData = yup.InferType<typeof loginSchema>;

const Login: FC = () => {
  const [login, { isLoading: boolean }] = useLoginMutation();
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = async (data: FormData): Promise<void> => {
    const { email, password } = data;

    try {
      await login({ email, password }).unwrap();
      toast.info(`${email} is loged in`);
    } catch (e) {
      requestErrorPopUp(e as ErrorType);
    }
  };

  return (
    <MainBox>
      <Box
        sx={{
          '& > :not(style)': { width: '300px' },
          display: 'flex',
          flexDirection: 'column',
          pr: '180px',
          pt: '10%',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant="h3" sx={{ mb: '10px', color: 'white', textAlign: 'center', letterSpacing: 4 }}>Login</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <Controller
            name={"email"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextFieldStyled
                onChange={onChange}
                value={value}
                label="Email"
                variant="filled"
                autoFocus
                required
              />
            )}
          />
          <Typography sx={{ mb: '10px', color: 'red' }}>{errors.email?.message}</Typography>
          <Controller
            name={"password"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextFieldStyled
                onChange={onChange}
                value={value}
                type="password"
                label="Password"
                variant="filled"
                required
              />
            )}
          />
          <Typography sx={{ mb: '10px', color: 'red' }}>{errors.password?.message}</Typography>
          <Button type="submit" variant="text" sx={{
            backgroundColor: '#00bcd4',
            width: '100%',
            boxShadow: 3,
            color: 'white',
            fontSize: '20px',
            letterSpacing: 10,
            paddingTop: '10px',
            paddingBottom: '10px',
            marginTop: '10px'
          }}>Submit</Button>
        </Box>
        <Typography sx={{ mt: '20px', color: 'white' }}>
          Don't have an account?
          <NavLink to={routesPath.register} style={{ marginLeft: '10px', color: 'brown' }}><b>Register</b></NavLink>
        </Typography>
      </Box>
    </MainBox>
  )
};

export default Login;

