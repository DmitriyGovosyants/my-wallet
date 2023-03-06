import { FC } from "react";
import { Title } from "./TitleMain.styled";

type TitleMainProps = {
  children: string;
  fz?: string;
  mb?: string;
}

export const TitleMain: FC<TitleMainProps> = ({fz = '40px', mb = '20px', children}) => {
  return <Title fz={fz} mb={mb}>{children}</Title>;
}