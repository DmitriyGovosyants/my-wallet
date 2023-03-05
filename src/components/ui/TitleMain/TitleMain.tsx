import { FC } from "react";
import { Title } from "./TitleMain.styled";

type TitleMainProps = {
  children: string;
  fz?: string;
}

export const TitleMain: FC<TitleMainProps> = ({fz = '40px', children}) => {
  return <Title fz={fz}>{children}</Title>;
}