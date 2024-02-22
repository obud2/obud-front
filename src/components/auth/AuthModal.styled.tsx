import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SAuthModal = styled.div`
  width: 370px;
  padding: 40px 20px;

  ${MOBILE} {
    width: 100%;

    padding: 30px 15px;
  }

  .auth-header {
    font-size: 2.1rem;
    font-weight: 700;

    line-height: 140%;
    margin-bottom: 18px;

    color: ${(props) => props.theme.main_color_slate_500};

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    ${MOBILE} {
      font-size: 2rem;
    }
  }

  .auth-main {
    width: 100%;
    margin-top: 30px;

    ${MOBILE} {
      margin-top: 31px;
    }
  }

  .auth-close-btn {
    width: 24px;
    height: 24px;

    top: -24px;
    right: 0px;
    position: absolute;

    cursor: pointer;

    ${MOBILE} {
      top: -17px;
      right: 3px;
    }

    &::after,
    &::before {
      content: '';

      position: absolute;

      top: 3px;
      left: 12px;

      width: 1px;
      height: 20px;

      background-color: ${(props) => props.theme.main_color_slate_500};
      opacity: 0.3;
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
`;
