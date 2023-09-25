import styled, { css } from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

/* ////////////////////////////////////////////
                Scroll Action
//////////////////////////////////////////// */
export const SScrollAction = styled.nav`
  position: fixed;
  right: 24px;
  bottom: 24px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  z-index: 99999;

  ${(props) =>
    props.hide &&
    css`
      display: none;
    `}

  ${MOBILE} {
    display: none;

    bottom: 2%;
    right: 5%;
  }
`;

export const SScrollTopBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  visibility: hidden;
  transition: opacity 500ms, visibility 500ms;

  background-color: #ffffff;
  box-shadow: 0 0 0 1px #dadcdf, 0 4px 8px 0 rgba(0, 0, 0, 0.15);

  svg {
    width: 22px;
    height: 22px;
    color: #232323ba;
    pointer-events: none;
  }

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      visibility: unset;
      transition: opacity 500ms, visibility 500ms;
    `};
`;
