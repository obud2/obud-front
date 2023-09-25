import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

import { NAVIGATION_HEIGHT } from '../Layout.styled';

export const SMobileNavigation = styled.div`
  width: 100%;
  height: ${NAVIGATION_HEIGHT};

  border-top: 1px solid #eeeeee;
  background-color: #fff;

  padding-top: 7px;

  bottom: 0;
  position: fixed;
  z-index: 100;

  display: none;

  ${MOBILE} {
    display: block;
  }

  .navigation-items-container {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 40px;
  }

  .navigation-item {
    width: 48px;
    height: 48px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 3px;

    cursor: pointer;

    &.active .navigation-item-label {
      font-weight: 700;
    }

    .icons {
      width: 20px;
      height: 20px;
    }

    .navigation-item-label {
      width: 100%;

      color: ${(props) => props.theme.main_color_slate_400};

      font-size: 1.1rem;
      font-weight: 400;
      line-height: 100%; /* 11px */

      text-align: center;
    }
  }
`;
