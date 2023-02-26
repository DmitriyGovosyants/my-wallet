import { FC } from "react";
import { ArrowBox, ArrowButton, LeftArrow, RightArrow } from "./NavArrow.styled";

type NavArrowProps = {
  direction: string;
}

export const NavArrow: FC<NavArrowProps> = ({ direction }) => {
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
      <ArrowButton onClick={handleDateChange}>
        {direction === 'left' && <LeftArrow />}
        {direction === 'right' && <RightArrow />}
      </ArrowButton>
    </ArrowBox>
  )
};