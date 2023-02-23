import styled from "@emotion/styled";

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
  height: 100vh;
  background-color: #72bf6a;
`

export const CenterColumnGrid = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 8fr 1.5fr;
  gap: 20px;
`

export const CenterGrid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 10fr 0.5fr;

  background-color: #acd8a7;
  border-radius: 40px;
  box-shadow:
   inset 5px -5px 20px #5bb450,
   inset -5px 5px 20px #5bb450
  ;
`