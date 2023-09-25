import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const SMenuItem = styled.li`
  width: 88px;

  * {
    font-size: 1.4rem;
    font-family: OpenSans !important;
    font-weight: 600;
  }

  cursor: pointer;
  text-align: center;

  transition: opacity 0.15s;
  position: relative;

  &:hover {
    opacity: 0.5;
  }

  ${MOBILE} {
    width: 100%;
    height: 45px;
    padding: 0;

    text-align: left;

    a {
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    * {
      font-size: 1.4rem;
      font-weight: 600;
    }

    &:last-child {
      border: none;
    }
  }
`;
