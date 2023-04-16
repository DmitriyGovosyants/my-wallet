import styled from "@emotion/styled";

// type IconListProps = {
//   isHidden: boolean;
// }

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`

export const IconList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  /* display: grid;
  grid-template-columns: repeat(5, 1fr); */
  /* gap: 10px; */
  width: 1000px;

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