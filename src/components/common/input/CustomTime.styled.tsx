import styled, { css } from 'styled-components';

import { SCustomInputProps } from './CustomInput.props';

/* ////////////////////////////////////////////
                  Time
//////////////////////////////////////////// */
const LABEL_FONT_SIZE = '1.5rem';
const INPUT_FONT_SIZE = '1.4rem';

const HELP_COLOR = '#FF4545';

const DATE_HEIGHT = '48px';

export const SCustomTime = styled.div<SCustomInputProps>`
  width: 100%;
  position: relative;

  .custom-time-label {
    display: block;

    color: #000000;
    font-size: ${LABEL_FONT_SIZE};
    font-weight: 400;
    margin-bottom: 3px;
  }

  .custom-time-label-point {
    color: #ff0000;
    font-size: ${LABEL_FONT_SIZE};
    font-weight: 400;
  }

  .custom-time-container {
    width: 100%;
    height: ${DATE_HEIGHT};

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
  
    padding: 0 15px;

    border: 1px solid #e0e0e0;
    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: border-color 0.3s;

    background-color: #ffffff;

    cursor: pointer;

    p {
      color: #999999;
      font-size: ${INPUT_FONT_SIZE};
    }

    img {
      width: 18px;
      height: 18px;
      object-fit: cover;
      -webkit-user-drag: none;
    }

    &:hover {
      border-color: ${(props) => props.theme.main_color_slate_400};

      ${(props) =>
        props.color &&
        css`
          border-color: ${props.color};
        `};
    }

    &.active {
      border-color: ${(props) => props.theme.main_color_slate_500};

      ${(props) =>
        props.color &&
        css`
          border-color: ${props.color};
        `};
    }

    &.error {
      border-color: ${HELP_COLOR};
    }

    ${(props) =>
      props.disabled &&
      css`
        color: #949494;
        background-color: #f4f4f4;
        cursor: not-allowed;
      `}
  }
`;
