import styled, { css } from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

const PRODUCT_MAX_WIDTH = '688px';
const MAX_HEIGHT = '75vh';

export const SLessonReservationDrawer = styled.div<{ isOpen: boolean }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 5000000;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  ${(props) =>
    props.isOpen &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    `}

  .reservation-drawer-background {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;

    transition: all 225ms;

    ${(props) =>
      props.isOpen &&
      css`
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      `}
  }

  .reservation-drawer-container {
    width: ${PRODUCT_MAX_WIDTH};
    max-height: ${MAX_HEIGHT};

    min-height: 504px;

    left: 50%;
    bottom: 0;
    position: fixed;

    padding: 8px;

    background-color: ${(props) => props.theme.sub_color_slate_50};

    display: flex;
    flex-direction: column;

    overflow: hidden;
    border-radius: 11px 11px 0 0;

    transition: all 225ms;
    transform: translateX(-50%) translateY(100%);

    ${MOBILE} {
      width: 100%;
    }

    ${(props) =>
      props.isOpen &&
      css`
        opacity: 1;
        visibility: visible;
        pointer-events: auto;

        transform: translateX(-50%) translateY(0px);
      `}

    .reservation-drawer-header {
      width: 100%;
      height: 34px;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;

      border-bottom: 1px solid #eeeeee;
      padding-bottom: 10px;

      .reservation-drawer-close-button {
        width: 19px;
        height: 19px;

        svg {
          width: 100%;
          height: 100%;
          color: #868686;
        }
      }
    }

    .reservation-drawer-main {
      width: 100%;
      max-height: ${MAX_HEIGHT};

      flex: 1;
      padding-bottom: 71px;

      overflow-x: hidden;
      overflow-y: auto;

      .reservation-drawer-main-container {
        width: 100%;
        height: auto;
      }
    }
  }

  .lesson-bottombar-container {
    width: ${PRODUCT_MAX_WIDTH};

    left: 50%;
    bottom: 0;
    position: fixed;

    transform: translateX(-50%);

    padding: 10px 10px 20px;

    border-top: 1px solid rgba(33, 33, 33, 0.1);
    background-color: ${(props) => props.theme.sub_color_slate_50};

    display: flex;
    gap: 24px;

    overflow: hidden;

    opacity: 0;

    transition: all 225ms;

    z-index: 100000;

    ${(props) =>
      props.isOpen &&
      css`
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      `}

    ${MOBILE} {
      width: 100%;
      padding: 10px 10px 20px;

      gap: 8px;
    }
  }
`;
