import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SLogin = styled.div`
  width: 100%;

  ${MOBILE} {
    height: 80vh;
  }

  .login-line {
    width: 100%;

    position: relative;

    font-size: 1.3rem;
    color: #555555;

    margin: 25px 0;

    display: flex;
    align-items: center;
    justify-content: center;

    .line-text {
      margin: 0 10px;
    }

    &::after,
    &::before {
      content: '';

      flex: 1;
      width: 100%;
      height: 1px;
      background-color: #e7eaee;
    }
  }

  .obut-auto-container {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 16px;

    button {
      font-size: 1.3rem;
      font-weight: 400;
      line-height: 100%;

      display: flex;
      align-items: center;
      text-align: center;

      color: #565656;
    }
  }
`;
