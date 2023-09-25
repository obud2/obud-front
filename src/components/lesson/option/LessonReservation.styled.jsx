import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

const PRODUCT_MAX_WIDTH = '688px';

export const SLessonReservation = styled.section`
  width: 100%;

  ${MOBILE} {
    margin: 0;
  }

  .lesson-bottombar-container {
    width: ${PRODUCT_MAX_WIDTH};

    position: relative;

    background: #fdfdfd;

    position: fixed;
    bottom: 0;
    left: 50%;

    padding: 10px 10px 20px;

    transform: translateX(-50%);

    z-index: 100000;
    border-radius: 11px 11px 0 0;

    border: 1px solid #eeeeee;
    box-shadow: 0px -4px 15px rgba(0, 0, 0, 0.05);

    ${MOBILE} {
      width: 100%;
      border-radius: 0;
    }
  }

  .lesson-bottombar-header {
    width: 100%;
    height: 34px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    border-bottom: 1px solid #eeeeee;
    padding-bottom: 10px;
    margin-bottom: 10px;

    ${MOBILE} {
      display: none;
    }

    .lesson-drawer-close-button {
      width: 19px;
      height: 19px;

      svg {
        width: 100%;
        height: 100%;
        color: #868686;
      }
    }
  }

  .lesson-bottombar-box {
    width: 100%;

    background-color: #ffffff;

    overflow: hidden;

    gap: 24px;

    display: flex;
    align-items: center;

    ${MOBILE} {
      width: 100%;
      gap: 8px;

      padding: 0;
    }
  }
`;
