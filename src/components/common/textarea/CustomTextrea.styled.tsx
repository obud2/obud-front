import styled, { css } from 'styled-components';

import { SCustomTextareaProps } from './CustomTextrea.props';

/* ////////////////////////////////////////////
                  Textarea
//////////////////////////////////////////// */

const LABEL_FONT_SIZE = '1.4rem';
const INPUT_FONT_SIZE = '1.4rem';

const INPUT_HEIGHT = '55px';

export const SCustomTextarea = styled.div<SCustomTextareaProps>`
  width: 100%;
  position: relative;

  .custom-textarea-label {
    display: block;

    color: ${(props) => props.theme.main_color_slate_300};
    font-size: ${LABEL_FONT_SIZE};
    font-weight: 700;
    margin-bottom: 3px;
  }

  .custom-input-label-point {
    color: #ff0000;
    font-size: ${LABEL_FONT_SIZE};
    font-weight: 400;
  }

  .custom-textarea-container {
    width: 100%;
    min-height: ${INPUT_HEIGHT};

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
  
    padding: 5px 15px 5px 5px;

    border-radius: 5px;
    border: 1px solid #e0e0e0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: border-color 0.3s;

    background-color: #ffffff;

    &:hover {
      border-color: ${(props) => props.theme.main_color_slate_500};
    }

    &.active {
      border-color: ${(props) => props.theme.main_color_slate_500};
    }

    ${(props) =>
      props.disabled &&
      css`
        color: #949494;
        border-color: #cccccc;
        background-color: #f4f4f4;
      `}

    textarea {
      width: 100%;
      height: 100%;

      color: #555555;
      font-size: ${INPUT_FONT_SIZE};

      outline: none;
      border: none;
      box-sizing: border-box;
      resize: none;

      ${(props) =>
        props.disabled &&
        css`
          color: #949494;
          background-color: #f4f4f4;
        `}

      &::placeholder {
        color: #999999;
        font-size: 0.9em;
      }
    }
  }
`;
