import { MOBILE } from 'src/styled/variablesStyles';

import styled from 'styled-components';

export const SLogo = styled.div`
  width: 7.732rem;
  min-width: 7.732rem;
  height: 2.589rem;

  position: relative;

  cursor: pointer;
  background-color: transparent;

  overflow: hidden;

  transition: all 0.3s;

  ${MOBILE} {
    width: 5.775rem;
    min-width: 5.775rem;
    height: 1.9667rem;
  }

  .logo-title {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }

  img {
    transition: all 0.3s;
    background-color: transparent;
    /* object-fit: cover; */
  }
`;
