import styled, { css, keyframes } from 'styled-components';

import { SCustomButtonProps } from './CustomButton.props';
import { MOBILE } from 'src/styled/variablesStyles';

/* ////////////////////////////////////////////
                  Button
//////////////////////////////////////////// */

const FONT_SIZE = '1.4rem';
const MOBILE_FONT_SIZE = '1.4rem';

const BUTTON_HEIGHT = '40px';

const Action = keyframes`
    0% {
        width: 0px;
        height: 0px;    
        opacity: 0.15;
    }
    100% {
        width: 450px;
        height: 450px;  
        opacity: 0;
    }
`;

export const SCustomButton = styled.button<SCustomButtonProps>`
  overflow: hidden;
  position: relative;
  font-size: ${FONT_SIZE};

  padding: 5px;
  height: ${BUTTON_HEIGHT};
  color: ${(props) => props?.theme?.sub_color_slate_50};
  background-color: ${(props) => props?.theme?.main_color_slate_500};

  /* Modile Click Event */
  -webkit-tap-highlight-color: transparent;
  transition: all 0.3s;

  ${MOBILE} {
    font-size: ${MOBILE_FONT_SIZE};
  }

  .active {
    position: absolute;
    display: block;
    border-radius: 50%;
    pointer-events: none;
    background-color: ${(props) => props?.theme?.sub_color_slate_50};
    transform: translate(-50%, -50%);
    animation: ${Action} 0.6s linear;
  }

  &:focus-visible {
    outline: 1px solid #555555;
  }

  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.variant === 'outlined' &&
    css`
      background-color: transparent;
      color: ${(props) => props?.theme?.main_color_slate_300};
      border: 1px solid ${(props) => props?.theme?.main_color_slate_200};

      &:hover {
        opacity: 1;
        color: ${(props) => props?.theme?.sub_color_slate_50} !important;
        background-color: ${(props) => props?.theme?.main_color_slate_400};
        border: 1px solid ${(props) => props?.theme?.main_color_slate_400};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      color: #000000 !important;
      background-color: #e3e3e3 !important;
      border: 1px solid #cccccc !important;
      cursor: not-allowed;
    `}

  ${(props) =>
    props.borderRadius &&
    css`
      border-radius: ${props.borderRadius};
    `}
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
    `}
  ${(props) =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
  ${(props) =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}
  ${(props) =>
    props.borderColor &&
    css`
      border: 1px solid ${props.borderColor};
    `}
  ${(props) =>
    props.textColor &&
    css`
      color: ${props.textColor};
    `}
  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `}
  ${(props) =>
    props.fontWeight &&
    css`
      font-weight: ${props.fontWeight};
    `}
`;
