import styled, { css } from 'styled-components';

import { SCheckBoxProps, SCustomCheckBoxProps } from './CustomCheckBox.props';

/* ////////////////////////////////////////////
                  CheckBox
//////////////////////////////////////////// */

const LABEL_FONT_SIZE = '1.3rem';
const MORE_FONT_SIZE = '1.3em';

const MORE_TITLE_SIZE = '1.3rem';
const MORE_MAX_WIDTH = '500px';

/**
 * Check 아이콘 디자인 수정 시 해당 박스 작업
 */
export const SCheckBox = styled.span<SCheckBoxProps>`
  min-width: 16px;
  height: 16px;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3px;
  border: 1px solid ${(props) => props.theme.main_color_slate_200};

  ${(props) =>
    props.isCheck &&
    css`
      background-color: ${props.theme.main_color_slate_500};
    `}

  .check-icons {
    display: inline-block;
    transform: rotate(45deg);
    height: 8px;
    width: 5px;
    top: -1px;

    position: relative;

    border-bottom: 1.5px solid #ffffff;
    border-right: 1.5px solid #ffffff;

    transition: border-color 0.13s;

    ${(props) =>
      props.isCheck &&
      css`
        border-bottom: 1.5px solid #ffffff;
        border-right: 1.5px solid #ffffff;
      `}
  }
`;

export const SCustomCheckBox = styled.div<SCustomCheckBoxProps>`
  width: auto;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  .label {
    font-size: ${LABEL_FONT_SIZE};
    font-weight: 400;

    margin-left: 7px;

    cursor: pointer;
  }

  .check-box-more {
    color: #195fad;
    font-size: ${MORE_FONT_SIZE};
    text-decoration: underline;
    cursor: pointer;
    margin-left: 3px;

    &:focus-visible {
      outline: 1px solid #555555;
    }
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;

export const SCustomCheckBoxMore = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;

  background-color: #f9f9f9;
  z-index: 909090909090;

  .checkbox-more-header {
    height: 60px;
    max-width: 500px;

    margin: 0 auto;

    font-size: 1.5rem;
    background-color: #ffffff;

    border-bottom: 1px solid #ededed;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    padding: 0 15px;

    .more-box-title {
      position: absolute;

      font-size: ${MORE_TITLE_SIZE};
      font-weight: bold;

      left: 50%;
      transform: translateX(-50%);
    }

    .close-btn {
      width: 24px;
      height: 24px;

      position: relative;

      &::after,
      &::before {
        content: ' ';

        position: absolute;

        top: 3px;
        left: 12px;

        width: 1px;
        height: 20px;

        background-color: #000;
      }

      &::after {
        transform: rotate(-45deg);
      }

      &::before {
        transform: rotate(45deg);
      }
    }
  }

  .innerHtml {
    max-width: ${MORE_MAX_WIDTH};
    height: calc(100vh - 60px);

    margin: 0 auto;

    font-size: 1.5rem;
    background-color: #ffffff;

    overflow-y: scroll;
    overflow-x: hidden;
    padding: 26px 18px;

    white-space: pre-line;
  }
`;
