import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const SProductMap = styled.div`
  width: 100%;
  height: 440px;

  ${MOBILE} {
    width: 100%;
    height: auto;

    aspect-ratio: 1 / 1;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;
