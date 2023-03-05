import styled from "@emotion/styled";
import { MdDeleteForever, MdEdit } from "react-icons/md";

export const Table = styled.div`
  display: grid;
  margin: 0 auto;
  max-width: 800px;
`

export const RowGrid = styled.div`
  display: grid;
  grid-template-columns: 40px 1.5fr 1fr 1fr 40px 40px;
  gap: 12px;
`

export const TitleData = styled.div`
  padding: 10px;

  font-weight: 700;
  text-align: center;
  text-transform: uppercase;

  background-color: aquamarine;
`

export const RowData = styled.div`
  height: 40px;
  border-bottom: 1px solid white;
`

export const Text = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const AccountInterfaceBtn = styled.button`
  width: 100%;
  height: 100%;
`

export const EditIcon = styled(MdEdit)`
  width: 100%;
  height: 100%;

  color: green;
  transition: color ${p => p.theme.animation.cubicBezier};

  :hover,
  :focus {
    color: blue;
  }
`

export const DeleteIcon = styled(MdDeleteForever)`
  width: 100%;
  height: 100%;

  transition: color ${p => p.theme.animation.cubicBezier};
  color: green;

  :hover,
  :focus {
    color: red;
  }
`

export const ButtonBox = styled.div`
  margin-top: 40px;
  text-align: center;
`