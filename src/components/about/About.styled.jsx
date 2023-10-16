import styled, { keyframes } from 'styled-components';

import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from 'src/styled/variablesStyles';

const ABOUT_MAX_WIDTH = `${1168 + 30}px`;
const TABLET_ABOUT_MAX_WIDTH = `${1005 + 30}px`;

export const SAbout = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 0 15px;

  margin: 0 auto;
  margin-top: 60px;

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
    align-items: flex-start;
    justify-content: center;

    padding: 104px 15px;
    margin: 0 auto;

    ${TABLET} {
      max-width: ${TABLET_ABOUT_MAX_WIDTH};
    }

    ${MOBILE} {
      max-width: 100%;
      padding: 80px 15px 24px;

      flex-direction: column;

      gap: 36px;
    }

    .about-section {
      width: 100%;
      height: 100%;

      position: relative;

      display: flex;
      flex-direction: column;
      justify-content: center;

      ${MOBILE} {
        flex-direction: column;
        gap: 8px;
        align-items: center;
      }

      .about-slogan {
        font-size: 30px;
        margin-bottom: 15px;

        ${MOBILE} {
          font-size: 2.3rem;
          margin-bottom: 0px;
        }
      }

      .about-slogan-sub {
        letter-spacing: 4px;
        margin: 0 0 90px 0;
        font-size: 22px;

        ${MOBILE} {
          font-size: 1.2rem;
          letter-spacing: 2px;
        }
      }

      .app-download-section {
        display: flex;
        gap: 25px;
      }
    }
  }
`;
