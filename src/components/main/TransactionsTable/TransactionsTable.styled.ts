import styled from "@emotion/styled";

export const TransactionsTableList = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 1000px;
`

export const TransactionsTableItem = styled.li`
  :not(:last-child) {
    margin-bottom: 30px;
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`