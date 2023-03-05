import styled from '@emotion/styled';

type TitleProps = {
  fz: string
}

export const Title = styled.h2<TitleProps>`
  margin-bottom: 20px;

  font-size: ${p => p.fz};
  letter-spacing: 0.04em;
  color: white;
`