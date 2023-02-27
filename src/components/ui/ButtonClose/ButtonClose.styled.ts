import styled from "@emotion/styled";
import { MdClose } from 'react-icons/md';

export const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;

  border-radius: 50%;
`

export const CloseIcon = styled(MdClose)`
  width: 30px;
  height: 30px;

  color: white;
  transition: color ${p => p.theme.animation.cubicBezier};

  :hover,
  :focus {
    color: black;
  }
`