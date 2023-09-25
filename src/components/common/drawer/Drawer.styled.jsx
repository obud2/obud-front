import styled, { css } from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const SDrawer = styled.div`
  top: 0;
  position: fixed;
  z-index: 999999;

  pointer-events: none;

  display: none;

  ${MOBILE} {
    display: block;
  }

  ${(props) =>
    props.open &&
    css`
      pointer-events: unset;
    `}

  .drawer-background {
    position: fixed;
    width: 100vw;
    height: 100vh;

    opacity: 0;
    background: #000;

    &.active {
      opacity: 0.8;
      transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
  }

  .drawer-main-container {
    width: 300px;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;

    z-index: 10;
    background-color: #ffffff;

    transform: translateX(-300px);
    transition: transform 300ms ease 0s;

    font-size: 1.4rem;

    &.active {
      transform: translateX(0);
    }
  }
`;
