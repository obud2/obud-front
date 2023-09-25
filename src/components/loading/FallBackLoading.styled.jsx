import styled, { css } from 'styled-components';

export const SFallBackLoading = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  opacity: 0;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.15);

  transition: opacity 225ms;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 100000000;

  ${(props) =>
    props.isLoading &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}

  .icons {
    width: 30px;
    height: 30px;
  }
`;
