import styled, { css, keyframes } from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

import { SModalProps } from './Modal.props';

/* ////////////////////////////////////////////
                    Modal
//////////////////////////////////////////// */

const modalAnimation = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`;

export const SModal = styled.div<SModalProps>`
  width: 100vw;
  height: 100vh;
  position: fixed;

  top: 0;
  left: 0;

  z-index: 90909090;

  display: none;
  visibility: hidden;
  opacity: 0;

  ${(props) =>
    props.open &&
    css`
      display: inline-block;
      visibility: unset;
      opacity: 1;
    `}

  .modal-background {
    width: 100vw;
    height: 100vh;
    background-color: #00000080;

    opacity: 0;

    overflow-y: hidden;
    overflow-x: none;

    position: fixed;
    z-index: 3000;

    text-align: center;

    ${(props) =>
      props.open &&
      css`
        opacity: 1;
      `}
  }

  .modal-container {
    min-width: 350px;
    max-width: 800px;

    height: auto;
    min-height: 104px;
    display: inline-block;

    margin: 80px auto;

    background-color: #ffffff;
    box-shadow: rgb(62 80 96 / 20%) 0px 4px 20px;

    border-radius: 3px;
    overflow: hidden;

    opacity: 0;
    transition: opacity 0.25s ease-out;

    z-index: 5000;
    position: relative;

    ${(props) =>
      props.open &&
      css`
        opacity: 1;
        animation: ${modalAnimation} 0.15s;
      `}

    ${MOBILE} {
      min-width: 96%;
      max-width: 96%;

      margin: 20px auto 300px;
    }
  }
`;
