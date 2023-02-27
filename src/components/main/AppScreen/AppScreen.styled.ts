import styled from "@emotion/styled";

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
  height: 100dvh;
  background-color: ${p => p.theme.colors.bgMain};
`

export const CenterColumnGrid = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 8fr 1.5fr;
`

export const CenterGrid = styled.div`
  display: flex;
  padding: 12px;

  background-color: ${p => p.theme.colors.bgSecond};
  border-radius: 40px;
  box-shadow:
   inset 5px -5px 20px ${p => p.theme.colors.bgShadow},
   inset -5px 5px 20px ${p => p.theme.colors.bgShadow}
  ;
`