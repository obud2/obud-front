import styled, { css } from 'styled-components';

const INPUT_FONT_SIZE = '1.4rem';

const INPUT_HEIGHT = '40px';

export const SAdressInput = styled.div`
  width: 100%;

  .adr-input-container {
    width: 100%;

    display: flex;
    flex-direction: column;

    border-radius: 0px;
    border: 1px solid ${(props) => props.theme.core_color_slate_50};
    background-color: #ffffff;

    &.active {
      border: 1px solid ${(props) => props.theme.main_color_slate_500};
    }
  }

  .adr-input {
    width: 100%;
    height: ${INPUT_HEIGHT};

    padding: 0 15px 0 16px;

    outline: none;
    box-sizing: border-box;
    border: none;
    border-radius: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: border-color 0.3s;

    color: #555555;
    font-size: ${INPUT_FONT_SIZE};

    ${(props) =>
      props.disabled &&
      css`
        color: #949494;
        background-color: #f4f4f4;
      `}

    &::placeholder {
      color: #b5b5b5;
      font-size: 1.05em;
    }

    &:first-child {
      border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};
    }
  }
`;
