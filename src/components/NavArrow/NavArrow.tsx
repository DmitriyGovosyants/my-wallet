import { FC } from "react";
import { ArrowBox } from "./NavArrow.styled";

type NavArrowProps = {
  direction: string;
}

const NavArrow: FC<NavArrowProps> = ({ direction }) => {
  const handleDateChange = (): void => {
    if (direction === 'left') {
      handleDateBackward();
    }
    if (direction === 'right') {
      handleDateForward();
    }
  }

  const handleDateBackward = () => {
    console.log('Backward');
  }

  const handleDateForward = () => {
    console.log('Forward');
  }

  return (
    <ArrowBox>
      <button onClick={handleDateChange}>
        {direction === 'left' && 'L'}
        {direction === 'right' && 'R'}
      </button>
    </ArrowBox>
  )
};

export default NavArrow;