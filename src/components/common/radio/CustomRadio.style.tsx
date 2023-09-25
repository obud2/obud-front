import styled, { css } from 'styled-components';

import { SCustomRadioItemProps, SCustomRadioProps } from './CustomRadio.style.props';

/* ////////////////////////////////////////////
                    Radio
//////////////////////////////////////////// */

const LABEL_FONT_SIZE = '1.3rem';

export const SCustomRadio = styled.div<SCustomRadioProps>`
  width: auto;

  display: flex;
  flex-direction: column;
  gap: 5px;

  .radio-item-container {
    display: flex;
    gap: 15px;
  }
`;

export const SCustomRadioItem = styled.label<SCustomRadioItemProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  font-size: ${LABEL_FONT_SIZE};
  margin-right: 21px;

  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}

  &.active {
    .radio-item-button::after {
      width: 8px;
      height: 8px;
    }
  }

  .radio-item-button {
    width: 16px;
    height: 16px;

    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.main_color_slate_200};

    margin-right: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    pointer-events: none;

    &:after {
      content: '';
      width: 0px;
      height: 0px;

      display: inline-block;
      border-radius: 50px;

      transition: all 0.3s;
      background-color: ${(props) => props.theme.main_color_slate_400};
    }
  }

  .radio-item-label {
    color: #000000;
    pointer-events: none;

    ${(props) =>
      props.disabled &&
      css`
        color: #bababa;
      `}
  }
`;
