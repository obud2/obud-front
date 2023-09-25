import styled, { css } from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SShareBox = styled.div`
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
    props.isOpen &&
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

    overflow-y: auto;
    overflow-x: none;

    position: fixed;
    z-index: 3000;

    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) =>
      props.isOpen &&
      css`
        opacity: 1;
      `}
  }

  .modal-container {
    width: 308px;
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

    ${MOBILE} {
      width: 85%;
      margin: 0 auto;
    }

    ${(props) =>
      props.isOpen &&
      css`
        opacity: 1;
      `}
  }

  .modal-header {
    width: 100%;
    padding: 16px 18px 12px 18px;

    font-size: 1.5rem;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .close-button {
      width: 18px;
      height: 18px;

      position: relative;

      &::after,
      &::before {
        content: ' ';

        position: absolute;

        top: 0px;
        left: 9px;

        width: 1px;
        height: 18px;

        background-color: #000;
      }

      &::after {
        transform: rotate(-45deg);
      }

      &::before {
        transform: rotate(45deg);
      }
    }
  }

  .modal-main {
    width: 100%;
    padding: 16px 18px 12px 18px;

    .sns-share-icons {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }

    .sns-share-icon {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      font-size: 1.2rem;

      cursor: pointer;
    }
  }

  .modal-footer {
    width: 100%;
    padding: 16px 18px 12px 18px;

    .modal-share-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      box-shadow: none;
      border: 1px solid rgba(155, 155, 155, 0.4);
      border-radius: 0;

      font-size: 1.35rem;

      .modal-share-input-box {
        width: 100%;
        height: 34px;

        color: #212121;
        padding: 6px 12px;

        border: none;
        outline: none;
        border-right: 1px solid rgba(155, 155, 155, 0.4);
        background-color: #eee;
      }

      .modal-share-button {
        width: 60px;
        height: 34px;

        color: #212121;
      }
    }
  }
`;
