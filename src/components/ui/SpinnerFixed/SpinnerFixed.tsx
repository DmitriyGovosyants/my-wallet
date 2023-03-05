import { FC } from 'react';
import { createPortal } from 'react-dom';
import { Dna } from 'react-loader-spinner';
import { SpinnerWrapper } from './SpinnerFixed.styled';

const spinnerRoot = document.querySelector('#spinner-root');

export const SpinnerFixed: FC = () => {
  return createPortal(
    <SpinnerWrapper>
      <Dna
        visible={true}
        height={'100'}
        width={'100'}
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </SpinnerWrapper>,
    spinnerRoot as HTMLElement
  );
};