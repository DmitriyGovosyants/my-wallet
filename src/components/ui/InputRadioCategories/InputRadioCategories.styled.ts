import styled from "@emotion/styled";
import { RadioGroup } from "@mui/material";

export const RadioGroupStyled = styled(RadioGroup)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* gap: 10px; */
  
  & label {
    margin: 0;
    width: 20%;
    /* border: 2px solid rgb(21, 255, 192);
    border-radius: 10px;
    overflow: hidden;
    transition: border ${p => p.theme.animation.cubicBezier};

    :hover,
    :focus {
      border: 2px solid rgb(21, 105, 192);
    } */
  }

  & label span {
    width: 100%;
  }

  & label .Mui-checked + span {
    transition: background-color ${p => p.theme.animation.cubicBezier};
    background-color: #ffffff;
    border-radius: 20px;
  }
`

export const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  /* width: 100%; */
  padding-top: 6px;
  padding-bottom: 12px;

  border-left: 2px solid white;
  border-bottom: 2px solid white;
  border-radius: 20px;
  transition: background-color ${p => p.theme.animation.cubicBezier};
  cursor: pointer;

  :hover,
  :focus {
    background-color: rgba(255, 255, 255, 0.3);
  }
`

export const CategoryIcon = styled.img`
  width: 80px;
`