import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SMain = styled.div`
  width: 100%;
  height: 100vh;

  position: relative;

  .main-render-banner-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #dddddd;

    .obud-main-video {
      width: 100%;
      height: 100%;
      object-fit: cover;

      pointer-events: none;
      -webkit-user-drag: none;
    }

    .obud-main-image {
      width: 100%;
      height: 100%;
      object-fit: cover;

      pointer-events: none;
      -webkit-user-drag: none;

      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 50%;
    }
  }

  .obud-main-shadow-container {
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;

    background-color: rgba(0, 0, 0, 0.25);
  }

  .obud-main-text-container {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: ${(props) => props?.theme?.sub_color_slate_50};

    text-align: center;

    ${MOBILE} {
      top: 30%;
      left: 50%;
      transform: translate(-50%, -35%);
    }

    button {
      color: ${(props) => props?.theme?.sub_color_slate_50};
      border-color: ${(props) => props?.theme?.sub_color_slate_50};
    }
  }

  .obud-main-text {
    display: none;

    font-size: 2.4rem;
    font-weight: 400;
    font-family: OpenSans !important;

    color: ${(props) => props?.theme?.sub_color_slate_50};
    opacity: 0.8;

    text-align: center;
    line-height: 140%;

    ${MOBILE} {
      display: block;

      font-size: 1.5rem;
      opacity: 0.6;
      white-space: nowrap;
    }
  }

  .obud-main-class-button {
    width: 160px;
    height: 42px;

    margin-top: 45px;
    opacity: 0.8;

    &:hover {
      background-color: rgba(218, 219, 214, 0.3) !important;
    }

    ${MOBILE} {
      width: 110px;
      height: 32px;

      margin-top: 15px;

      border: 1px solid rgba(218, 219, 214, 0.5) !important;
      color: ${(props) => props?.theme?.sub_color_slate_50} !important;
    }
  }

  .obud-active-logo-container {
    width: 300px;
    height: 300px;

    position: absolute;
    bottom: -150px;
    right: 100px;

    visibility: hidden;

    img {
      width: 100%;
      height: auto;
    }
  }
`;
