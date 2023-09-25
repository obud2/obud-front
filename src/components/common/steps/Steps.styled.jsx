import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const SSteps = styled.ul`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 14px;

  ${MOBILE} {
    margin-bottom: 8px;
  }

  .steps-item {
    font-size: 1.3rem;
    font-weight: 400;
    line-height: 100%;

    display: flex;
    align-items: center;

    color: rgba(0, 0, 0, 0.3);

    ${MOBILE} {
      font-size: 1.2rem;
    }

    .steps-item-text {
    }

    &::after {
      content: '';
      margin: 0 16.6px 0 16px;

      display: inline-block;

      width: 7px;
      height: 7px;

      border-top: 1px solid ${(props) => props.theme.main_color_slate_300};
      border-right: 1px solid ${(props) => props.theme.main_color_slate_300};
      opacity: 0.5;

      transform: rotate(45deg);

      top: -1px;
      position: relative;

      ${MOBILE} {
        width: 5px;
        height: 5px;

        top: -2px;

        margin: 0 11.6px 0 11px;
      }
    }

    &:last-child {
      color: #565656;

      ::after {
        display: none;
      }
    }

    &.isLink {
      .steps-item-text {
        cursor: pointer;
      }

      &:hover {
        color: #565656bc;
      }
    }
  }
`;
