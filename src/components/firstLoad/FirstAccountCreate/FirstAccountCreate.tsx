import { FC } from "react";
import { FormAccount, TitleMain } from "components/ui";
import { Wrapper } from "./FirstAccountCreate.styled";

export const FirstAccountCreate: FC = () => {
  return (
    <Wrapper>
      <TitleMain>Create your first account</TitleMain>
      <FormAccount />
    </Wrapper>
  )
};