import styled, { css } from 'styled-components';

const SELECT_HEIGHT = '40px';

export const SPlanNumberOfPeopleCheck = styled.div`
  height: ${SELECT_HEIGHT};

  margin: 3px 0;
  padding: 0 3px;

  border: 1px solid ${(props) => props.theme.main_color_slate_200};

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: border-color 0.3s;
  cursor: pointer;

  &:hover {
    border-color: #3f3f3f;
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.8;
      cursor: not-allowed;

      &:hover {
        border-color: #e0e0e0;
      }
    `}

  .number-of-people-input {
    border: none;
    outline: none;
    width: 50px;

    font-size: 1.5rem;
    color: #555555;

    text-align: center;
    background-color: transparent;

    ${(props) =>
      props.disabled &&
      css`
        cursor: not-allowed;
      `}
  }

  .count-button {
    width: 40px;
    height: 100%;

    font-size: 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(props) => props.theme.main_color_slate_500};

    ${(props) =>
      props.disabled &&
      css`
        cursor: not-allowed;
      `}
  }
`;
