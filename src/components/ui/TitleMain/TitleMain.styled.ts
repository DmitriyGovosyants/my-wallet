import styled from '@emotion/styled';

type TitleProps = {
  fz: string;
  mb: string;
}

export const Title = styled.h2<TitleProps>`
  margin-bottom: ${p => p.mb};

  font-size: ${p => p.fz};
  letter-spacing: 0.04em;
  color: green;
`