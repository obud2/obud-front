import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SJoinPortal = styled.div`
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

  .join-button {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.main_color_slate_200};
    color: ${(props) => props.theme.main_color_slate_300};
  }
`;
