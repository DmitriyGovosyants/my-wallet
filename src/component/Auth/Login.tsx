import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Typography, Box } from '@mui/material';
import { NavLink } from "react-router-dom";
import { loginSchema } from "../../helpers/formValidation";
import { routesPath } from "../../router/routesPath";
import { MainBox, TextFieldStyled } from "./Auth.styled";

type FormData = yup.InferType<typeof loginSchema>;

export const Login = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const onSubmit = (data: FormData): void => {
    console.log(data);
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
                required
              />
            )}
          />
          <Typography sx={{mb: '10px', color: 'red'}}>{errors.email?.message}</Typography>
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
          <Typography sx={{mb: '10px', color: 'red'}}>{errors.password?.message}</Typography>
          <Button type="submit" variant="text" sx={{
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
          <NavLink to={routesPath.register} style={{marginLeft: '10px', color: 'brown'}}><b>Register</b></NavLink>
        </Typography>
      </Box>
    </MainBox>
  )
}