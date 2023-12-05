import styled, { css } from 'styled-components';
import { SCustomSelectProps } from './CustomSelect.props';

/* ////////////////////////////////////////////
                  Select
//////////////////////////////////////////// */

const SELECT_HEIGHT = '40px';

const SELECT_TEXT_FONT_SIZE = '1.5rem';
const ITEM_FONT_SIZE = '1.4em';

const HELP_COLOR = '#EC3519';

export const SCustomSelect = styled.div<SCustomSelectProps>`
  width: 100%;

  .select-container {
    width: 100%;
    height: ${SELECT_HEIGHT};

    margin: 3px 0;
    padding: 0 15px 0 5px;

    border: 1px solid ${(props) => props.theme.core_color_slate_50};

    transition: border-color 0.3s;
    cursor: pointer;

    position: relative;

    &:hover {
      border-color: #3f3f3f;
    }

    &.active {
      border-color: ${(props) => props.theme.main_color_slate_500};
    }

    &:focus-visible {
      outline: 1px solid ${(props) => props.theme.main_color_slate_200};
    }

    &.error {
      border-color: ${HELP_COLOR};
    }

    &.disabled {
      opacity: 0.8;
      cursor: not-allowed;

      &:hover {
        border-color: #e0e0e0;
      }
    }

    .select-text-arrow-container {
      width: 100%;
      height: 100%;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .select-text-box {
        min-width: 5px;
        min-height: 5px;

        outline: none;
        border: none;

        display: inline-block;
        color: #555555;

        font-size: ${SELECT_TEXT_FONT_SIZE};
        padding-left: 8px;
      }

      .arrow {
        width: 6px;
        height: 6px;
        border-bottom: 1px solid ${(props) => props.theme.main_color_slate_300};
        border-right: 1px solid ${(props) => props.theme.main_color_slate_300};
        transform: rotate(45deg);

        top: -3px;
        position: relative;
      }

      ${(props) =>
        props.textPosition === 'center' &&
        css`
          .select-text-box {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          &::before {
            content: '';
          }
        `}
    }
  }
`;

export const SSlectItemsBackground = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1010101010;
`;

export const SSelectItemsContainer = styled.div<{ readonly position: string }>`
  width: 100%;
  max-height: 320px;
  position: absolute;

  left: 0%;

  ${(props) =>
    props.position === 'top' &&
    css`
      bottom: 110%;
    `}

  ${(props) =>
    props.position === 'bottom' &&
    css`
      top: 110%;
    `}

  ${(props) =>
    props.position === 'middle' &&
    css`
      bottom: 110%;
    `}

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 1010101010;

  background-color: ${(props) => props.theme.sub_color_slate_50};
  border: 1px solid ${(props) => props.theme.main_color_slate_400};
  box-shadow: 1px 1px 4px 4px rgba(0, 0, 0, 5%);
`;

export const SSelectItems = styled.li`
  width: 100%;
  min-height: 40px;

  padding: 9px 10px;

  font-size: ${ITEM_FONT_SIZE};

  cursor: pointer;

  background-color: #ffffff;
  border-bottom: 1px solid #eeeeee;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  * {
    pointer-events: none;
  }

  & > input {
    width: 100%;
  }

  &:hover {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.04);
  }

  &.index {
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.04);
  }

  &.active {
    text-decoration: none;
    color: ${(props) => props.theme.sub_color_slate_50};
    background-color: ${(props) => props.theme.main_color_slate_200};
  }

  &.disabled {
    font-style: italic;
    color: #a4a4a4;
    background-color: ${(props) => props.theme.sub_color_slate_50};

    &:hover {
      text-decoration: none;
      background-color: ${(props) => props.theme.sub_color_slate_50};
      cursor: not-allowed;
    }
  }
`;
