import styled from "@emotion/styled";
import { MdDeleteForever, MdEdit } from "react-icons/md";

type TDataProps = {
  pos?: string;
  pad?: string;
}

export const Wrapper = styled.div`
  padding: 20px;
`

export const Table = styled.table`
  position: relative;
  display: grid;
  margin: 0 auto;
  max-width: 1000px;
  border: 1px solid white;
`

export const TableHead = styled.thead`
  position: sticky;
  top: 0;
  left: 0;
  background-color: aquamarine;
`

export const TableBody = styled.tbody`
  background-color: lightgreen;
`

export const TRow = styled.tr`
  display: grid;
  align-items: center;
  grid-template-columns: 80px 0.5fr 2fr 1fr 60px 60px;
  min-height: 80px;
`

export const THead = styled.th`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid white;
`

export const TData = styled.td<TDataProps>`
  display: flex;
  justify-content: ${p => p.pos || 'center'};
  padding-left: ${p => p.pad || 0};
  padding-right: ${p => p.pad || 0};
  align-items: center;
  width: 100%;
  height: 100%;

  font-size: 24px;
  font-weight: 500;
  text-align: center;
  border: 1px solid white;
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