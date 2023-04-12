import styled from "@emotion/styled";

export const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  padding-left: 6px;
  padding-right: 6px;

  cursor: pointer;
`

export const CategoryIcon = styled.img`
  width: 60px;
`

export const CategoryTitle = styled.p`
  min-width: 200px;
  font-size: 26px;
`

export const CategoryCount = styled.span`
  padding-left: 4px;
  padding-right: 4px;
  font-size: 22px;
  text-align: center;
  border: 2px solid green;
  background-color: navajowhite;
  border-radius: 10px;
`

export const CategorySumm = styled.span`
  min-width: 120px;
  
  font-size: 22px;
  text-align: end;
`