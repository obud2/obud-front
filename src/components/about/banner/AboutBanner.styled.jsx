import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SAboutBanner = styled.div`
  width: 100%;

  .panel {
    aspect-ratio: 1 / 1;

    overflow: hidden;
    position: relative;

    margin-right: 30px;
    margin-bottom: 30px;

    ${MOBILE} {
      margin-right: 12px;
    }

    img {
      width: 100%;
      height: 100%;

      overflow: hidden;
      border-radius: 120px 120px 0 0;

      ${MOBILE} {
        border-radius: 65px 65px 0 0;
      }
    }
  }

  .flicking-pagination-bullet-active {
    background-color: ${(props) => props.theme.main_color_slate_400};
  }
`;
