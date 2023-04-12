import { FC } from "react";
import { useAppDispatch, useAppSelector } from "redux/reduxHooks";
import { ArrowBox, ArrowButton, LeftArrow, RightArrow } from "./NavArrow.styled";
import { choseDate } from "redux/chosesDate/chosesDateSlice";

type NavArrowProps = {
  direction: string;
}

export const NavArrow: FC<NavArrowProps> = ({ direction }) => {
  const screenStatus = useAppSelector(({ screenStatus }) => screenStatus);
  const {year, month} = useAppSelector(({ chosesDate }) => chosesDate);
  const dispatch = useAppDispatch();

  const handleDateChange = (): void => {
    if (direction === 'left') {
      handleDateBackward();
    }
    if (direction === 'right') {
      handleDateForward();
    }
  }

  const handleDateBackward = () => {
    if (month === 1) {
      dispatch(choseDate({ year: year - 1, month: 12 }));
      return;
    }
    dispatch(choseDate({ year: year, month: month - 1 }));
  }

  const handleDateForward = () => {
    if (month === 12) {
      dispatch(choseDate({ year: year + 1, month: 1 }));
      return;
    }
    dispatch(choseDate({ year: year, month: month + 1 }));
  }

  return (
    <ArrowBox screenStatus={screenStatus}>
      <ArrowButton onClick={handleDateChange}>
        {direction === 'left' && <LeftArrow />}
        {direction === 'right' && <RightArrow />}
      </ArrowButton>
    </ArrowBox>
  )
};