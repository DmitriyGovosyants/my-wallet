import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100dvh;
  padding-top: 100px;

  background-color: ${p => p.theme.colors.bgSecond};
`