import styled from "@emotion/styled";
import { Select } from "@mui/material";

export const CurrencyBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100dvh;
  padding-top: 100px;

  background-color: ${p => p.theme.colors.bgMain};
`

export const SelectStyled = styled(Select)`
  width: 100%;
  background-color: white;
  color: black;
`