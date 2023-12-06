import styled, { css } from 'styled-components';

import { MAX_WIDTH, TABLET_MAX_WIDTH, TABLET, MOBILE, PW, PM } from 'src/styled/variablesStyles';

export const TopbarHeight = '9.2rem';
export const TopbarMobileHeight = '5.6rem';

export const FooterHeight = '25.0rem';
export const FooterMobileHeight = '38.1rem';

export const NAVIGATION_HEIGHT = '5.5rem';

/* ////////////////////////////////////////////
                  Header
//////////////////////////////////////////// */
export const HeaderContainer = styled.header<{ headerPosition?: string; hide?: boolean }>`
  width: 100%;

  z-index: 999;
  pointer-events: auto;
  position: relative;

  background-color: transparent;
  border-bottom: 0.5px solid;
  border-color: rgba(171, 182, 165, 0.2);

  ${(props) =>
    props.headerPosition === 'absolute' &&
    css`
      top: 0;
      position: absolute;
      border-color: transparent;
    `}

  ${(props) =>
    props.hide &&
    css`
      display: none;
    `}
`;

/* ////////////////////////////////////////////
                  Topbar
//////////////////////////////////////////// */
export const TopbarContainer = styled.div<{ topbarPosition?: string; topbarReverse?: boolean; theme: any }>`
  width: 100%;
  height: ${TopbarHeight};

  display: flex;
  align-items: flex-end;
  justify-content: center;

  position: relative;

  ${MOBILE} {
    height: ${TopbarMobileHeight};
  }

  .topbar-web-container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: flex-start;

    .topbar-top {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 1.3rem;
      color: #eaebe6;

      padding-top: 4px;
      padding-bottom: 4px;
      height: 34px;

      border-bottom: 1px solid rgba(218, 219, 214, 0.5);

      &.reverse {
        background-color: ${(props) => props.theme.main_color_slate_500};
      }
    }

    .topbar-bottom {
      width: 100%;
      max-width: ${MAX_WIDTH};

      padding: 8px 15px;
      height: 56px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      ${TABLET} {
        max-width: ${TABLET_MAX_WIDTH};
      }
    }

    .topbar-group {
      min-width: 270px;

      display: flex;
      align-items: center;

      &.center {
        width: 100%;
      }
    }
  }

  .topbar-mobile-container {
    width: 100%;
    height: 100%;

    padding: 0 15px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: relative;

    .topbar-title {
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 150%;
      letter-spacing: -0.34px;

      left: 50%;
      position: absolute;
      transform: translateX(-50%);
    }
  }
`;

/* ////////////////////////////////////////////
                    Main
//////////////////////////////////////////// */
export const MainContainer = styled.main`
  width: 100%;
  min-height: calc(100vh - ${TopbarHeight});
`;

/* ////////////////////////////////////////////
                    Footer
//////////////////////////////////////////// */
export const FooterContainer = styled.footer`
  width: 100%;

  height: ${FooterHeight};
  font-size: 1.3rem;

  border-top: 0.5px solid ${(props) => props.theme.sub_color_slate_100};
  background-color: ${(props) => props.theme.sub_color_slate_50};

  position: relative;

  ${MOBILE} {
    padding-bottom: ${NAVIGATION_HEIGHT};
    height: calc(${FooterMobileHeight} + ${NAVIGATION_HEIGHT});
  }

  .footer-arrow-top-button {
    display: none;

    ${MOBILE} {
      display: flex;
      align-items: center;
      justify-content: center;

      top: 7px;
      right: 9px;
      position: absolute;

      width: 38px;
      height: 38px;

      border: 1px solid #e2e6e9;
      border-radius: 5px;

      svg {
        width: 22px;
        height: 22px;
        color: #646464b9;
        pointer-events: none;
      }
    }
  }

  .footer-info-container {
    width: 100%;
    height: 100%;
    max-width: ${MAX_WIDTH};

    padding: ${PW};
    margin: 0 auto;

    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    ${TABLET} {
      padding: ${PM};
      max-width: ${TABLET_MAX_WIDTH};
    }

    ${MOBILE} {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }

  .footer-logo-container {
    width: 25%;

    display: inline-flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    margin: 20px 0;
    gap: 16px;

    ${MOBILE} {
      width: 100%;
      margin-bottom: 30px;
      align-items: flex-start;
    }

    .footer-logo {
      width: 73.2px;
      height: 25.2px;

      position: relative;

      ${MOBILE} {
        width: 56px;
        height: 18.91px;
      }
    }

    .footer-sns-icons {
      width: auto;
    }
  }

  .footer-contents-container {
    width: 75%;
    word-break: keep-all;
    margin: 20px 0;

    color: ${(props) => props.theme.sub_color_slate_700};
    gap: 10px;
    display: flex;
    flex-direction: column;

    ${MOBILE} {
      width: 100%;
    }

    .footer-contact-menu-items {
      gap: 20px;
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;
    }

    .footer-button {
      cursor: pointer;
    }

    .footer-service-info {
      display: flex;
      gap: 7px;
      align-items: center;

      .footer-service-center {
        font-size: 1.5rem;
      }

      .footer-service-button {
        display: flex;
        align-items: center;

        font-size: 0.9rem;
        height: 2.1rem;

        line-height: 1;
        

        background-color: #e4e4e4;
        border-radius: 5px;
        padding: 0 5px;
        padding-top: 1px;

        a {
          color: #000;
        }
      }
    }

    .footer-service-hour {
      font-size: 1rem;
      padding-left: 1px;
    }

    div {
      font-size: 1.5rem;
    }

    span {
      font-size: 1.1rem;
      line-height: 140%;

      display: inline-flex;
      align-items: center;
    }

    .line {
      width: 1px;
      height: 10px;

      display: inline-block;

      background-color: ${(props) => props.theme.core_color_slate_50};
      margin: 0 4px;
    }

    .line-change {
      width: 100%;
      height: 8px;
      display: block;

      &.small {
        height: 3px;
      }

      ${MOBILE} {
        width: 100%;
        height: 0px;
      }
    }
  }
`;
