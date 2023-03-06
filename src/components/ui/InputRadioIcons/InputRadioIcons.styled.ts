import styled from "@emotion/styled";
import { RadioGroup } from "@mui/material";

export const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;

  & label {
    margin: 0;
    border: 2px solid rgb(21, 255, 192);
    border-radius: 10px;
    overflow: hidden;
    transition: border ${p => p.theme.animation.cubicBezier};

    :hover,
    :focus {
      border: 2px solid rgb(21, 105, 192);
    }
  }

  & label .Mui-checked + span {
    background-color: #ffffff;
  }
`

export const Icon = styled.img`
  width: 60px;
  height: 60px;
`