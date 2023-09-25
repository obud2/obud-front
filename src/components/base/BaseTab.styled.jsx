import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SBaseTab = styled.div`
  width: 100%;

  .base-tab-container {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 20px;

    ${MOBILE} {
      flex-direction: row;
    }
  }

  .tab-item {
    font-size: 1.3rem;
    font-weight: 400;
    font-family: OpenSans !important;

    line-height: 100%;

    display: flex;
    align-items: center;

    color: ${(props) => props.theme.main_color_slate_300};

    padding-left: 24px;

    cursor: pointer;

    position: relative;

    transition: all 0.3s;

    ${MOBILE} {
      padding: 8px;

      font-size: 1.4rem;
      font-weight: 400;
    }

    &::before {
      content: '';
      width: 3px;
      height: 100%;

      left: 0;
      position: absolute;

      background-color: #ffffff;
      transition: background-color 0.3s;

      ${MOBILE} {
        width: 100%;
        height: 1px;

        left: 0;
        bottom: 0;
      }
    }

    &.active {
      color: ${(props) => props.theme.main_color_slate_500};

      &::before {
        content: '';
        background-color: ${(props) => props.theme.main_color_slate_500};
      }
    }
  }
`;
