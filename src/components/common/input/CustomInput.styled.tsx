import styled, { css } from 'styled-components';

import { SCustomInputProps } from './CustomInput.props';

/* ////////////////////////////////////////////
                  Input
//////////////////////////////////////////// */

const INPUT_FONT_SIZE = '1.4rem';

const HELP_FONT_SIZE = '1.1rem';
const HELP_COLOR = '#EC3519';

const INPUT_HEIGHT = '40px';

export const SCustomInput = styled.div<SCustomInputProps>`
  width: 100%;
  position: relative;

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .custom-input-container {
    width: 100%;
    height: ${INPUT_HEIGHT};

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
      props.fontSize &&
      css`
        font-size: ${props.fontSize};
      `}
  
    padding: 0 15px 0 16px;

    border-radius: 0px;
    border: 1px solid ${(props) => props.theme.core_color_slate_50};

    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: border-color 0.2s;

    background-color: #ffffff;

    &:hover {
      border-color: ${(props) => props.theme.main_color_slate_500};
    }

    &.active {
      border-color: ${(props) => props.theme.main_color_slate_500};
    }

    &.error {
      border-color: ${HELP_COLOR};
    }

    ${(props) =>
      props.disabled &&
      css`
        color: #949494;
        border-color: #cccccc;
        background-color: #f4f4f4;
      `}

    input {
      width: 100%;
      height: 100%;

      color: #555555;
      font-size: ${INPUT_FONT_SIZE};

      outline: none;
      border: none;
      box-sizing: border-box;
      background-color: #ffffff;

      ${(props) =>
        props.disabled &&
        css`
          color: #949494;
          background-color: #f4f4f4;
        `}

      &::placeholder {
        color: #b5b5b5;
        font-size: 1.2rem;
      }
    }

    input[type='color'] {
      border-radius: 0px !important;
    }

    ${(props) =>
      props.variant === 'outlined' &&
      css`
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #e0e0e0;
        border-radius: 0;

        input {
          background-color: transparent;
        }

        .active {
          background-color: ${props?.theme?.main_color_slate_500};
        }
      `}
  }

  .help-text {
    color: ${HELP_COLOR};

    font-size: ${HELP_FONT_SIZE};
    font-weight: bold;

    letter-spacing: -0.28px;
    margin-top: 3px;
  }

  .password-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    color: #999999;
    cursor: pointer;

    &:focus-visible {
      outline: 1px solid ${(props) => props.theme.primary};
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
