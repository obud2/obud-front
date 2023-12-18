import styled, { css, keyframes } from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

const LineAnimation = keyframes`
  0%{ 
    opacity: 0.1;
    width: 10px;
  }
  100% {
    opacity: 1;
    width: 83px;
  }
  `;

export const SBaseTitle = styled.header<{ basic?: boolean; fontSize?: string }>`
  width: 100%;

  margin-top: 60px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${MOBILE} {
    margin-top: 24px;
    margin-bottom: 12px;

    text-align: center;
    border-bottom: none;
  }

  .base-title {
    width: 200px;
    height: auto;

    font-size: ${(props) => props.fontSize || '1.6rem'};
    font-weight: 600;
    font-family: OpenSans !important;
    padding-bottom: 16px;

    text-align: center;

    color: ${(props) => props.theme.main_color_slate_300};

    ${(props) =>
      props.basic &&
      css`
        width: 100%;
        text-align: left;

        font-size: 2.4rem;
      `}

    ${MOBILE} {
      font-size: 1.6rem;
    }
  }

  .title-line {
    width: 83px;
    height: 0.5px;
    background-color: ${(props) => props.theme.main_color_slate_200};

    animation: ${LineAnimation} 0.7s ease-in-out;

    ${(props) =>
      props.basic &&
      css`
        width: 100%;
        height: 1px;
        background-color: ${(props) => props.theme.main_color_slate_200};

        animation: none;
      `}

    ${MOBILE} {
      width: 160px;

      ${(props) =>
        props.basic &&
        css`
          width: 100%;
        `}
    }
  }
`;
