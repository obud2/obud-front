import styled, { css } from 'styled-components';

export const SShare = styled.button`
  width: 18px;
  height: 20px;

  &:hover {
    opacity: 0.5;
  }

  .icons {
    width: 100%;
    height: 100%;
  }

  ${(props) =>
    props.isHide &&
    css`
      display: none;
    `}
`;
