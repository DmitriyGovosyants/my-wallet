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

export const CategoryTitle = styled.span`
  min-width: 280px;

  font-size: 26px;
  font-weight: 700;
`

export const CategoryCount = styled.span`
  min-width: 60px;
  padding-left: 4px;
  padding-right: 4px;

  font-size: 22px;
  text-align: center;

  border: 2px solid green;
  background-color: navajowhite;
  border-radius: 10px;
`

export const CategorySumm = styled.span`
  min-width: 220px;
  
  font-size: 24px;
  font-weight: 700;
  text-align: end;
`

export const TransactionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 120px;
  padding-top: 10px;
  padding-bottom: 10px;

  font-size: 24px;
  cursor: pointer;

  border-bottom: 1px solid lightgrey;

  transition: background-color ${p => p.theme.animation.cubicBezier};

  :hover,
  :focus {
    background-color: lightgrey;
  }

  ::before {
    content: "";
    display: inline-flex;
    width: 10px;
    height: 10px;
    margin-right: 20px;
    background-color: green;
    border-radius: 50%;
  }
`

export const TransactionValue = styled.span`
  min-width: 220px;
  margin-left: 264px;

  text-align: end;
`

export const TransactionComment = styled.span`
  margin-left: 30px;
`