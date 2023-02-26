import styled from "@emotion/styled";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

export const ArrowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ArrowButton = styled.button`
  width: 100%;
  height: 50%;
`

export const LeftArrow = styled(MdOutlineArrowBackIos)`
  width: 100%;
  height: 100%;
  color: white;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transition:
    color ${p => p.theme.animation.cubicBezier},
    background-color ${p => p.theme.animation.cubicBezier}
  ;

  :hover,
  :focus {
    color: green;
    background-color: rgba(255,255,255, 10%);
  }
`

export const RightArrow = styled(MdOutlineArrowForwardIos)`
  width: 100%;
  height: 100%;
  color: white;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;

  :hover,
  :focus {
    color: green;
    background-color: rgba(255,255,255, 10%);
  }
`