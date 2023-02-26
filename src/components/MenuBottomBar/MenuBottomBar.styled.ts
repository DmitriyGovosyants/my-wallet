import styled from "@emotion/styled";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 20px;

  background-color: #72bf6a;
`

export const InfoBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`

export const InfoData = styled.span`
  font-size: 30px;
  color: white;
`

export const AddButton = styled.button`
  width: 80px;
  height: 80px;

  font-size: 50px;

  background-color: white;
  border-radius: 50%;
`