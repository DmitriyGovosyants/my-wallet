import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Typography, Box } from '@mui/material';

import { registerSchema } from "utils/formValidation";
import { routesPath } from "router/routesPath";
import { useRegisterMutation } from "redux/authApi";
import { MainBox, TextFieldStyled } from "./Auth.styled";

type FormData = yup.InferType<typeof registerSchema>;

const Register = () => {
  const [signUp, { isLoading: boolean }] = useRegisterMutation();
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (data: FormData) => {
    const { name, email, password } = data;

    try {
      await signUp({email, name, password}).unwrap();
      toast.info(`${email} is registered`);
    } catch (error) {
      console.log(error);
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
        <Typography variant="h3" sx={{ mb: '10px', color: 'white', textAlign: 'center', letterSpacing: 4 }}>Register</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextFieldStyled
                onChange={onChange}
                value={value}
                label="Name"
                variant="filled"
                required
                autoFocus
              />
            )}
          />
          <Typography sx={{mb: '10px', color: 'red'}}>{errors.name?.message}</Typography>
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
          <Controller
            name={"confirmPassword"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextFieldStyled
                onChange={onChange}
                value={value}
                type="password"
                label="Confirm Password"
                variant="filled"
                required
              />
            )}
          />
          <Typography sx={{mb: '10px', color: 'red'}}>{errors.confirmPassword?.message}</Typography>
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
          Already have an account?
          <NavLink to={routesPath.login} style={{marginLeft: '10px', color: 'brown'}}><b>Login</b></NavLink>
        </Typography>
      </Box>
    </MainBox>
  )
}

export default Register;