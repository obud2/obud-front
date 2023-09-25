import styled, { css } from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const SMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 75px;
  left: 50%;
  position: absolute;

  transform: translateX(-50%);
  transition: color 0.3s;

  a {
    color: ${(props) => props.theme.main_color_slate_300} !important;
  }

  ${(props) =>
    props.reverse &&
    css`
      a {
        color: ${(props) => props.theme.sub_color_slate_50} !important;
      }
    `}

  ${MOBILE} {
    flex-direction: column;
    gap: 0px;

    position: relative;
  }
`;
