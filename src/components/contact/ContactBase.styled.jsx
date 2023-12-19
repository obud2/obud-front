import styled, { keyframes } from 'styled-components';

import { TABLET, MOBILE } from 'src/styled/variablesStyles';

const CONTACT_MAX_WIDTH = `${1168 + 30}px`;
const TABLET_CONTACT_MAX_WIDTH = `${1095 + 30}px`;

const LineAnimation = keyframes`
  0%{ 
    width: 10px;
  }
  100% {
    width: 83px;
  }
  `;

export const SContactBase = styled.div`
  width: 100%;
  max-width: ${CONTACT_MAX_WIDTH};

  padding: 0 15px;
  padding-top: 60px;
  padding-bottom: 104px;

  margin: 0 auto;

  ${TABLET} {
    max-width: ${TABLET_CONTACT_MAX_WIDTH};
  }

  ${MOBILE} {
    width: 100%;

    padding: 0 15px;
    padding-top: 0;
    padding-bottom: 40px;
  }

  .obud-title-container {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .obud-title {
      width: 200px;
      height: auto;

      font-size: ${(props) => props.fontSize || '1.6rem'};
      font-weight: 600;
      font-family: OpenSans !important;
      padding-bottom: 16px;

      text-align: center;

      ${MOBILE} {
        font-size: 2rem;
        border-bottom: none;

        padding: 24px 0 0;
        margin-bottom: 24px;
      }
    }

    .title-line {
      width: 83px;
      height: 0.5px;
      background-color: ${(props) => props.theme.main_color_slate_200};

      animation: ${LineAnimation} 0.7s ease-in-out;

      ${MOBILE} {
        width: 160px;
      }
    }
  }

  .obud-about-article {
    width: 100%;
    position: relative;

    margin-top: 54px;

    .about-login-check {
      width: 50%;
      height: 100%;

      position: absolute;
      top: 0;
      right: 0;

      z-index: 10;

      ${MOBILE} {
        width: 100%;
      }
    }
  }
`;
