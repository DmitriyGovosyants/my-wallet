import styled from "@emotion/styled";

export const Button = styled.button`
  height: 50px;
  border: 2px solid white;
  transition:
    background-color ${p => p.theme.animation.cubicBezier}
  ;

  :hover,
  :focus {
    background-color: white;
  }
`