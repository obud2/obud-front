import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SPolicyModal = styled.div`
  width: 600px;
  padding: 24px;
  text-align: initial;

  ${MOBILE} {
    width: 100%;
  }

  .policy-header {
    font-size: 1.8rem;
    font-weight: 700;

    line-height: 140%;
    margin-bottom: 24px;

    color: ${(props) => props.theme.main_color_slate_500};

    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .policy-close-btn {
    width: 24px;
    height: 24px;

    position: relative;
    cursor: pointer;

    &::after,
    &::before {
      content: '';

      position: absolute;

      top: 3px;
      left: 12px;

      width: 1px;
      height: 20px;

      opacity: 0.3;
      background-color: ${(props) => props.theme.main_color_slate_500};
    }

    &::after {
      transform: rotate(-45deg);
    }

    &::before {
      transform: rotate(45deg);
    }

    &:hover {
      &::after,
      &::before {
        opacity: 1;
      }
    }
  }

  .policy-data {
    font-size: 1.6rem;
    color: ${(props) => props.theme.main_color_slate_500};
  }
`;
