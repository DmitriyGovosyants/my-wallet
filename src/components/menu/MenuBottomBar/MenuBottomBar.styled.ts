import styled from "@emotion/styled";
import { MdAdd, MdRemove } from 'react-icons/md';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 20px;

  background-color: ${p => p.theme.colors.bgMain};
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;

  font-size: 50px;

  background-color: white;
  border-radius: 50%;
`

export const RevenueIcon = styled(MdAdd)`

`

export const ExpenseIcon = styled(MdRemove)`

`