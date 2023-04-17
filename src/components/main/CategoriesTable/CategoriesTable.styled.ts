import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
`

export const IconList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  &:not(:last-child) {
    margin-bottom: 50px;
  }
`

export const IconItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 20%;
  padding-top: 6px;
  padding-bottom: 12px;

  border-left: 2px solid white;
  border-bottom: 2px solid white;
  border-radius: 20px;
  transition: background-color ${p => p.theme.animation.cubicBezier};
  cursor: pointer;

  :hover,
  :focus {
    background-color: rgba(255, 255, 255, 0.3);
  }
`

export const CategoryIcon = styled.img`
  width: 80px;
`