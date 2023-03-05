import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { routesPath } from "router/routesPath";
import { useRegisterMutation } from "redux/auth/authApi";
import { registerSchema, IErrorAPI, requestErrorPopUp } from "utils";
import { ButtonMain, InputAuth, TitleMain, SpinnerFixed } from "components/ui";
import { AuthBackground, AuthWrapper, HelperText } from "./Auth.styled";

type FormData = yup.InferType<typeof registerSchema>;

export const Register: FC = () => {
  const [signUp, { isLoading }] = useRegisterMutation();
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  
  const onSubmit = async (data: FormData): Promise<void> => {
    const { name, email, password } = data;

    try {
      await signUp({
        email,
        name,
        password
      }).unwrap();
      toast.info(`${email} is registered`);
    } catch (e) {
      requestErrorPopUp(e as IErrorAPI);
    }
  };

  return (
    <>
      <AuthBackground>
        <AuthWrapper>
          <TitleMain>Register</TitleMain>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
          >
            <InputAuth
              name={"name"}
              label={"Name"}
              autoFocus={true}
              control={control}
              error={errors?.name?.message}
            />
            <InputAuth
              name={"email"}
              label={"Email"}
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
            <InputAuth
              name={"confirmPassword"}
              label={"Confirm Password"}
              type={"password"}
              control={control}
              error={errors?.confirmPassword?.message}
            />
            <ButtonMain isDisabled={isLoading} type="submit" marginTop="20px">
              Sign in
            </ButtonMain>
          </form>
          <HelperText>
            Already have an account?
            <NavLink to={routesPath.login} style={{ marginLeft: '10px', color: 'brown' }}><b>Login</b></NavLink>
          </HelperText>
        </AuthWrapper>
      </AuthBackground>
      {isLoading && <SpinnerFixed />}
    </>
  )
};