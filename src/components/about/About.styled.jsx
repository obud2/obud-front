import styled, { keyframes } from 'styled-components';

import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from 'src/styled/variablesStyles';

const ABOUT_MAX_WIDTH = `${1168 + 30}px`;
const TABLET_ABOUT_MAX_WIDTH = `${1005 + 30}px`;

const IMG_ANI = keyframes`
   0% {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
   } 

   100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
   }
`;

const BANNER_ANI = keyframes`
   0% {
    opacity: 0;
   } 

   100% {
    opacity: 1;
   }
`;

export const SAbout = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 0 15px;

  margin: 0 auto;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  ${MOBILE} {
    max-width: 100%;
    padding: 0;
  }

  .obud-about-article {
    width: 100%;
    max-width: ${ABOUT_MAX_WIDTH};

    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    padding: 104px 15px;
    margin: 0 auto;

    ${TABLET} {
      max-width: ${TABLET_ABOUT_MAX_WIDTH};
    }

    ${MOBILE} {
      max-width: 100%;
      padding: 0 15px 24px;

      gap: 36px;
    }

    .about-section {
      width: 100%;
      height: 100%;

      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;

      ${MOBILE} {
        flex-direction: column;
        gap: 8px;
      }
    }

    .about-image-item {
      width: 80%;
      height: 80%;

      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;

      visibility: visible;

      animation: ${IMG_ANI} 2s;

      ${MOBILE} {
        height: 200px;
      }

      &.right {
        justify-content: flex-end;
      }

      &.left {
        justify-content: flex-start;
      }
    }

    .about-sloan {
      font-family: OpenSans !important;
      position: absolute;

      color: #565656;
      text-align: center;

      font-size: 1.9rem;
      line-height: 140%;

      ${TABLET} {
        font-size: 1.6rem;
      }

      ${MOBILE} {
        font-size: 1.4rem;
      }
    }
  }

  .about-line {
    width: 2px;
    height: 240px;

    margin: 0 auto;

    background-color: ${(props) => props.theme.main_color_slate_200};

    ${MOBILE} {
      width: 2px;
      height: 40px;
    }
  }

  .about-partner-place {
    width: 100%;

    margin: 104px 15px;

    text-align: center;

    ${MOBILE} {
      margin: 24px 0;
    }

    .partner-place-title {
      font-family: OpenSans !important;

      font-size: 1.6rem;
      font-weight: 700;
      line-height: 140%;

      color: ${(props) => props.theme.main_color_slate_300};
      margin-bottom: 16px;

      ${MOBILE} {
        font-size: 1.4rem;
      }
    }

    .partner-place-contents {
      font-size: 1.4rem;
      line-height: 140%;

      color: #565656;
      word-break: keep-all;

      ${MOBILE} {
        font-size: 1.3rem;
      }
    }
  }

  .about-us-banner-container {
    width: 100%;

    margin: 104px 15px;

    text-align: center;

    animation: ${BANNER_ANI} 2s;

    ${MOBILE} {
      padding: 0 15px;
      margin: 24px 0;
    }
  }
`;
