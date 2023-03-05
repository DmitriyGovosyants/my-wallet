import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { routesPath } from "router/routesPath";
import { useLoginMutation } from "redux/auth/authApi";
import { loginSchema,IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, InputAuth, TitleMain, SpinnerFixed } from "components/ui";
import { AuthBackground, AuthWrapper, HelperText } from "./Auth.styled";

type FormData = yup.InferType<typeof loginSchema>;

export const Login: FC = () => {
  const [login, { isLoading }] = useLoginMutation();
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
      toast.info(`${email} is logged in`);
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <>
      <AuthBackground>
        <AuthWrapper>
          <TitleMain>Login</TitleMain>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
          >
            <InputAuth
              name={"email"}
              label={"Email"}
              autoFocus={true}
              control={control}
              error={errors?.email?.message}
            />
            <InputAuth
              name={"password"}
              label={"Password"}
              type={"password"}
              control={control}
              error={errors?.password?.message}
            />
            <ButtonMain isDisabled={isLoading} type="submit" marginTop="20px">
              Log in
            </ButtonMain>
          </form>
          <HelperText>
            Don't have an account?
            <NavLink to={routesPath.register} style={{ marginLeft: '10px', color: 'brown' }}><b>Register</b></NavLink>
          </HelperText>
        </AuthWrapper>
      </AuthBackground>
      {isLoading && <SpinnerFixed />}
    </>
  )
};

