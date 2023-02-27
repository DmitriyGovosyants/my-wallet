import styled from "@emotion/styled";

export const Background = styled.div`
  background-color: ${p => p.theme.colors.bgMain};
`

export const StatusText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  font-size: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: white;
`