import styled from "@emotion/styled";

type IconListProps = {
  isHidden: boolean;
}

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`

export const IconList = styled.ul<IconListProps>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 1000px;

  &:not(:last-child) {
    margin-bottom: ${p => p.isHidden ? '0' : '50px'};
  }
`

export const IconItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
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